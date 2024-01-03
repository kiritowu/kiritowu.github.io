<script>
	export let projects = {};
</script>

<section id="projects" class="my-10">
	<h1 class="my-2">Project Gallery</h1>
	<hr class="my-3 text-primary border-primary" />

	{#each Object.entries(projects) as [cat, items], cat_idx}
		<div class="flex mb-2 {cat_idx % 2 ? 'flex-row-reverse' : 'flex-row'}">
			<div class="basis-1/5 p-4 rounded border border-primary text-primary">
				<h2 class="my-auto">{cat}</h2>
			</div>
			<article class="basis-4/5 flex justify-center">
				<div
					class="basis-[99%] flex flex-row flex-wrap gap-2 mx-auto {cat_idx % 2
						? 'justify-end'
						: 'justify-start'}"
				>
					{#each items as item}
						<article class="basis-[32%] h-min rounded border border-primary text-primary shadow">
							<a
								class="text-primary hover:text-secondary hover:no-underline"
								href={item.link}
								target="_blank"
							>
								<img class="w-full" src={item.img} alt={item.title} />
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
