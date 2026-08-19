<script lang="ts">
	import { siGithub, siLinkedin, siMyanimelist, siX } from 'simple-icons';
	import profile from '$lib/profile.yaml';
	import SimpleIcon from '$lib/components/SimpleIcon.svelte';
</script>

<article class="lg:fixed lg:left-8 lg:bottom-0 lg:z-10">
	<div class="flex flex-row lg:flex-col mb-4 justify-center">
		<a
			class="mb-2 mx-2 w-10 h-10 flex justify-center items-center"
			href="https://{profile.contact.github}"
			target="_blank"
			aria-label="GitHub"
		>
			<SimpleIcon icon={siGithub} size={20} />
		</a>
		<a
			class="mb-2 mx-2 w-10 h-10 flex justify-center items-center"
			href="https://{profile.contact.linkedin}"
			target="_blank"
			aria-label="LinkedIn"
		>
			<SimpleIcon icon={siLinkedin} size={20} />
		</a>
		<a
			class="mb-2 mx-2 w-10 h-10 flex justify-center items-center"
			href="https://{profile.contact.twitter}"
			target="_blank"
			aria-label="Twitter"
		>
			<SimpleIcon icon={siX} size={20} />
		</a>
		<a
			class="mb-2 mx-2 w-10 h-10 flex justify-center items-center"
			href="https://{profile.contact.myanimelist}"
			target="_blank"
			aria-label="MyAnimeList"
		>
			<SimpleIcon icon={siMyanimelist} size={20} />
		</a>
	</div>
	<div class="hidden lg:block mx-auto h-24 w-px bg-gray-400 dark:bg-gray-500"></div>
</article>
