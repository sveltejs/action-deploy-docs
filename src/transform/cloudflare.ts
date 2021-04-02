interface Transform_Options {
	project: string;
	type: string;
	keyby: string;
	version?: string;
}

interface CF_Key {
	key: string;
	value: string;
}

export function transform_cloudflare(
	docs: Array<Record<string, unknown>>,
	{ project, type, keyby, version = "latest" }: Transform_Options
) {
	const _list = [];
	const keys: CF_Key[] = [
		{
			key: `${project}@${version}:${type}:content`,
			value: JSON.stringify(docs),
		},
	];

	for (let i = 0; i < docs.length; i++) {
		const { content, ...rest } = docs[i];
		_list.push(rest);

		const item_key = docs[i][keyby];

		keys.push({
			key: `${project}@${version}:${type}:${item_key}`,
			value: JSON.stringify(docs[i]),
		});
	}

	keys.push({
		key: `${project}@${version}:${type}:list`,
		value: JSON.stringify(_list),
	});

	return keys;
}
