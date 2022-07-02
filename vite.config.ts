const path = require('path');
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import inertia from 'inertia-plugin/vite'
import inspect from 'vite-plugin-inspect';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	build: {
		rollupOptions: {
			output: ({
				manualChunks(name: string) {
					if (name.includes('vuetify')) {
						return 'material';
					}
					if (name.includes('axios')) {
						return 'http';
					}
					if (name.includes('node_modules') === false) {
						if (name.includes('Modules/Myapp/Resources')) {
							const prefix: string = ((name.includes('/views') && 'admin/pages') || 'admin').concat('/');
							const suffix: string = '.'.concat((name.includes('/views') && 'vue') || 'ts');

							return prefix.concat(path.basename(name, suffix));
						}
						if (name.includes('resources')) {
							const prefix: string = ((name.includes('/views') && 'web/pages') || 'web').concat('/');
							const suffix: string = '.'.concat((name.includes('/views') && 'vue') || 'ts');

							return prefix.concat(path.basename(name, suffix));
						}
						// console.log(name);
					}
				}
			}),
		}
	},

	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
		alias:{
			'scripts' : path.resolve(__dirname, 'resources/scripts/'),
			'admin' : path.resolve(__dirname, 'Modules/Myapp/Resources'),
			'web' : path.resolve(__dirname, 'resources')
		},
	},

	plugins: [
		inspect(),
		inertia(({ composer }) => {
			namespaces: [
				composer( 'hpprx/core', '.' ),
				composer( 'hpprx/myapp', 'Modules/Myapp' ),
			]
		}),
		vue(),

		laravel([
			'resources/ts/main.ts'
		]),
	]
});
