<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';

	import Header from '$lib/components/Header.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import '../app.css';

	onMount(() => {
		const localTheme = localStorage.getItem('theme');
		// Set theme to localStorage if available, else use system default
		if (localTheme) {
			theme.set(localTheme);
		} else {
			theme.set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		}

		theme.subscribe((value) => {
			if (value === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
			localStorage.setItem('theme', value);
		});
	});
</script>

<svelte:head>
	<meta name="google-site-verification" content="K3w6iuhMwMqP0lFTlrErB5WZ9v-l0w-MIdQBtyvgFks" />
</svelte:head>

<div class="min-h-max font-main">
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
