<script>
	import Header from './Header.svelte';
	import Contact from './Contact.svelte';
	import './styles.css';
	import '../app.css';
</script>

<div class="flex flex-col min-h-max">
	<Header />

	<main class="md:container md:mx-auto">
		<slot />
	</main>

	<Contact />

	<footer class="flex flex-row justify-center items-center">
		<span class="pr-5">Built with <a href="https://kit.svelte.dev">SvelteKit</a></span>
		<span class="pr-5">© {new Date().getFullYear()} Wong Zhao Wu</span>
	</footer>
</div>
