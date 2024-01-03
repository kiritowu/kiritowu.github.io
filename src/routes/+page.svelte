<script lang="ts">
	// User profile from database
	import profile from '$lib/profile.json';

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
		{profile.profile.firstName
			.split(' ')
			.map((name) => name.charAt(0))
			.join('')}
		{profile.profile.lastName}</title
	>
</svelte:head>

<Hero {...profile.profile} />

<Profile descriptions={profile.profile.descriptions} />

<Skills />

<Experience experiences={profile.experience} />

<Projects projects={profile.projects} />
