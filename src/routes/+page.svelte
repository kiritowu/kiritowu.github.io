<script lang="ts">
	// User profile from file
	import data from '$lib/profile.yaml';

	// Import Components
	import Hero from '$lib/components/Hero.svelte';
	import Experience from '$lib/components/Experience.svelte';

	const { profile, experience, contact } = data;

	const experienceArr = (experience as any[]).map((exp) => {
		return {
			...exp,
			startDate: exp.startDate ? new Date(exp.startDate) : undefined,
			endDate: exp.endDate ? new Date(exp.endDate) : null
		};
	});

</script>

<svelte:head>
	<meta name="author" content="{profile.firstName} {profile.lastName}" />
	<meta name="description" content="{profile.firstName}'s personal website" />
	<title
		>{profile.nickName}
		{profile.lastName}
	</title>
</svelte:head>

<Hero lastName={profile.lastName} nickName={profile.nickName} githubLink={contact.github} linkedinLink={contact.linkedin} />

<Experience experiences={experienceArr} />

