<script lang="ts">
	// Import project images
	import owlshield from '$lib/images/projects/owlshield.png?enhanced';
	import acbiggan from '$lib/images/projects/acbigan.png?enhanced';
	import aisdc from '$lib/images/projects/aisdc.jpg?enhanced';
	import aiEnabledQuerySystem from '$lib/images/projects/ai-enabled-query-system.jpg?enhanced';
	import efficientNet from '$lib/images/projects/efficientnet.png?enhanced';
	import fasterrcnn from '$lib/images/projects/fasterrcnn.png?enhanced';
	import humanCounter from '$lib/images/projects/human-counter.gif';
	import machineLearning from '$lib/images/projects/machine-learning.jpg?enhanced';
	import reimaginingPublicTransport from '$lib/images/projects/reimagining-public-transport.jpg?enhanced';
	import fpv from '$lib/images/projects/FPV-Demo.gif';
	import fitbitCalculatorVersa4 from '$lib/images/projects/calculator-versa4.png?enhanced';

	const enhancedImgs: { [key: string]: any } = {
		'AI-Enabled Query System': aiEnabledQuerySystem,
		acbiggan: acbiggan,
		EfficientNet: efficientNet,
		'Faster R-CNN': fasterrcnn,
		'Machine Learning': machineLearning,
		aisdc: aisdc,
		reimaginingPublicTransport: reimaginingPublicTransport,
		owlShield: owlshield,
		fitbitCalculatorVersa4: fitbitCalculatorVersa4
	};
	const imgs: { [key: string]: any } = {
		'Human Counter': humanCounter,
		'FPV Demo': fpv
	};

	export let projects: {
		[cat: string]: {
			title: string;
			shortDescription: string;
			longDescription: string;
			img: string;
			link: string;
			tags: string[];
		}[];
	} = {};

	let selectedTab = 'all';
	function hideArticle(selectedTab: string, category: string): string {
		if (selectedTab == 'all' || selectedTab == category) return '';
		return 'hidden';
	}
</script>

<section id="projects" class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl py-16">
	<h1 class="mb-4 text-center">Projects</h1>
	<hr class="mb-3 dark:border-gray-500" />
	<div class="mx-auto max-w-[90%] flex flex-wrap justify-center items-center mb-10">
		<button
			class="p-3 text-lg hover:text-secondary text-wrap {selectedTab == 'all'
				? 'text-secondary'
				: 'opacity-80'}"
			on:click={() => {
				selectedTab = 'all';
			}}>All</button
		>
		{#each Object.keys(projects) as cat}
			<button
				class="p-3 text-lg hover:text-secondary text-wrap {selectedTab == cat
					? 'text-secondary'
					: 'opacity-80'}"
				on:click={() => {
					selectedTab = cat;
				}}>{cat}</button
			>
		{/each}
	</div>
	<div class="grid md:grid-cols-3 gap-5 transition-all">
		{#each Object.entries(projects) as [cat, items]}
			{#each items as item}
				<article
					class="md:h-[400px] flex flex-col justify-between text-primary dark:text-primary-dark rounded-md border border-gray-300 dark:border-neutral-700 shadow-md md:shadow-lg shadow-slate-800 dark:shadow-none {hideArticle(
						selectedTab,
						cat
					)}"
				>
					<a
						class="text-primary dark:text-primary-dark hover:text-secondary hover:no-underline"
						href={item.link}
						target="_blank"
					>
						{#if enhancedImgs[item.img] !== undefined}
							<enhanced:img
								class="w-full rounded-t-md max-h-[200px]"
								src={enhancedImgs[item.img]}
								alt={item.title}
							/>
						{:else}
							<img
								class="w-full rounded-t-md max-h-[200px]"
								src={imgs[item.img]}
								alt={item.title}
							/>
						{/if}
						<div class="m-3">
							<h3 class="py-auto text-lg mb-1">{item.title}</h3>
							<p class="text-xs text-primary dark:text-primary-dark">
								{item.shortDescription}
							</p>
						</div>
					</a>
					<div class="flex flex-row flex-wrap gap-1 text-sm m-3">
						{#each item.tags as tag}
							<button
								class="rounded-2xl border-primary border hover:bg-gray-200 p-2 text-secondary text-xs"
								>{tag}</button
							>
						{/each}
					</div>
				</article>
			{/each}
		{/each}
	</div>
</section>
