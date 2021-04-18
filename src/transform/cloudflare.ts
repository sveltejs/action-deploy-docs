interface Transform_Options {
	project: string;
	type: string;
	keyby: string;
	version?: string;
}

export interface CF_Key {
	key: string;
	value: string;
}

export interface Docs {
	list: Array<Record<string, unknown>>;
	full: Array<Record<string, unknown>>;
}

export function transform_cloudflare(
	docs: Docs,
	{ project, type, keyby, version = "latest" }: Transform_Options
) {
	const keys: CF_Key[] = [
		{
			key: `${project}@${version}:${type}:content`,
			value: JSON.stringify(docs.full),
		},
	];

	for (let i = 0; i < docs.full.length; i++) {
		// const { content, ...rest } = docs[i];

		const item_key = docs.full[i][keyby];

		keys.push({
			key: `${project}@${version}:${type}:${item_key}`,
			value: JSON.stringify(docs.full[i]),
		});
	}

	keys.push({
		key: `${project}@${version}:${type}:list`,
		value: JSON.stringify(docs.list),
	});

	return keys;
}
