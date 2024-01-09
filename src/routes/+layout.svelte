<script>
	import Header from '$lib/components/Header.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import '../app.css';
</script>

<div class="min-h-max font-main bg-white">
	<Header />

	<main>
		<slot />
	</main>

	<Contact />

	<footer class="flex flex-row flex-wrap justify-center items-center">
		<span class="pr-5">Built with <a href="https://kit.svelte.dev">SvelteKit</a></span>
		<span class="pr-5">© Copyright {new Date().getFullYear()} Wong Zhao Wu</span>
	</footer>
</div>
