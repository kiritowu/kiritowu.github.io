<script lang="ts">
	import { marked } from 'marked';
	import moment from 'moment';

	// Icons
	import icon_link from '$lib/images/link-linear.svg';
	import icon_github from '$lib/images/github.svg';
	import icon_linkedin from '$lib/images/linkedin.svg';

	// Change visble section
	let visibleSectionIdx = 0;

	export let experiences: {
		title: string;
		org: string;
		startDate: string;
		endDate: string;
		descriptions: string[];
		githubLink?: string;
		linkedInLink?: string;
		externalLinks: string[];
		skills: string[];
	}[] = [];
</script>

<section id="experience" class="my-10">
	<h1 class="my-5">Experience</h1>
	<section class="flex flex-col md:flex-row">
		<div class="md:basis-1/4 pr-5">
			{#each experiences as experience, idx}
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
			{#each experiences as experience, idx}
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
