<script lang="ts">
	import { marked } from 'marked';
	import moment from 'moment';
	import profile from '$lib/profile.json';
	import profilePic from '$lib/images/profile-pic-cropped.jpg';

	// Icons
	import icon_link from '$lib/images/link-linear.svg';
	import icon_github from '$lib/images/github.svg';
	import icon_linkedin from '$lib/images/linkedin.svg';

	// Import Components
	import Hero from './Hero.svelte';

	// Change visble section
	let visibleSectionIdx = 0;
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

<section id="about" class="my-10">
	<h1 class="my-5">About Me</h1>
	<div class="flex md:flex-row flex-col justify-between">
		<div class="md:basis-1/3 px-10 mb-7">
			<img class="rounded-full shadow-lg shadow-slate-800" src={profilePic} alt="profile" />
		</div>
		<div class="md:basis-3/5">
			{#each profile.profile.descriptions as description}
				<p class="mb-2 text-lg">{@html marked(description)}</p>
			{/each}
		</div>
	</div>
</section>

<section id="skills" class="my-10">
	<h1 class="my-5">Skills</h1>
</section>

<section id="experience" class="my-10">
	<h1 class="my-5">Experience</h1>
	<section
		class="flex flex-col md:flex-row"
		on:wheel|preventDefault={(e) => {
			let bb = document
				.getElementById(profile.experience[visibleSectionIdx].org)
				?.getBoundingClientRect();
			if (bb && e.deltaY > 0) {
				visibleSectionIdx = Math.min(profile.experience.length - 1, visibleSectionIdx + 1);
			} else if (bb && e.deltaY < 0) {
				visibleSectionIdx = Math.max(0, visibleSectionIdx - 1);
			}
		}}
	>
		<div class="md:basis-1/4 pr-5">
			{#each profile.experience as experience, idx}
				<button
					class="w-full text-left text-lg mb-3 hover:text-secondary {visibleSectionIdx === idx
						? 'text-secondary'
						: 'opacity-80'}"
					aria-expanded={visibleSectionIdx === idx}
					on:click={() => {
						visibleSectionIdx = idx;
					}}>{experience.org}</button
				>
			{/each}
		</div>
		<div class="md:basis-3/4">
			{#each profile.experience as experience, idx}
				<article class="mb-5 {visibleSectionIdx === idx ? '' : 'hidden'}">
					<div class="flex md:flex-row flex-col justify-between mb-2">
						<h3 class="text-primary font-semibold text-xl">{experience.title}</h3>
						<p class="text-base mt-auto">
							{experience.startDate
								? moment(experience.startDate, 'MM/YYYY').format('MMM YYYY') + ' - '
								: ''}{experience.endDate
								? moment(experience.endDate, 'MM/YYYY').format('MMM YYYY')
								: 'Present'}
						</p>
					</div>
					<ul class="list-disc text-lg pl-5">
						{#each experience.descriptions as description}
							<li>{@html marked(description)}</li>
						{/each}
					</ul>
					<div class="flex justify-end">
						{#each experience.externalLinks as link}
							<a class="text-secondary mx-1" href={link} target="_blank">
								<img class="object-content w-8 h-8" src={icon_link} alt={link} />
							</a>
						{/each}
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
	<h1 class="my-5">Projects</h1>
</section>
