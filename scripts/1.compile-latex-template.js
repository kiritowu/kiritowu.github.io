// compile-latex-template.js

import fs from 'fs';
import { Command } from 'commander';
import { PrismaClient } from '@prisma/client';
import { default as nunjucks } from 'nunjucks';
import { default as nunjucksDate } from 'nunjucks-date';

// Load the Prisma Client
const prisma = new PrismaClient();

// Function to load data from the database
const loadData = async (profileVisibility) => {
	console.log('Loading data from the database...');
	// Read and parse profile from database
	const profile = await prisma.profile.findFirstOrThrow({ where: { visibility: profileVisibility } });
	if (!profile) {
		throw new Error('Profile not found');
	}
	const educations = await prisma.education.findMany();
	const skills = await prisma.skill.findMany();
	const experiences = await prisma.experience.findMany();
	const resumes = await prisma.resume.findFirst({ include: { projects: { include: { project: true } } } });
	const projects = resumes.projects.map((resume) => resume.project).sort((a, b) => parseInt(b.year) - parseInt(a.year));
	return { profile, educations, skills, experiences, projects };
}


// Main function to compile the template
const main = async (templatePath, outputPath, profileVisibility) => {
	console.log(`Compiling ${templatePath}`);
	const data = await loadData(profileVisibility);
	// Configure Nunjucks with Custom Tags for LaTeX
	const env = nunjucks.configure({
		autoescape: false,
		tags: {
			blockStart: '<%',
			blockEnd: '%>',
			variableStart: '<$',
			variableEnd: '$>',
			commentStart: '<#',
			commentEnd: '#>'
		}
	});

	// Add the nunjucks-date extension
	nunjucksDate.setDefaultFormat('MMM YYYY');
	nunjucksDate.install(env);

	// Compile the Template based on profile.yaml
	const result = env.render(templatePath, data);

	// Write the result to a file
	fs.writeFileSync(outputPath, result);

	console.log(`${outputPath} has been generated!`);
};

const program = new Command();
program
	.version('0.1.0')
	.description('Compile and export LATEX template using nunjucks')
	.option('-t, --template <path>', 'Path to template.tex', './tex/template.tex')
	.option('-o, --output <path>', 'Path to output.tex', './tex/WongZhaoWu-resume.tex')
	.option('-p, --profile <visibility>', 'Profile visibility. Only `PUBLIC` or `PRIVATE` are accepted', 'PUBLIC')
	.action((options) => {
		return main(options.template, options.output, options.profile);
	});

// Parse the command line arguments
program.parse(process.argv);
