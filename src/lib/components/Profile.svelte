<script lang="ts">
	import { marked } from 'marked';
	import profilePic from '$lib/images/profile-pic-cropped.jpg?enhanced';

	export let descriptions: string[] = ['Sample description'];
</script>

<section id="about" class="py-16 bg-sky dark:bg-sky-dark">
	<div class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl">
		<h1 class="mb-6">About Me</h1>
		<div class="flex md:flex-row flex-col justify-between">
			<div class="md:basis-1/3 pr-10 mb-7">
				<enhanced:img
					class="rounded-xl shadow-lg shadow-slate-800"
					src={profilePic}
					alt="profile"
				/>
			</div>
			<div class="md:basis-3/5">
				{#each descriptions as description}
					<p class="mb-2 md:text-lg">{@html marked(description)}</p>
				{/each}
			</div>
		</div>
	</div>
</section>
