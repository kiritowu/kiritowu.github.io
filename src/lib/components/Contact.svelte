<script lang="ts">
	import profile from '$lib/profile.json';
	import Icons from '$lib/components/Icons.svelte';

	let contacts: {
		name: string;
		url: string;
		iconName: 'github' | 'linkedIn' | 'twitter' | 'myAnimeList';
	}[] = [
		{
			name: 'GitHub',
			url: `https://${profile.contact.github}`,
			iconName: 'github'
		},
		{
			name: 'LinkedIn',
			url: `https://${profile.contact.linkedin}`,
			iconName: 'linkedIn'
		},
		{
			name: 'Twitter',
			url: `https://${profile.contact.twitter}`,
			iconName: 'twitter'
		},
		{
			name: 'Myanimelist',
			url: `https://${profile.contact.myanimelist}`,
			iconName: 'myAnimeList'
		}
	];
</script>

<article class="lg:fixed lg:left-8 lg:bottom-0 lg:z-10">
	<div class="flex flex-row lg:flex-col mb-4 justify-center">
		{#each contacts as contact}
			<a
				class="mb-2 mx-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full w-10 h-10 flex justify-center items-center"
				href={contact.url}
				target="_blank"
			>
				{#if contact.name == 'Myanimelist'}
					<Icons
						name={contact.iconName}
						width="2rem"
						height="2rem"
						class="fill-primary dark:primary-dark"
					/>
				{:else}
					<Icons
						name={contact.iconName}
						width="2rem"
						height="2rem"
						class="fill-primary dark:fill-primary-dark"
					/>
				{/if}
			</a>
		{/each}
	</div>
	<div class="hidden lg:block mx-auto h-24 w-px bg-gray-400 dark:bg-gray-500"></div>
</article>
