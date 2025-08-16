export enum ProfileVisibility {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE'
}

export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	nickName?: string;
	ign?: string;
	descriptions: string[];
	email: string;
	mobile?: string;
	website?: string;
	github?: string;
	linkedin?: string;
	twitter?: string;
	myanimelist?: string;
	visibility: ProfileVisibility;
}

export interface Skill {
	category: string;
	name: string;
}

export interface Experience {
	title: string;
	org: string;
	isJob: boolean;
	startDate: Date;
	endDate?: Date;
	descriptions: string[];
	shortDescription?: string;
	githubLink?: string;
	externalLinks: string[];
}

export interface Project {
	category: string;
	title: string;
	year: string;
	shortDescription: string;
	longDescriptions: string[];
	img: string;
	link?: string;
	tags: string[];
}

export interface Education {
	id: string;
	qualification: string;
	school: string;
	startDate: Date;
	endDate: Date;
	descriptions: string[];
}
