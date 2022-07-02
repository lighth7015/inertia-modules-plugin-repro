import { Plugin } from 'vite'
const TEMPLATE_LAYOUT_REGEX = /<template +layout(?: *= *['"](?:(?:(\w+):)?(\w+))['"] *)?>/;

/**
 * A basic Vite plugin that adds a <template layout="name"> syntax to Vite SFCs.
 * It must be used before the Vue plugin.
 */
export default (layouts: string = '@/views/layouts/'): Plugin => ({
	name: 'vite:inertia:layout',
	transform: (code: string) => {
		if (TEMPLATE_LAYOUT_REGEX.test(code)) {
			const isTypeScript = /lang=['"]ts['"]/.test(code)

			return code.replace(TEMPLATE_LAYOUT_REGEX, (_, __, layoutName) => `
				<script${isTypeScript ? ' lang="ts"' : ''}>
				import layout from '${layouts}${layoutName ?? 'default'}.vue'
				export default { layout }
				</script>
				<template>
			`);
		}
	},
})
