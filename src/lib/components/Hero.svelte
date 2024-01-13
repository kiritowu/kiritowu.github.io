<script lang="ts">
	import Typewriter from 'svelte-typewriter';

	// Props for Name Typewriter
	export let firstName = '';
	export let lastName = '';
	export let nickName = '';
	export let ign = '';
</script>

<section
	id="hero"
	class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl text-xl font-primary"
>
	<header class="flex items-center min-h-screen max-w-6xl">
		<div class="mx-auto">
			<h3 class="my-3 font-mono text-secondary text-lg md:text-xl">Hi, my name is</h3>
			<Typewriter mode="loopOnce" keepCursorOnFinish={true} wordInterval={700}>
				{#each [`${firstName}`, `${ign}`, `${nickName} ${lastName}`, `${nickName} ${lastName} ${firstName}`] as text}
					<h1 class="my-3 text-6xl md:text-6xl text-left">{text}</h1>
				{/each}
			</Typewriter>
			<h3 class="my-5 text-xl md:text-4xl text-left font-extrabold font-heading text-secondary">
				NUSC w/ CS @ 2029
			</h3>
			<h3 class="my-2 text-lg md:text-xl">
				💡 Conscientiously Driven | 💻 Aspiring ML Engineer | 🏞️ Outdoor Enthusiasts
			</h3>
		</div>
	</header>
</section>
