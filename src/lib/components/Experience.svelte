<script lang="ts">
	import type { Experience } from '$lib/types';

	const monthYearFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

	export let experiences: Experience[] = [];
</script>

<section id="experience" class="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:py-32">
	<header class="border-b border-slate-300 pb-8 dark:border-neutral-700">
		<h2
			class="m-0 text-4xl font-semibold tracking-[-0.04em] text-primary dark:text-primary-dark sm:text-5xl"
		>
			Experience
		</h2>
	</header>

	<div>
		{#each experiences as experience}
			<article
				class="grid gap-8 border-b border-slate-300 py-10 dark:border-neutral-700 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14 lg:gap-20 lg:py-14"
			>
				<header>
					<p class="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-secondary">
						{experience.org}
					</p>
					<h3
						class="m-0 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.025em] text-primary dark:text-primary-dark"
					>
						{experience.title}
					</h3>
					<p class="mt-3 text-sm tabular-nums text-slate-600 dark:text-neutral-400">
						{experience.startDate ? monthYearFormatter.format(experience.startDate) : ''}
						<span class="mx-1" aria-hidden="true">—</span>
						{experience.endDate ? monthYearFormatter.format(experience.endDate) : 'Present'}
					</p>
				</header>

				<ul class="list-disc space-y-3 pl-5 text-base leading-relaxed marker:text-primary sm:text-lg">
					{#each experience.descriptions as description}
						<li class="pl-1">{description}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>
