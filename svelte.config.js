import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// This will prerender your entire site as a collection of static files.
		// If you'd like to prerender only some pages and dynamically server-render
		// others, you will need to use a different adapter together with the
		// prerender option.
		adapter: adapter()
	}
};

export default config;
