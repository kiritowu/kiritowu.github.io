<script>
	import { marked } from 'marked';
	import Typewriter from 'svelte-typewriter';
	import profile from '$lib/profile.json';
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

<section id="hero" class="flex items-center min-h-screen max-w-6xl text-xl font-primary">
	<header>
		<h3 class="my-3 font-mono text-secondary text-xl">Hi, my name is</h3>
		<Typewriter mode="loopOnce" keepCursorOnFinish={true} wordInterval={700}>
			{#each [`${profile.profile.firstName}`, `${profile.profile.ign}`, `${profile.profile.nickName} ${profile.profile.lastName}`, `${profile.profile.nickName} ${profile.profile.lastName} ${profile.profile.firstName}`] as text}
				<h1 class="my-3 text-6xl text-left">{text}</h1>
			{/each}
		</Typewriter>
		<h1 class="my-5 text-4xl text-left font-extrabold font-heading text-secondary">
			NUSC w/ CS @ 2029
		</h1>
		<h3 class="my-2">
			💡 Conscientiously Driven | 💻 Aspiring ML Engineer | 🏞️ Outdoor Adventurer
		</h3>
	</header>
</section>

<section id="about" class="my-10">
	<h1 class="mb-3">About Me</h1>
	{#each profile.profile.descriptions as description}
		<p class="mb-2 text-lg">{@html marked(description)}</p>
	{/each}
</section>

<section id="skills" class="my-10">
	<h1 class="mb-3">Skills</h1>
</section>

<section id="experience" class="my-10">
	<h1 class="mb-3">Experience</h1>
</section>

<section id="projects" class="my-10">
	<h1 class="mb-3">Projects</h1>
</section>
