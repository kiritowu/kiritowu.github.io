<script lang="ts">
	// Import project images
	import acbiggan from '$lib/images/projects/acbigan.png?enhanced';
	import aisdc from '$lib/images/projects/aisdc.jpg?enhanced';
	import aiEnabledQuerySystem from '$lib/images/projects/ai-enabled-query-system.jpg?enhanced';
	import efficientNet from '$lib/images/projects/efficientnet.png?enhanced';
	import fasterrcnn from '$lib/images/projects/fasterrcnn.png?enhanced';
	import projectCactus from '$lib/images/projects/project-cactus.gif';
	import humanCounter from '$lib/images/projects/human-counter.gif';
	import machineLearning from '$lib/images/projects/machine-learning.jpg?enhanced';
	import reimaginingPublicTransport from '$lib/images/projects/reimagining-public-transport.jpg?enhanced';
	import fpv from '$lib/images/projects/FPV-Demo.gif';

	const enhancedImgs: { [key: string]: any } = {
		'AI-Enabled Query System': aiEnabledQuerySystem,
		acbiggan: acbiggan,
		EfficientNet: efficientNet,
		'Faster R-CNN': fasterrcnn,
		'Machine Learning': machineLearning,
		aisdc: aisdc,
		reimaginingPublicTransport: reimaginingPublicTransport
	};
	const imgs: { [key: string]: any } = {
		'Human Counter': humanCounter,
		'Project Cactus': projectCactus,
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
</script>

<section id="projects" class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl py-16">
	<h1 class="mb-6">Projects</h1>

	{#each Object.entries(projects) as [cat, items], cat_idx}
		<div class="flex flex-col mb-1 {cat_idx % 2 ? 'md:flex-row-reverse' : 'md:flex-row'}">
			<div
				class="flex mb-2 md:basis-[24.5%] p-4 text-primary rounded-md border border-gray-300 shadow-md md:shadow-xl {cat_idx %
				2
					? 'md:ml-2'
					: 'md:mr-2'}"
			>
				<h2 class="my-auto text-xl md:text-3xl">{cat}</h2>
			</div>
			<article class="md:basis-3/4">
				<div
					class="flex flex-row flex-wrap mx-auto {cat_idx % 2 ? 'justify-end' : 'justify-start'}"
				>
					{#each items as item}
						<article
							class="md:basis-[32.6%] mb-2 h-min text-primary rounded-md border border-gray-300 shadow-md md:shadow-xl {cat_idx %
							2
								? 'md:ml-2'
								: 'md:mr-2'}"
						>
							<a
								class="text-primary hover:text-secondary hover:no-underline"
								href={item.link}
								target="_blank"
							>
								{#if enhancedImgs[item.img] !== undefined}
									<enhanced:img
										class="w-full rounded-t-md"
										src={enhancedImgs[item.img]}
										alt={item.title}
									/>
								{:else}
									<img class="w-full rounded-t-md" src={imgs[item.img]} alt={item.title} />
								{/if}
								<div class="m-3">
									<div class="mb-4">
										<h3 class="py-auto text-lg">{item.title}</h3>
										<p class="text-xs text-primary">
											{item.shortDescription}
										</p>
									</div>
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
				</div>
			</article>
		</div>
	{/each}
</section>
