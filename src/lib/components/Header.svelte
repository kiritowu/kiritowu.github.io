<script>
	import { onMount } from 'svelte';
	import { Menu, Moon, Sun, X } from '@lucide/svelte';
	import { theme } from '$lib/stores';

	export let navs = ['about'];

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
	class="fixed transition-all before:pointer-events-none before:absolute before:inset-0 before:bg-white/60 before:backdrop-blur-xl before:backdrop-saturate-150 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-8 after:bg-gradient-to-b after:from-white/60 after:to-transparent dark:before:bg-neutral-900/60 dark:after:from-neutral-900/60 {nav_visible
		? 'top-0'
		: '-top-32'} left-0 right-0 z-40 font-main text-primary dark:text-primary-dark"
>
	<nav class="relative mx-auto flex w-full max-w-7xl items-center px-5 py-6">
		<ul class="mr-auto hidden justify-start gap-10 md:flex">
			{#each navs as nav}
				<li>
					<a class="font-normal hover:no-underline focus:outline-none" href="#{nav}"
						>{nav.charAt(0).toUpperCase() + nav.slice(1)}</a
					>
				</li>
			{/each}
		</ul>
		<!-- Button for theme -->
		<button
			class="ml-auto hidden rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-600 md:block"
			aria-label="Toggle theme"
			on:click={() => {
				theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
			}}
		>
			{#if $theme === 'dark'}
				<Sun size={20} />
			{:else}
				<Moon size={20} />
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
				<Menu size={20} />
			{:else}
				<X size={20} />
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
			<!-- Button for theme -->
			<button
				class="flex h-10 w-10 self-center items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-600"
				aria-label="Toggle theme"
				on:click={() => {
					theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
				}}
			>
				{#if $theme === 'dark'}
					<Sun size={20} />
				{:else}
					<Moon size={20} />
				{/if}
			</button>
		</ul>
	</nav>
</header>
