<script>
	import Header from './Header.svelte';
	import Contact from './Contact.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-max font-main">
	<Header />

	<main class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl">
		<slot />
	</main>

	<Contact />

	<footer class="flex flex-row justify-center items-center">
		<span class="pr-5">Built with <a href="https://kit.svelte.dev">SvelteKit</a></span>
		<span class="pr-5">© Copyright {new Date().getFullYear()} Wong Zhao Wu</span>
	</footer>
</div>
