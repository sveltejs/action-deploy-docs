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
	{
		name: "03-project-files.md",
		is_dir: false,
		content:
			"---\ntitle: Project files\n---\n\nThe bulk of your app, in `src/routes`, can be left where it is, but several project files will need to be moved or updated.\n\n### Configuration\n\nYour `webpack.config.js` or `rollup.config.js` should be replaced with a `svelte.config.cjs`, as documented [here](/docs#configuration). Svelte preprocessor options should be moved to `config.preprocess`.\n\nYou will need to add an [adapter](/docs#adapters). `sapper build` is roughly equivalent to [adapter-node](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) while `sapper export` is roughly equivalent to [adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static), though you might prefer to use an adapter designed for the platform you're deploying to.\n\nIf you were using plugins for filetypes that are not automatically handled by [Vite](https://vitejs.dev), you will need to find Vite equivalents and add them to the [Vite config](/docs#configuration-vite).\n\n### src/client.js\n\nThis file has no equivalent in SvelteKit. Any custom logic (beyond `sapper.start(...)`) should be expressed in your `$layout.svelte` file, inside an `onMount` callback.\n\n### src/server.js\n\nThis file also has no direct equivalent, since SvelteKit apps can run in serverless environments. You can, however, use the [hooks module](/docs#hooks) to implement session logic.\n\n### src/service-worker.js\n\nMost imports from `@sapper/service-worker` have equivalents in [`$service-worker`](/docs#modules-service-worker):\n\n- `timestamp` is unchanged\n- `files` is unchanged\n- `shell` is now `build`\n- `routes` has been removed\n\n### src/template.html\n\nThe `src/template.html` file should be renamed `src/app.html`.\n\nRemove `%sapper.base%`, `%sapper.scripts%` and `%sapper.styles%`. Replace `%sapper.head%` with `%svelte.head%` and `%sapper.html%` with `%svelte.body%`.\n\nThe `<div id=\"sapper\">` is no longer necessary, though you can continue mounting the app to a wrapper element by specifying it with the [`target`](/docs#configuration-target) config option.\n\n### src/node_modules\n\nA common pattern in Sapper apps is to put your internal library in a directory inside `src/node_modules`. This doesn't work with Vite, so we use [`src/lib`](/docs#modules-lib) instead.\n",
	},
	{
		name: "04-pages.md",
		is_dir: false,
		content:
			"---\ntitle: Pages and layouts\n---\n\n### Renamed files\n\nYour custom error page component should be renamed from `_error.svelte` to `$error.svelte`. Any `_layout.svelte` files should likewise be renamed `$layout.svelte`. The `_` prefix now exclusively denotes your _own_ 'private' components and modules, as opposed to those with a special meaning to SvelteKit.\n\n### Imports\n\nThe `goto`, `prefetch` and `prefetchRoutes` imports from `@sapper/app` should be replaced with identical imports from [`$app/navigation`](/docs#modules-app-navigation).\n\nThe `stores` import from `@sapper/app` should be replaced — see the [Stores](#pages-and-layouts-stores) section below.\n\nAny files you previously imported from directories in `src/node_modules` will need to be replaced with [`$lib`](/docs#modules-lib) imports.\n\n### Preload\n\nAs before, pages and layout components can export a function that allows data to be loaded before rendering takes place.\n\nThis function has been renamed from `preload` to [`load`](/docs#loading), and its API has changed. Instead of two arguments — `page` and `session` — there is a single argument that includes both, along with `fetch` (which replaces `this.fetch`) and a new `context` object.\n\nThere is no more `this` object, and consequently no `this.fetch`, `this.error` or `this.redirect`. Instead of returning props directly, `load` now returns an object that _contains_ `props`, alongside various other things.\n\nLastly, if your page has a `load` method, make sure to return something otherwise you will get `Not found`.\n\n### Stores\n\nIn Sapper, you would get references to provided stores like so:\n\n```js\nimport { stores } from '@sapper/app';\nconst { preloading, page, session } = stores();\n```\n\nThe `page` and `session` stores still exist; `preloading` has been replaced with a `navigating` store that contains `from` and `to` properties.\n\nYou access them differently in SvelteKit. `stores` is now `getStores`, but in most cases it is unnecessary since you can import `navigating`, `page` and `session` directly from [`$app/stores`](/docs#modules-app-stores).\n\n### Routing\n\nRegex routes are no longer supported. Instead, use [fallthrough routes](/docs#routing-advanced-fallthrough-routes).\n\n### URLs\n\nIn Sapper, all relative URLs were resolved against the base URL — usually `/`, unless the `basepath` option was used — rather than against the current page.\n\nThis caused problems and is no longer the case in SvelteKit. Instead, URLs are resolved against the current page (or the destination page, for `fetch` URLs in `load` functions) instead.\n\n### &lt;a&gt; attributes\n\n- `sapper:prefetch` is now `sveltekit:prefetch`\n- `sapper:noscroll` is now `sveltekit:noscroll`\n",
	},
	{
		name: "05-endpoints.md",
		is_dir: false,
		content:
			"---\ntitle: Endpoints\n---\n\nIn Sapper, 'server routes' — now referred to as [endpoints](/docs#routing-endpoints) — received the `req` and `res` objects exposed by Node's `http` module (or the augmented versions provided by frameworks like Polka and Express).\n\nSvelteKit is designed to be agnostic as to where the app is running — it could be running on a Node server, but could equally be running on a serverless platform or in a Cloudflare Worker. For that reason, you no longer interact directly with `req` and `res`. Your endpoints will need to be updated to match the new signature.",
	},
	{
		name: "99-integrations.md",
		is_dir: false,
		content:
			"---\ntitle: Integrations\n---\n\nSee [sveltejs/integrations](https://github.com/sveltejs/integrations#sveltekit) for examples of setting up popular tools like PostCSS, Tailwind CSS, mdsvex, Firebase, GraphQL, and Bulma.",
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
	{
		title: "Project files",
		slug: "project-files",
		file: "03-project-files.md",
		sections: [
			{
				slug: "project-files-configuration",
				title: "Configuration",
				sections: [],
			},
			{
				slug: "project-files-src-client-js",
				title: "src/client.js",
				sections: [],
			},
			{
				slug: "project-files-src-server-js",
				title: "src/server.js",
				sections: [],
			},
			{
				slug: "project-files-src-service-worker-js",
				title: "src/service-worker.js",
				sections: [],
			},
			{
				slug: "project-files-src-template-html",
				title: "src/template.html",
				sections: [],
			},
			{
				slug: "project-files-src-node-modules",
				title: "src/node_modules",
				sections: [],
			},
		],
		content:
			'<p>The bulk of your app, in <code>src/routes</code>, can be left where it is, but several project files will need to be moved or updated.</p>\n<h3 id="project-files-configuration">Configuration</h3>\n<p>Your <code>webpack.config.js</code> or <code>rollup.config.js</code> should be replaced with a <code>svelte.config.cjs</code>, as documented <a href="/docs#configuration" rel="noopener noreferrer">here</a>. Svelte preprocessor options should be moved to <code>config.preprocess</code>.</p>\n<p>You will need to add an <a href="/docs#adapters" rel="noopener noreferrer">adapter</a>. <code>sapper build</code> is roughly equivalent to <a href="https://github.com/sveltejs/kit/tree/master/packages/adapter-node" target="_blank" rel="noopener noreferrer">adapter-node</a> while <code>sapper export</code> is roughly equivalent to <a href="https://github.com/sveltejs/kit/tree/master/packages/adapter-static" target="_blank" rel="noopener noreferrer">adapter-static</a>, though you might prefer to use an adapter designed for the platform you\'re deploying to.</p>\n<p>If you were using plugins for filetypes that are not automatically handled by <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>, you will need to find Vite equivalents and add them to the <a href="/docs#configuration-vite" rel="noopener noreferrer">Vite config</a>.</p>\n<h3 id="project-files-src-client-js">src/client.js</h3>\n<p>This file has no equivalent in SvelteKit. Any custom logic (beyond <code>sapper.start(...)</code>) should be expressed in your <code>$layout.svelte</code> file, inside an <code>onMount</code> callback.</p>\n<h3 id="project-files-src-server-js">src/server.js</h3>\n<p>This file also has no direct equivalent, since SvelteKit apps can run in serverless environments. You can, however, use the <a href="/docs#hooks" rel="noopener noreferrer">hooks module</a> to implement session logic.</p>\n<h3 id="project-files-src-service-worker-js">src/service-worker.js</h3>\n<p>Most imports from <code>@sapper/service-worker</code> have equivalents in <a href="/docs#modules-service-worker" rel="noopener noreferrer"><code>$service-worker</code></a>:</p>\n<ul>\n<li><code>timestamp</code> is unchanged</li>\n<li><code>files</code> is unchanged</li>\n<li><code>shell</code> is now <code>build</code></li>\n<li><code>routes</code> has been removed</li>\n</ul>\n<h3 id="project-files-src-template-html">src/template.html</h3>\n<p>The <code>src/template.html</code> file should be renamed <code>src/app.html</code>.</p>\n<p>Remove <code>%sapper.base%</code>, <code>%sapper.scripts%</code> and <code>%sapper.styles%</code>. Replace <code>%sapper.head%</code> with <code>%svelte.head%</code> and <code>%sapper.html%</code> with <code>%svelte.body%</code>.</p>\n<p>The <code>&#x3C;div id="sapper"></code> is no longer necessary, though you can continue mounting the app to a wrapper element by specifying it with the <a href="/docs#configuration-target" rel="noopener noreferrer"><code>target</code></a> config option.</p>\n<h3 id="project-files-src-node-modules">src/node_modules</h3>\n<p>A common pattern in Sapper apps is to put your internal library in a directory inside <code>src/node_modules</code>. This doesn\'t work with Vite, so we use <a href="/docs#modules-lib" rel="noopener noreferrer"><code>src/lib</code></a> instead.</p>',
	},
	{
		title: "Pages and layouts",
		slug: "pages-and-layouts",
		file: "04-pages.md",
		sections: [
			{
				slug: "pages-and-layouts-renamed-files",
				title: "Renamed files",
				sections: [],
			},
			{
				slug: "pages-and-layouts-imports",
				title: "Imports",
				sections: [],
			},
			{
				slug: "pages-and-layouts-preload",
				title: "Preload",
				sections: [],
			},
			{
				slug: "pages-and-layouts-stores",
				title: "Stores",
				sections: [],
			},
			{
				slug: "pages-and-layouts-routing",
				title: "Routing",
				sections: [],
			},
			{
				slug: "pages-and-layouts-urls",
				title: "URLs",
				sections: [],
			},
			{
				slug: "pages-and-layouts-a-attributes",
				title: "<a> attributes",
				sections: [],
			},
		],
		content:
			'<h3 id="pages-and-layouts-renamed-files">Renamed files</h3>\n<p>Your custom error page component should be renamed from <code>_error.svelte</code> to <code>$error.svelte</code>. Any <code>_layout.svelte</code> files should likewise be renamed <code>$layout.svelte</code>. The <code>_</code> prefix now exclusively denotes your <em>own</em> \'private\' components and modules, as opposed to those with a special meaning to SvelteKit.</p>\n<h3 id="pages-and-layouts-imports">Imports</h3>\n<p>The <code>goto</code>, <code>prefetch</code> and <code>prefetchRoutes</code> imports from <code>@sapper/app</code> should be replaced with identical imports from <a href="/docs#modules-app-navigation" rel="noopener noreferrer"><code>$app/navigation</code></a>.</p>\n<p>The <code>stores</code> import from <code>@sapper/app</code> should be replaced — see the <a href="#pages-and-layouts-stores" rel="noopener noreferrer">Stores</a> section below.</p>\n<p>Any files you previously imported from directories in <code>src/node_modules</code> will need to be replaced with <a href="/docs#modules-lib" rel="noopener noreferrer"><code>$lib</code></a> imports.</p>\n<h3 id="pages-and-layouts-preload">Preload</h3>\n<p>As before, pages and layout components can export a function that allows data to be loaded before rendering takes place.</p>\n<p>This function has been renamed from <code>preload</code> to <a href="/docs#loading" rel="noopener noreferrer"><code>load</code></a>, and its API has changed. Instead of two arguments — <code>page</code> and <code>session</code> — there is a single argument that includes both, along with <code>fetch</code> (which replaces <code>this.fetch</code>) and a new <code>context</code> object.</p>\n<p>There is no more <code>this</code> object, and consequently no <code>this.fetch</code>, <code>this.error</code> or <code>this.redirect</code>. Instead of returning props directly, <code>load</code> now returns an object that <em>contains</em> <code>props</code>, alongside various other things.</p>\n<p>Lastly, if your page has a <code>load</code> method, make sure to return something otherwise you will get <code>Not found</code>.</p>\n<h3 id="pages-and-layouts-stores">Stores</h3>\n<p>In Sapper, you would get references to provided stores like so:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">import</span> <span class="token punctuation">{</span> stores <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@sapper/app\'</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> preloading<span class="token punctuation">,</span> page<span class="token punctuation">,</span> session <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">stores</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>\n<p>The <code>page</code> and <code>session</code> stores still exist; <code>preloading</code> has been replaced with a <code>navigating</code> store that contains <code>from</code> and <code>to</code> properties.</p>\n<p>You access them differently in SvelteKit. <code>stores</code> is now <code>getStores</code>, but in most cases it is unnecessary since you can import <code>navigating</code>, <code>page</code> and <code>session</code> directly from <a href="/docs#modules-app-stores" rel="noopener noreferrer"><code>$app/stores</code></a>.</p>\n<h3 id="pages-and-layouts-routing">Routing</h3>\n<p>Regex routes are no longer supported. Instead, use <a href="/docs#routing-advanced-fallthrough-routes" rel="noopener noreferrer">fallthrough routes</a>.</p>\n<h3 id="pages-and-layouts-urls">URLs</h3>\n<p>In Sapper, all relative URLs were resolved against the base URL — usually <code>/</code>, unless the <code>basepath</code> option was used — rather than against the current page.</p>\n<p>This caused problems and is no longer the case in SvelteKit. Instead, URLs are resolved against the current page (or the destination page, for <code>fetch</code> URLs in <code>load</code> functions) instead.</p>\n<h3 id="pages-and-layouts-a-attributes">&#x3C;a> attributes</h3>\n<ul>\n<li><code>sapper:prefetch</code> is now <code>sveltekit:prefetch</code></li>\n<li><code>sapper:noscroll</code> is now <code>sveltekit:noscroll</code></li>\n</ul>',
	},
	{
		title: "Endpoints",
		slug: "endpoints",
		file: "05-endpoints.md",
		sections: [],
		content:
			'<p>In Sapper, \'server routes\' — now referred to as <a href="/docs#routing-endpoints" rel="noopener noreferrer">endpoints</a> — received the <code>req</code> and <code>res</code> objects exposed by Node\'s <code>http</code> module (or the augmented versions provided by frameworks like Polka and Express).</p>\n<p>SvelteKit is designed to be agnostic as to where the app is running — it could be running on a Node server, but could equally be running on a serverless platform or in a Cloudflare Worker. For that reason, you no longer interact directly with <code>req</code> and <code>res</code>. Your endpoints will need to be updated to match the new signature.</p>',
	},
	{
		title: "Integrations",
		slug: "integrations",
		file: "99-integrations.md",
		sections: [],
		content:
			'<p>See <a href="https://github.com/sveltejs/integrations#sveltekit" target="_blank" rel="noopener noreferrer">sveltejs/integrations</a> for examples of setting up popular tools like PostCSS, Tailwind CSS, mdsvex, Firebase, GraphQL, and Bulma.</p>',
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
	{
		title: "Project files",
		slug: "project-files",
		file: "03-project-files.md",
		sections: [
			{
				slug: "project-files-configuration",
				title: "Configuration",
				sections: [],
			},
			{
				slug: "project-files-src-client-js",
				title: "src/client.js",
				sections: [],
			},
			{
				slug: "project-files-src-server-js",
				title: "src/server.js",
				sections: [],
			},
			{
				slug: "project-files-src-service-worker-js",
				title: "src/service-worker.js",
				sections: [],
			},
			{
				slug: "project-files-src-template-html",
				title: "src/template.html",
				sections: [],
			},
			{
				slug: "project-files-src-node-modules",
				title: "src/node_modules",
				sections: [],
			},
		],
	},
	{
		title: "Pages and layouts",
		slug: "pages-and-layouts",
		file: "04-pages.md",
		sections: [
			{
				slug: "pages-and-layouts-renamed-files",
				title: "Renamed files",
				sections: [],
			},
			{
				slug: "pages-and-layouts-imports",
				title: "Imports",
				sections: [],
			},
			{
				slug: "pages-and-layouts-preload",
				title: "Preload",
				sections: [],
			},
			{
				slug: "pages-and-layouts-stores",
				title: "Stores",
				sections: [],
			},
			{
				slug: "pages-and-layouts-routing",
				title: "Routing",
				sections: [],
			},
			{
				slug: "pages-and-layouts-urls",
				title: "URLs",
				sections: [],
			},
			{
				slug: "pages-and-layouts-a-attributes",
				title: "<a> attributes",
				sections: [],
			},
		],
	},
	{
		title: "Endpoints",
		slug: "endpoints",
		file: "05-endpoints.md",
		sections: [],
	},
	{
		title: "Integrations",
		slug: "integrations",
		file: "99-integrations.md",
		sections: [],
	},
];
