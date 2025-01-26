<script lang="ts">
	// Import layout data
	import type { LayoutData } from './$types';

	// Import Components
	import Hero from '$lib/components/Hero.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';

	export let data: LayoutData;
	$: ({ profile, skills, experiences, projects } = data);
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

<Skills {skills} />

<Experience {experiences} />

<Projects {projects} />
