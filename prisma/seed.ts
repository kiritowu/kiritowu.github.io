import { PrismaClient } from "@prisma/client";
import yaml from "yaml";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding data...");
	const data = yaml.parse(fs.readFileSync("./src/lib/profile.yaml", "utf8"));

	await prisma.$transaction(async (tx) => {
		// Seed Profile
		const profile = await tx.profile.create({
			data: {
				firstName: data.profile.firstName,
				lastName: data.profile.lastName,
				nickName: data.profile.nickName,
				ign: data.profile.ign,
				descriptions: data.profile.descriptions || [],
				email: data.contact.email,
				mobile: "+65 XXXX XXXX",
				website: data.contact.website,
				github: data.contact.github,
				linkedin: data.contact.linkedin,
				twitter: data.contact.twitter,
				myanimelist: data.contact.myanimelist,
				visibility: "PUBLIC",
			},
		});

		// Seed Skills
		const skills = await Promise.all(
			Object.entries(data.skills).flatMap(([category, skills]) =>
				skills.map((skill) => (
					tx.skill.create({
						data: {
							category: category,
							name: skill as string,
						},
					})
				))
			)
		);

		// Seed Experiences
		const experiences = await Promise.all(
			data.experience.map((experience) =>
				tx.experience.create({
					data: {
						title: experience.title,
						org: experience.org,
						isJob: experience.isJob,
						startDate: new Date(experience.startDate),
						endDate: experience.endDate ? new Date(experience.endDate) : null,
						descriptions: experience.descriptions || [],
						shortDescription: experience.shortDescription,
						githubLink: experience.githubLink,
						externalLinks: experience.externalLinks || [],
						skills: {
							create: experience.skills.map(skillName => {
								const skill = skills.find(s => s.name === skillName);
								if (!skill) {
									throw new Error(`Skill not found: ${skillName}`);
								}
								return {
									skill: {
										connect: { id: skill.id }
									}
								};
							})
						}
					}
				})
			)
		);

		// Seed Education
		const education = await Promise.all(
			data.education.map((edu) =>
				tx.education.create({
					data: {
						qualification: edu.qualification,
						school: edu.school,
						startDate: new Date(edu.startDate),
						endDate: new Date(edu.endDate),
						descriptions: edu.descriptions || [],
					},
				})
			)
		);

		// Seed Projects
		const projects = await Promise.all(
			Object.entries(data.projects).flatMap(([category, projects]) =>
				projects.map((project) =>
					tx.project.create({
						data: {
							category: category,
							title: project.title,
							year: project.year,
							shortDescription: project.shortDescription,
							longDescriptions: project.longDescriptions || [],
							img: project.img,
							link: project.link,
							tags: project.tags || [],
						},
					})
				)
			)
		);

		// Seed Resume
		const resumes = await tx.resume.create({
			data: {
				name: "default",
				experiences: {
					create: data.resume.additionalExperience.map((experienceName) => {
						const experience = experiences.find(e => e.title === experienceName)
						if (!experience) {
							throw new Error(`Experience not found: ${experienceName}`);
						}
						return {
							experience: {
								connect: { id: experience.id },
							}
						}
					}),
				},
				projects: {
					create: data.resume.projects.map((projectName) => {
						const project = projects.find(p => p.title === projectName)
						if (!project) {
							throw new Error(`Project not found: ${projectName}`);
						}
						return {
							project: {
								connect: { id: project.id },
							}
						}
					}),
				},
			},
		});

		console.log("Seeding completed successfully.");
	});
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
