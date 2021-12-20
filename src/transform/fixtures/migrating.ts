import { Doc, DocMeta } from "../../types";

export const migrating_in = [
	{
		name: "01-migrating.md",
		is_dir: false,
		content:
			"---\ntitle: Migrating from Sapper\n---\n\nSvelteKit is the successor to Sapper and shares many elements of its design.\n\nIf you have an existing Sapper app that you plan to migrate to SvelteKit, however, there are a number of changes you will need to make. You may find it helpful to view the [examples](https://github.com/sveltejs/kit/tree/master/examples) while migrating.\n\n",
	},
	{
		name: "02-pkg.md",
		is_dir: false,
		content:
			'---\ntitle: package.json\n---\n\n### type : "module"\n\nAdd `"type": "module"` to your `package.json`\n\n### dependencies\n\nRemove `polka` or `express`, if you\'re using one of those, and any middleware such as `sirv` or `compression`.\n\n### devDependencies\n\nRemove `sapper` from your `devDependencies` and replace it with `@sveltejs/kit`, `vite`, and whichever [adapter](/docs#adapters) you plan to use (see [next section](#project-files-configuration)).\n\n### scripts\n\nAny scripts that reference the `sapper` binary should be updated:\n\n* `sapper build` or `sapper export` should become [`svelte-kit build`](/docs#command-line-interface-svelte-kit-build)\n* `sapper dev` should become [`svelte-kit dev`](/docs#command-line-interface-svelte-kit-dev)\n\nAdditionally, [`svelte-kit start`](/docs#command-line-interface-svelte-kit-start) replaces any command that invokes your Sapper-built server.\n',
	},
];

export const migrating_out_full: Doc[] = [
	{
		title: "Migrating from Sapper",
		slug: "migrating-from-sapper",
		file: "01-migrating.md",
		sections: [],
		content:
			'<p>SvelteKit is the successor to Sapper and shares many elements of its design.</p>\n<p>If you have an existing Sapper app that you plan to migrate to SvelteKit, however, there are a number of changes you will need to make. You may find it helpful to view the <a href="https://github.com/sveltejs/kit/tree/master/examples" target="_blank" rel="noopener noreferrer">examples</a> while migrating.</p>',
	},
	{
		title: "package.json",
		slug: "package-json",
		file: "02-pkg.md",
		sections: [
			{
				slug: "package-json-type-module",
				title: 'type : "module"',
				sections: [],
			},
			{
				slug: "package-json-dependencies",
				title: "dependencies",
				sections: [],
			},
			{
				slug: "package-json-devdependencies",
				title: "devDependencies",
				sections: [],
			},
			{
				slug: "package-json-scripts",
				title: "scripts",
				sections: [],
			},
		],
		content:
			'<h3 id="package-json-type-module">type : "module"</h3>\n<p>Add <code>"type": "module"</code> to your <code>package.json</code></p>\n<h3 id="package-json-dependencies">dependencies</h3>\n<p>Remove <code>polka</code> or <code>express</code>, if you\'re using one of those, and any middleware such as <code>sirv</code> or <code>compression</code>.</p>\n<h3 id="package-json-devdependencies">devDependencies</h3>\n<p>Remove <code>sapper</code> from your <code>devDependencies</code> and replace it with <code>@sveltejs/kit</code>, <code>vite</code>, and whichever <a href="/docs#adapters" rel="noopener noreferrer">adapter</a> you plan to use (see <a href="#project-files-configuration" rel="noopener noreferrer">next section</a>).</p>\n<h3 id="package-json-scripts">scripts</h3>\n<p>Any scripts that reference the <code>sapper</code> binary should be updated:</p>\n<ul>\n<li><code>sapper build</code> or <code>sapper export</code> should become <a href="/docs#command-line-interface-svelte-kit-build" rel="noopener noreferrer"><code>svelte-kit build</code></a></li>\n<li><code>sapper dev</code> should become <a href="/docs#command-line-interface-svelte-kit-dev" rel="noopener noreferrer"><code>svelte-kit dev</code></a></li>\n</ul>\n<p>Additionally, <a href="/docs#command-line-interface-svelte-kit-start" rel="noopener noreferrer"><code>svelte-kit start</code></a> replaces any command that invokes your Sapper-built server.</p>',
	},
];

export const migrating_out_list: DocMeta[] = [
	{
		title: "Migrating from Sapper",
		slug: "migrating-from-sapper",
		file: "01-migrating.md",
		sections: [],
	},
	{
		title: "package.json",
		slug: "package-json",
		file: "02-pkg.md",
		sections: [
			{
				slug: "package-json-type-module",
				title: 'type : "module"',
				sections: [],
			},
			{
				slug: "package-json-dependencies",
				title: "dependencies",
				sections: [],
			},
			{
				slug: "package-json-devdependencies",
				title: "devDependencies",
				sections: [],
			},
			{
				slug: "package-json-scripts",
				title: "scripts",
				sections: [],
			},
		],
	},
];
