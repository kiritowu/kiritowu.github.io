// Static site generation (SSG)
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const prerender = true;

export async function load() {
	const profile = await prisma.profile.findFirstOrThrow();
	if (!profile) {
		throw new Error('Profile not found');
	}
	const skills = await prisma.skill.findMany();
	const experiences = await prisma.experience.findMany();
	const projects = await prisma.project.findMany();
	return { profile, skills, experiences, projects };
}
