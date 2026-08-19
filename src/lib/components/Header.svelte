<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';

	export let navs = ['about', 'experience', 'projects'];

	let menu_visible = false; // menu navigation on mobile
	let nav_visible = true;
	let prevScollPos = 0;

	onMount(() => {
		window.onscroll = () => {
			var currentScrollPos = window.scrollY;
			if (prevScollPos > currentScrollPos) {
				nav_visible = true;
			} else {
				nav_visible = false;
			}
			prevScollPos = currentScrollPos;
		};
	});
</script>

<header
	class="fixed transition-all {nav_visible
		? 'top-0'
		: ' -top-16'} right-0 font-mono text-primary dark:text-primary-dark"
>
	<nav class="px-4 py-6 flex justify-between items-center w-full">
		<ul class="hidden md:flex ml-auto justify-start mr-2">
			{#each navs as nav}
				<li class="px-3">
					<a class="font-normal hover:no-underline focus:outline-none" href="#{nav}"
						>{nav.charAt(0).toUpperCase() + nav.slice(1)}</a
					>
				</li>
			{/each}
			<li class="px-3">
				<a class="font-normal hover:no-underline focus:outline-none" href="/WongZhaoWu-resume.pdf">
					Résumé
				</a>
			</li>
		</ul>
		<!-- Button for theme -->
		<button
			class="hidden md:block rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 p-1 mr-2"
			aria-label="Toggle theme"
			on:click={() => {
				theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
			}}
		>
			{#if $theme === 'dark'}
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
				</svg>
			{:else}
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
				</svg>
			{/if}
		</button>

		<!-- Menu Navigation on Mobile -->
		<button
			class="ml-auto px-2 h-10 w-10 z-30 md:hidden rounded-full hover:bg-secondary focus:bg-secondary flex items-center justify-center"
			aria-label={menu_visible ? 'Close menu' : 'Open menu'}
			on:click={() => {
				menu_visible = !menu_visible;
			}}
		>
			{#if !menu_visible}
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>
			{:else}
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			{/if}
		</button>
		<div
			class="fixed inset-0 md:hidden bg-black bg-opacity-50 z-10 opacity-100 {menu_visible
				? 'visible'
				: 'invisible'}"
			role="button"
			tabindex="-1"
			on:mousedown={() => {
				// Hide menu when click on blured region
				menu_visible = false;
			}}
		></div>
		<ul
			class="fixed inset-y-0 md:hidden right-0 bg-white dark:bg-slate-800 flex flex-col justify-center transform transition-all duration-300 z-20 overflow-hidden translate-x-0 shadow-lg {menu_visible
				? 'visible w-56'
				: 'invisible w-0'}"
		>
			{#each navs as nav}
				<li class="px-3">
					<a
						class="mb-8 px-4 py-2 text-center block hover:text-secondary focus:text-secondary focus:outline-none"
						href="#{nav}">{nav.charAt(0).toUpperCase() + nav.slice(1)}</a
					>
				</li>
			{/each}
			<!-- Hyperlink for Resume -->
			<li class="px-3">
				<a
					class="mb-8 px-4 py-2 text-center block hover:text-secondary focus:text-secondary focus:outline-none"
					href="/WongZhaoWu-resume.pdf">Résumé</a
				>
			</li>
			<!-- Button for theme -->
			<button
				class="rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 p-1 mr-2"
				aria-label="Toggle theme"
				on:click={() => {
					theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
				}}
			>
				{#if $theme === 'dark'}
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<circle cx="12" cy="12" r="4" />
						<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
					</svg>
				{:else}
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
					</svg>
				{/if}
			</button>
		</ul>
	</nav>
</header>
