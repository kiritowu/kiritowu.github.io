<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import Typewriter from 'svelte-typewriter';

	// Props for Name Typewriter
	export let firstName = '';
	export let lastName = '';
	export let nickName = '';
	export let ign = '';

	// Skill Globe with D3
	let el: SVGElement;

	onMount(async () => {
		// @ts-ignore
		const _3d = await import('d3-3d');
		d3.select(el).append('g');
	});
</script>

<section id="hero" class="text-xl font-primary">
	<header class="flex items-center min-h-screen max-w-6xl">
		<div class="">
			<h3 class="my-3 font-mono text-secondary text-lg md:text-xl">Hi, my name is</h3>
			<Typewriter mode="loopOnce" keepCursorOnFinish={true} wordInterval={700}>
				{#each [`${firstName}`, `${ign}`, `${nickName} ${lastName}`, `${nickName} ${lastName} ${firstName}`] as text}
					<h1 class="my-3 text-5xl md:text-6xl text-left">{text}</h1>
				{/each}
			</Typewriter>
			<h1 class="my-5 text-xl md:text-4xl text-left font-extrabold font-heading text-secondary">
				NUSC w/ CS @ 2029
			</h1>
			<h3 class="my-2 text-lg md:text-xl">
				💡 Conscientiously Driven | 💻 Aspiring ML Engineer | 🏞️ Outdoor Enthusiasts
			</h3>
		</div>
	</header>
	<svg bind:this={el} id="graph" class="absolute my-auto top-0 right-0 w-4/5 h-4/5 -z-10"></svg>
</section>
