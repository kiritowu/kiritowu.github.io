<script>
	import profile from '$lib/profile.json';
	import icon_github from '$lib/images/github.svg';
	import icon_linkedin from '$lib/images/linkedin.svg';
	import icon_twitter from '$lib/images/twitter.svg';

	let contacts = [
		{
			name: 'GitHub',
			url: `https://${profile.contact.github}`,
			icon: icon_github
		},
		{
			name: 'LinkedIn',
			url: `https://${profile.contact.linkedin}`,
			icon: icon_linkedin
		},
		{
			name: 'Twitter',
			url: `https://${profile.contact.twitter}`,
			icon: icon_twitter
		}
	];
</script>

<article class="fixed left-8 bottom-0 z-10">
	<div class="flex flex-col mb-4">
		{#each contacts as contact}
			<a class="mb-3" href={contact.url} target="_blank">
				<img class="object-content w-10 h-10" src={contact.icon} alt={contact.name} />
			</a>
		{/each}
	</div>
	<div class="mx-auto h-24 w-px bg-gray-400 dark:bg-gray-500"></div>
</article>
