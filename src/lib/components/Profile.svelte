<script lang="ts">
	import { marked } from 'marked';
	import profilePic from '$lib/images/profile-pic-cropped.jpg';

	export let descriptions: string[] = ['Sample description'];
</script>

<section id="about" class="my-10">
	<h1 class="my-3">About Me</h1>
	<hr class="my-3 text-primary border-primary" />
	<div class="flex md:flex-row flex-col justify-between">
		<div class="md:basis-1/3 px-10 mb-7">
			<img class="rounded-full shadow-lg shadow-slate-800" src={profilePic} alt="profile" />
		</div>
		<div class="md:basis-3/5">
			{#each descriptions as description}
				<p class="mb-2 md:text-lg">{@html marked(description)}</p>
			{/each}
		</div>
	</div>
</section>
