<script lang="ts">
	import * as simpleIcons from 'simple-icons';

	import profile from '$lib/profile.json';
	import SimpleIcon from '$lib/components/SimpleIcon.svelte';

	let contacts: {
		name: string;
		url: string;
		iconName: keyof typeof simpleIcons;
	}[] = [
		{
			name: 'GitHub',
			url: `https://${profile.contact.github}`,
			iconName: 'siGithub'
		},
		{
			name: 'LinkedIn',
			url: `https://${profile.contact.linkedin}`,
			iconName: 'siLinkedin'
		},
		{
			name: 'Twitter',
			url: `https://${profile.contact.twitter}`,
			iconName: 'siX'
		},
		{
			name: 'Myanimelist',
			url: `https://${profile.contact.myanimelist}`,
			iconName: 'siMyanimelist'
		}
	];
</script>

<article class="lg:fixed lg:left-8 lg:bottom-0 lg:z-10">
	<div class="flex flex-row lg:flex-col mb-4 justify-center">
		{#each contacts as contact}
			<a
				class="mb-2 mx-2 w-10 h-10 flex justify-center items-center"
				href={contact.url}
				target="_blank"
			>
				<SimpleIcon baseName={contact.iconName} />
			</a>
		{/each}
	</div>
	<div class="hidden lg:block mx-auto h-24 w-px bg-gray-400 dark:bg-gray-500"></div>
</article>
