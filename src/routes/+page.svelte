<script>
	import Typewriter from 'svelte-typewriter';
	import profile from '$lib/profile.json';
</script>

<svelte:head>
	<meta name="author" content="{profile.contact.firstName} {profile.contact.lastName}" />
	<meta name="description" content="{profile.contact.firstName}'s personal website" />
	<title>{profile.contact.firstName} {profile.contact.lastName}</title>
</svelte:head>

<section class="px-6 md:px-0 flex items-center min-h-screen max-w-6xl text-xl font-main">
	<header>
		<h3 class="my-3 font-mono text-secondary text-3xl">Hi, my name is</h3>
		<Typewriter mode="loopOnce" keepCursorOnFinish={true} wordInterval={700}>
			{#each [`${profile.contact.firstName}`, `${profile.contact.ign}`, `${profile.contact.nickName} ${profile.contact.lastName}`, `${profile.contact.nickName} ${profile.contact.lastName} ${profile.contact.firstName}`] as text}
				<h1 class="my-5 text-7xl text-left font-semibold">{text}</h1>
			{/each}
		</Typewriter>
		<h2>Placeholder for 3 description that best descibe me</h2>
	</header>
</section>
