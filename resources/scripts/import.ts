export function importPageComponent(name: string, pages: Record<string, any>) {
	const items = Object.entries(pages);
	const keys: Array<string> = Object.keys(pages);

	console.log(name);

	const mapping = items.reduce((collection: Array<any>, iterator: Array<any>, index: number) => {
		if (keys[index].endsWith(`${name.replaceAll('.', '/')}.vue`)) {
			const [ _, instance ] = iterator;
			const isConstructor = (typeof instance) === 'function';
			collection.push(isConstructor && instance() || instance);
		}

		return collection;
	}, []);

	if (mapping.length === 0) {
		throw new Error('Page not found: '.concat(name));
	}
	else {
		return mapping[0];
	}
}
