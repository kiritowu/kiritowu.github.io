import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [ViteYaml(), enhancedImages(), sveltekit()]
});
