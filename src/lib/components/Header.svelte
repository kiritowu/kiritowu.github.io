<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';

	export let navs = ['about', 'skills', 'experience', 'projects'];

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
			on:click={() => {
				theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
			}}
		>
			{#if $theme === 'dark'}
				<i class="fa fa-sun-o fa-lg"></i>
			{:else}
				<i class="fa fa-moon-o fa-lg"></i>
			{/if}
		</button>

		<!-- Menu Navigation on Mobile -->
		<button
			class="ml-auto px-2 h-10 w-10 z-30 md:hidden rounded-full hover:bg-secondary focus:bg-secondary"
			on:click={() => {
				menu_visible = !menu_visible;
			}}
		>
			{#if !menu_visible}
				<i class="fa fa-bars fa-lg" />
			{:else}
				<i class="fa fa-times fa-lg" />
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
				on:click={() => {
					theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
				}}
			>
				{#if $theme === 'dark'}
					<i class="fa fa-sun-o fa-lg"></i>
				{:else}
					<i class="fa fa-moon-o fa-lg"></i>
				{/if}
			</button>
		</ul>
	</nav>
</header>
