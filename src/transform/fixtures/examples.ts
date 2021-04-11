import type { ExamplesCatSource } from "../transform_docs";

export const examples_in: ExamplesCatSource[] = [
	{
		name: "00-introduction",
		content: [
			{
				name: "00-hello-world",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello {name}!</h1>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Hello world"\n}',
					},
				],
			},
			{
				name: "01-dynamic-attributes",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet src = 'tutorial/image.gif';\n\tlet name = 'Rick Astley';\n</script>\n\n<!-- {src} is short for src={src} -->\n<img {src} alt=\"{name} dancing\">",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Dynamic attributes"\n}',
					},
				],
			},
			{
				name: "02-styling",
				content: [
					{
						name: "App.svelte",
						content:
							"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>Styled!</p>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Styling"\n}',
					},
				],
			},
			{
				name: "03-nested-components",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>These styles...</p>\n<Nested/>",
					},
					{
						name: "Nested.svelte",
						content: "<p>...don't affect this element</p>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Nested components"\n}',
					},
				],
			},
			{
				name: "04-html-tags",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet string = `here's some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{@html string}</p>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "HTML tags"\n}',
					},
				],
			},
			{
				name: "meta.json",
				content: '{\n\t"title": "Introduction"\n}',
			},
		],
	},
	{
		name: "01-reactivity",
		content: [
			{
				name: "00-reactive-assignments",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Reactive assignments"\n}',
					},
				],
			},
			{
				name: "01-reactive-declarations",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet count = 1;\n\n\t// the `$:` means 're-run whenever these values change'\n\t$: doubled = count * 2;\n\t$: quadrupled = doubled * 2;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tCount: {count}\n</button>\n\n<p>{count} * 2 = {doubled}</p>\n<p>{doubled} * 2 = {quadrupled}</p>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Reactive declarations"\n}',
					},
				],
			},
			{
				name: "02-reactive-statements",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet count = 0;\n\n\t$: if (count >= 10) {\n\t\talert(`count is dangerously high!`);\n\t\tcount = 9;\n\t}\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Reactive statements"\n}',
					},
				],
			},
			{
				name: "meta.json",
				content: '{\n\t"title": "Reactivity"\n}',
			},
		],
	},
	{
		name: "02-props",
		content: [
			{
				name: "00-declaring-props",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>",
					},
					{
						name: "Nested.svelte",
						content:
							"<script>\n\texport let answer;\n</script>\n\n<p>The answer is {answer}</p>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Declaring props"\n}',
					},
				],
			},
			{
				name: "01-default-values",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>\n<Nested/>",
					},
					{
						name: "Nested.svelte",
						content:
							"<script>\n\texport let answer = 'a mystery';\n</script>\n\n<p>The answer is {answer}</p>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Default values"\n}',
					},
				],
			},
			{
				name: "02-spread-props",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\timport Info from './Info.svelte';\n\n\tconst pkg = {\n\t\tname: 'svelte',\n\t\tversion: 3,\n\t\tspeed: 'blazing',\n\t\twebsite: 'https://svelte.dev'\n\t};\n</script>\n\n<Info {...pkg}/>",
					},
					{
						name: "Info.svelte",
						content:
							'<script>\n\texport let name;\n\texport let version;\n\texport let speed;\n\texport let website;\n</script>\n\n<p>\n\tThe <code>{name}</code> package is {speed} fast.\n\tDownload version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>\n\tand <a href={website}>learn more here</a>\n</p>',
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Spread props"\n}',
					},
				],
			},
			{
				name: "meta.json",
				content: '{\n\t"title": "Props"\n}',
			},
		],
	},
	{
		name: "03-logic",
		content: [
			{
				name: "00-if-blocks",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "If blocks"\n}',
					},
				],
			},
			{
				name: "01-else-blocks",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Else blocks"\n}',
					},
				],
			},
			{
				name: "02-else-if-blocks",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Else-if blocks"\n}',
					},
				],
			},
			{
				name: "03-each-blocks",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t{#each cats as { id, name }, i}\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={id}\">\n\t\t\t{i + 1}: {name}\n\t\t</a></li>\n\t{/each}\n</ul>",
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Each blocks"\n}',
					},
				],
			},
			{
				name: "04-keyed-each-blocks",
				content: [
					{
						name: "App.svelte",
						content:
							"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n<div style=\"display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em\">\n\t<div>\n\t\t<h2>Keyed</h2>\n\t\t{#each things as thing (thing.id)}\n\t\t\t<Thing current={thing.color}/>\n\t\t{/each}\n\t</div>\n\n\t<div>\n\t\t<h2>Unkeyed</h2>\n\t\t{#each things as thing}\n\t\t\t<Thing current={thing.color}/>\n\t\t{/each}\n\t</div>\n</div>\n",
					},
					{
						name: "Thing.svelte",
						content:
							'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Keyed each blocks"\n}',
					},
				],
			},
			{
				name: "05-await-blocks",
				content: [
					{
						name: "App.svelte",
						content:
							'<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style="color: red">{error.message}</p>\n{/await}',
					},
					{
						name: "meta.json",
						content: '{\n\t"title": "Await blocks"\n}',
					},
				],
			},
			{
				name: "meta.json",
				content: '{\n\t"title": "Logic"\n}',
			},
		],
	},
];

export const examples_out_full = [
	{
		name: "Hello world",
		slug: "hello-world",
		thumbnail: "examples/thumbnails/hello-world.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello {name}!</h1>",
			},
		],
	},
	{
		name: "Dynamic attributes",
		slug: "dynamic-attributes",
		thumbnail: "examples/thumbnails/dynamic-attributes.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet src = 'tutorial/image.gif';\n\tlet name = 'Rick Astley';\n</script>\n\n<!-- {src} is short for src={src} -->\n<img {src} alt=\"{name} dancing\">",
			},
		],
	},
	{
		name: "Styling",
		slug: "styling",
		thumbnail: "examples/thumbnails/styling.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>Styled!</p>",
			},
		],
	},
	{
		name: "Nested components",
		slug: "nested-components",
		thumbnail: "examples/thumbnails/nested-components.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>These styles...</p>\n<Nested/>",
			},
			{
				name: "Nested.svelte",
				type: "svelte",
				content: "<p>...don't affect this element</p>",
			},
		],
	},
	{
		name: "HTML tags",
		slug: "html-tags",
		thumbnail: "examples/thumbnails/html-tags.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet string = `here's some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{@html string}</p>",
			},
		],
	},
	{
		name: "Reactive assignments",
		slug: "reactive-assignments",
		thumbnail: "examples/thumbnails/reactive-assignments.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
			},
		],
	},
	{
		name: "Reactive declarations",
		slug: "reactive-declarations",
		thumbnail: "examples/thumbnails/reactive-declarations.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 1;\n\n\t// the `$:` means 're-run whenever these values change'\n\t$: doubled = count * 2;\n\t$: quadrupled = doubled * 2;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tCount: {count}\n</button>\n\n<p>{count} * 2 = {doubled}</p>\n<p>{doubled} * 2 = {quadrupled}</p>",
			},
		],
	},
	{
		name: "Reactive statements",
		slug: "reactive-statements",
		thumbnail: "examples/thumbnails/reactive-statements.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\t$: if (count >= 10) {\n\t\talert(`count is dangerously high!`);\n\t\tcount = 9;\n\t}\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
			},
		],
	},
	{
		name: "Declaring props",
		slug: "declaring-props",
		thumbnail: "examples/thumbnails/declaring-props.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>",
			},
			{
				name: "Nested.svelte",
				type: "svelte",
				content:
					"<script>\n\texport let answer;\n</script>\n\n<p>The answer is {answer}</p>",
			},
		],
	},
	{
		name: "Default values",
		slug: "default-values",
		thumbnail: "examples/thumbnails/default-values.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>\n<Nested/>",
			},
			{
				name: "Nested.svelte",
				type: "svelte",
				content:
					"<script>\n\texport let answer = 'a mystery';\n</script>\n\n<p>The answer is {answer}</p>",
			},
		],
	},
	{
		name: "Spread props",
		slug: "spread-props",
		thumbnail: "examples/thumbnails/spread-props.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Info from './Info.svelte';\n\n\tconst pkg = {\n\t\tname: 'svelte',\n\t\tversion: 3,\n\t\tspeed: 'blazing',\n\t\twebsite: 'https://svelte.dev'\n\t};\n</script>\n\n<Info {...pkg}/>",
			},
			{
				name: "Info.svelte",
				type: "svelte",
				content:
					'<script>\n\texport let name;\n\texport let version;\n\texport let speed;\n\texport let website;\n</script>\n\n<p>\n\tThe <code>{name}</code> package is {speed} fast.\n\tDownload version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>\n\tand <a href={website}>learn more here</a>\n</p>',
			},
		],
	},
	{
		name: "If blocks",
		slug: "if-blocks",
		thumbnail: "examples/thumbnails/if-blocks.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
			},
		],
	},
	{
		name: "Else blocks",
		slug: "else-blocks",
		thumbnail: "examples/thumbnails/else-blocks.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
			},
		],
	},
	{
		name: "Else-if blocks",
		slug: "else-if-blocks",
		thumbnail: "examples/thumbnails/else-if-blocks.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}",
			},
		],
	},
	{
		name: "Each blocks",
		slug: "each-blocks",
		thumbnail: "examples/thumbnails/each-blocks.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t{#each cats as { id, name }, i}\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={id}\">\n\t\t\t{i + 1}: {name}\n\t\t</a></li>\n\t{/each}\n</ul>",
			},
		],
	},
	{
		name: "Keyed each blocks",
		slug: "keyed-each-blocks",
		thumbnail: "examples/thumbnails/keyed-each-blocks.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n<div style=\"display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em\">\n\t<div>\n\t\t<h2>Keyed</h2>\n\t\t{#each things as thing (thing.id)}\n\t\t\t<Thing current={thing.color}/>\n\t\t{/each}\n\t</div>\n\n\t<div>\n\t\t<h2>Unkeyed</h2>\n\t\t{#each things as thing}\n\t\t\t<Thing current={thing.color}/>\n\t\t{/each}\n\t</div>\n</div>\n",
			},
			{
				name: "Thing.svelte",
				type: "svelte",
				content:
					'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
			},
		],
	},
	{
		name: "Await blocks",
		slug: "await-blocks",
		thumbnail: "examples/thumbnails/await-blocks.jpg",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					'<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style="color: red">{error.message}</p>\n{/await}',
			},
		],
	},
];

