<script lang="ts">
	import { marked } from 'marked';
	import moment from 'moment';

	// Icons
	import icon_link from '$lib/images/icons/link-linear.svg';
	import icon_github from '$lib/images/icons/github.svg';
	import icon_linkedin from '$lib/images/icons/linkedin.svg';
	import icon_selected from '$lib/images/icons/chevron-right-svgrepo-com.svg';

	// Change visble section
	let visibleIdx = 0;

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

<section id="experience" class="my-16">
	<h1 class="mb-6">Experience</h1>
	<section class="flex flex-col md:flex-row">
		<div class="md:basis-1/4 pr-5">
			{#each experiences as experience, idx}
				<button
					class="w-full text-left text-lg mb-3 hover:text-secondary align-middle {visibleIdx === idx
						? 'text-secondary'
						: 'opacity-80'}"
					aria-expanded={visibleIdx === idx}
					on:click={() => {
						visibleIdx = idx;
					}}
					>{experience.org}
					<img
						src={icon_selected}
						alt={experience.org}
						class="inline-block my-auto w-5 h-auto {visibleIdx === idx ? '' : 'hidden'}"
					/></button
				>
			{/each}
		</div>
		<div class="md:basis-3/4">
			{#each experiences as experience, idx}
				<article class="mb-5 {visibleIdx === idx ? '' : 'hidden'}">
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
					<ul class="list-disc md:text-lg pl-5">
						{#each experience.descriptions as description}
							<li>{@html marked(description)}</li>
						{/each}
					</ul>
					<div class="flex justify-end">
						{#each experience.externalLinks as link}
							<a
								class="text-secondary mx-1 hover:bg-gray-200 rounded-full"
								href={link}
								target="_blank"
							>
								<img class="object-content w-8 h-8 m-1" src={icon_link} alt={link} />
							</a>
						{/each}
						{#if experience.linkedInLink}
							<a
								class="text-secondary mx-1 hover:bg-gray-200 rounded-full"
								href={experience.linkedInLink}
								target="_blank"
							>
								<img
									class="object-content w-8 h-8 m-1"
									src={icon_linkedin}
									alt={experience.linkedInLink}
								/>
							</a>
						{/if}
						{#if experience.githubLink}
							<a
								class="text-secondary mx-1 hover:bg-gray-200 rounded-full"
								href={experience.githubLink}
								target="_blank"
							>
								<img
									class="object-content w-8 h-8 m-1"
									src={icon_github}
									alt={experience.githubLink}
								/>
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>
</section>
