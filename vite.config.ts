import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'perchunpak',
				project: 'make-it-longer'
			}
		}),
		sveltekit()
	],
	define: {
		'import.meta.vitest': 'undefined'
	},
	test: {
		globals: true,
		environment: 'jsdom',
		includeSource: ['{src,test}/**/*.{js,ts}']
	}
});
