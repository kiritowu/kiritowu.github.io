<script>
	import profile from '$lib/profile.json';
</script>

<svelte:head>
	<meta name="author" content="{profile.contact.firstName} {profile.contact.lastName}" />
	<meta name="description" content="{profile.contact.firstName}'s personal website" />
	<title>{profile.contact.firstName} {profile.contact.lastName}</title>
</svelte:head>

<section class="px-6 md:px-0 flex items-center min-h-screen text-xl">
	<main>
		<h3 class="my-3 font-mono text-secondary">Hi, my name is</h3>
		<h1 class="my-5 text-primary text-7xl text-left">
			{profile.contact.firstName}
			{profile.contact.lastName}
		</h1>
		<h2>Aspiring AI Engineer</h2>
	</main>
</section>
