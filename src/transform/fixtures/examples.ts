import type { ExamplesCatSource } from "../docs";

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
				name: "meta.json",
				content: '{\n\t"title": "Reactivity"\n}',
			},
		],
	},
];

export const examples_out_full = [
	{
		name: "Hello world",
		slug: "hello-world",
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
		name: "Reactive assignments",
		slug: "reactive-assignments",
		files: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
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
			},
			{
				name: "Dynamic attributes",
				slug: "dynamic-attributes",
			},
		],
	},
	{
		name: "Reactivity",
		examples: [
			{
				name: "Reactive assignments",
				slug: "reactive-assignments",
			},
		],
	},
];
