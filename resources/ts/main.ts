import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
//import { importPageComponent } from 'scripts/import';
import { resolvePage } from '~inertia'

createInertiaApp({
	resolve: resolvePage(() => (
		import.meta.glob('./pages/**/*.vue')
	)),

	setup({ el, app, props, plugin }) {
		const self = createApp({
			render: () => h( app, props )
		});

		self.use(plugin)
			.mount(el);
	},
});

InertiaProgress.init({ color: '#4B5563' });
