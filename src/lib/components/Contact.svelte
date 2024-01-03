<script>
	import profile from '$lib/profile.json';
	import icon_github from '$lib/images/icons/github.svg';
	import icon_linkedin from '$lib/images/icons/linkedin.svg';
	import icon_twitter from '$lib/images/icons/twitter.svg';

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

<article class="lg:fixed lg:left-8 lg:bottom-0 lg:z-10">
	<div class="flex flex-row lg:flex-col mb-4 justify-center">
		{#each contacts as contact}
			<a class="mb-3 mx-2" href={contact.url} target="_blank">
				<img class="object-content w-10 h-10" src={contact.icon} alt={contact.name} />
			</a>
		{/each}
	</div>
	<div class="hidden lg:block mx-auto h-24 w-px bg-gray-400 dark:bg-gray-500"></div>
</article>
