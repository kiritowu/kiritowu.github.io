<script lang="ts">
	import Typewriter from 'svelte-typewriter';

	export let firstName = '';
	export let lastName = '';
	export let nickName = '';
	export let ign = '';
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
	<div id="graph" class="absolute my-auto top-0 right-0 w-4/5 h-4/5 -z-10"></div>
</section>
