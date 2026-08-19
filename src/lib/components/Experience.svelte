<script lang="ts">
	import type { Experience } from '$lib/types';
	import SimpleIcon from '$lib/components/SimpleIcon.svelte';

	// Change visble section
	let visibleIdx = 0;
	const monthYearFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

	export let experiences: Experience[] = [];
</script>

<section id="experience" class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl py-16">
	<h1 class="mb-4 text-center">Experience</h1>
	<hr class="mb-10 dark:border-gray-500" />
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
				</button>
			{/each}
		</div>
		<div class="md:basis-3/4">
			{#each experiences as experience, idx}
				<article class="mb-5 {visibleIdx === idx ? '' : 'hidden'}">
					<div class="mb-2">
						<h3 class="text-primary dark:text-primary-dark font-semibold text-xl mb-1">
							{experience.title}
						</h3>
						<p class="text-base mt-auto">
							{experience.startDate
								? monthYearFormatter.format(experience.startDate) + ' - '
								: ''}{experience.endDate
								? monthYearFormatter.format(experience.endDate)
								: 'Present'}
						</p>
					</div>
					<ul class="list-disc md:text-lg pl-5">
						{#each experience.descriptions as description}
							<li class="mb-2">{description}</li>
						{/each}
					</ul>
					<div class="flex justify-start">
						{#if experience.externalLinks}
							{#each experience.externalLinks as link}
								<a
									class="mx-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full w-12 h-12 flex justify-center items-center"
									href={link}
									target="_blank"
									aria-label="External link"
								>
									<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
										<path d="M14 4h6v6M20 4l-9 9M10 5H5v14h14v-5" />
									</svg>
								</a>
							{/each}
						{/if}
						<!-- {#if experience.linkedInLink} -->
						<!-- 	<a -->
						<!-- 		class="mx-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full w-12 h-12 flex justify-center items-center" -->
						<!-- 		href={experience.linkedInLink} -->
						<!-- 		target="_blank" -->
						<!-- 	> -->
						<!-- 		<SimpleIcon baseName="siLinkedin" class="fill-primary dark:fill-primary-dark" /> -->
						<!-- 	</a> -->
						<!-- {/if} -->
						{#if experience.githubLink}
							<a
								class="mx-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full w-12 h-12 flex justify-center items-center"
								href={experience.githubLink}
								target="_blank"
							>
								<SimpleIcon baseName="siGithub" class="fill-primary dark:fill-primary-dark" />
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>
</section>
