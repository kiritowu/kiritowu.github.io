<script>
	import { marked } from 'marked';
	import moment from 'moment';
	import Typewriter from 'svelte-typewriter';
	import profile from '$lib/profile.json';

	// Icons
	import icon_link from '$lib/images/link-linear.svg';
	import icon_github from '$lib/images/github.svg';
	import icon_linkedin from '$lib/images/linkedin.svg';
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
	<section class="flex">
		<div class="basis-1/4">
			{#each profile.experience as experience}
				<button class="text-left text-xl">{experience.org}</button>
			{/each}
		</div>
		<div class="basis-3/4">
			{#each profile.experience as experience}
				<article>
					<div class="flex md:flex-row flex-col justify-between mb-2">
						<h3 class="text-primary font-semibold text-xl">{experience.title}</h3>
						<p class="text-lg">
							{experience.startDate
								? moment(experience.startDate).format('MMM YYYY') + ' - '
								: ''}{experience.endDate
								? moment(experience.endDate).format('MMM YYYY')
								: 'Present'}
						</p>
					</div>
					<ul class="list-disc text-lg pl-5">
						{#each experience.descriptions as description}
							<li>{@html marked(description)}</li>
						{/each}
					</ul>
					<div class="flex justify-end">
						{#if experience.externalLink}
							<a class="text-secondary mx-1" href={experience.externalLink} target="_blank">
								<img class="object-content w-8 h-8" src={icon_link} alt={experience.externalLink} />
							</a>
						{/if}
						{#if experience.linkedInLink}
							<a class="text-secondary mx-1" href={experience.linkedInLink} target="_blank">
								<img
									class="object-content w-8 h-8"
									src={icon_linkedin}
									alt={experience.linkedInLink}
								/>
							</a>
						{/if}
						{#if experience.githubLink}
							<a class="text-secondary mx-1" href={experience.githubLink} target="_blank">
								<img class="object-content w-8 h-8" src={icon_github} alt={experience.githubLink} />
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>
</section>

<section id="projects" class="my-10">
	<h1 class="mb-3">Projects</h1>
</section>
