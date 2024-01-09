<script>
	export let projects = {};
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
								<img class="w-full rounded-t-md" src={item.img} alt={item.title} />
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
