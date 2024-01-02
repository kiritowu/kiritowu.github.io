<section id="projects" class="my-10">
	<h1 class="my-2">Project Gallery</h1>
	<hr class="my-3 text-primary border-primary" />
	<div class="flex flex-row">
		<div class="basis-1/5 p-4 rounded bg-gray-500 bg-origin-content">
			<h2 class="my-auto">Computer Vision</h2>
		</div>
		<div class="basis-4/5 flex flex-row flex-wrap self-stretch">
			{#each [1, 2, 3, 4] as temp}
				<a class="basis-1/3 rounded p-1 bg-slate-500" href="https://www.google.com" target="_blank">
					<img class="h-1/2 block" />
					<div class="m-3">
						<h3 class="py-auto text-lg">Lorem Ipsum</h3>
						<p class="text-sm">
							Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
							velit
						</p>
						<hr />
						<div class="flex flex-row p-2">
							<button class="rounded-full bg-fuchsia-300 p-1">Firebase</button>
							<button class="rounded-full bg-fuchsia-300 p-1">TypeScript</button>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
