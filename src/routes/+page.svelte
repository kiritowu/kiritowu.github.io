<script lang="ts">
	// User profile from database
	import profile from '$lib/profile.yaml';

	// Import Components
	import Hero from '$lib/components/Hero.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
</script>

<svelte:head>
	<meta name="author" content="{profile.profile.firstName} {profile.profile.lastName}" />
	<meta name="description" content="{profile.profile.firstName}'s personal website" />
	<title
		>{profile.profile.nickName}
		{profile.profile.lastName}
		{profile.profile.firstName}
	</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<Hero {...profile.profile} />

<Profile descriptions={profile.profile.descriptions} />

<Skills skills={profile.skills} />

<Experience experiences={profile.experience} />

<Projects projects={profile.projects} />
