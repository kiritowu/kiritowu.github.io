<script lang="ts">
	// User profile from file
	import data from '$lib/profile.yaml';

	// Import Components
	import Hero from '$lib/components/Hero.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';

	const { profile, skills, experience, projects } = data;

	const experienceArr = (experience as any[]).map((exp) => {
		return {
			...exp,
			startDate: exp.startDate ? new Date(exp.startDate) : undefined,
			endDate: exp.endDate ? new Date(exp.endDate) : null
		};
	});

	const skillsArr = Object.entries(skills).flatMap(([category, skills]) => {
		return (skills as string[]).map((skill) => ({
			category,
			name: skill as string
		}));
	});

	const projectsArr = Object.entries(projects).flatMap(([category, projects]) => {
		return (projects as any[]).map((project) => ({
			category,
			title: project.title,
			year: project.year,
			shortDescription: project.shortDescription,
			longDescriptions: project.longDescriptions || [],
			img: project.img,
			link: project.link,
			tags: project.tags || []
		}));
	});
</script>

<svelte:head>
	<meta name="author" content="{profile.firstName} {profile.lastName}" />
	<meta name="description" content="{profile.firstName}'s personal website" />
	<title
		>{profile.nickName}
		{profile.lastName}
		{profile.firstName}
	</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<Hero
	firstName={profile.firstName}
	lastName={profile.lastName}
	ign={profile.ign}
	nickName={profile.nickName}
/>

<Profile descriptions={profile.descriptions} />

<Skills skills={skillsArr} />

<Experience experiences={experienceArr} />

<Projects projects={projectsArr} />