export const examples_out_list = [
	{
		name: "Introduction",
		examples: [
			{
				name: "Hello world",
				slug: "hello-world",
				thumbnail: "examples/thumbnails/hello-world.jpg",
			},
			{
				name: "Dynamic attributes",
				slug: "dynamic-attributes",
				thumbnail: "examples/thumbnails/dynamic-attributes.jpg",
			},
			{
				name: "Styling",
				slug: "styling",
				thumbnail: "examples/thumbnails/styling.jpg",
			},
			{
				name: "Nested components",
				slug: "nested-components",
				thumbnail: "examples/thumbnails/nested-components.jpg",
			},
			{
				name: "HTML tags",
				slug: "html-tags",
				thumbnail: "examples/thumbnails/html-tags.jpg",
			},
		],
	},
	{
		name: "Reactivity",
		examples: [
			{
				name: "Reactive assignments",
				slug: "reactive-assignments",
				thumbnail: "examples/thumbnails/reactive-assignments.jpg",
			},
			{
				name: "Reactive declarations",
				slug: "reactive-declarations",
				thumbnail: "examples/thumbnails/reactive-declarations.jpg",
			},
			{
				name: "Reactive statements",
				slug: "reactive-statements",
				thumbnail: "examples/thumbnails/reactive-statements.jpg",
			},
		],
	},
	{
		name: "Props",
		examples: [
			{
				name: "Declaring props",
				slug: "declaring-props",
				thumbnail: "examples/thumbnails/declaring-props.jpg",
			},
			{
				name: "Default values",
				slug: "default-values",
				thumbnail: "examples/thumbnails/default-values.jpg",
			},
			{
				name: "Spread props",
				slug: "spread-props",
				thumbnail: "examples/thumbnails/spread-props.jpg",
			},
		],
	},
	{
		name: "Logic",
		examples: [
			{
				name: "If blocks",
				slug: "if-blocks",
				thumbnail: "examples/thumbnails/if-blocks.jpg",
			},
			{
				name: "Else blocks",
				slug: "else-blocks",
				thumbnail: "examples/thumbnails/else-blocks.jpg",
			},
			{
				name: "Else-if blocks",
				slug: "else-if-blocks",
				thumbnail: "examples/thumbnails/else-if-blocks.jpg",
			},
			{
				name: "Each blocks",
				slug: "each-blocks",
				thumbnail: "examples/thumbnails/each-blocks.jpg",
			},
			{
				name: "Keyed each blocks",
				slug: "keyed-each-blocks",
				thumbnail: "examples/thumbnails/keyed-each-blocks.jpg",
			},
			{
				name: "Await blocks",
				slug: "await-blocks",
				thumbnail: "examples/thumbnails/await-blocks.jpg",
			},
		],
	},
];
