import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { importPageComponent } from 'scripts/import';

createInertiaApp({
	resolve: (name) => (
		importPageComponent(name, import.meta.glob('../views/pages/**/*.vue'))
	),
	setup({ el, app, props, plugin }) {
		const self = createApp({
			render: () => h( app, props )
		});

		self.use(plugin)
			.mount(el);
	},
});

InertiaProgress.init({ color: '#4B5563' });
