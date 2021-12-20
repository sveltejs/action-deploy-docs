import type { TutorialSource } from "../docs";

export const tutorials_in: TutorialSource[] = [
	{
		name: "01-introduction",
		content: [
			{
				name: "01-basics",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content: "<h1>Hello world!</h1>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Basics\n---\n\nWelcome to the Svelte tutorial. This will teach you everything you need to know to build fast, small web applications easily.\n\nYou can also consult the [API docs](docs) and the [examples](examples), or — if you're impatient to start hacking on your machine locally — the [60-second quickstart](blog/the-easiest-way-to-get-started).\n\n\n## What is Svelte?\n\nSvelte is a tool for building fast web applications.\n\nIt is similar to JavaScript frameworks such as React and Vue, which share a goal of making it easy to build slick interactive user interfaces.\n\nBut there's a crucial difference: Svelte converts your app into ideal JavaScript at *build time*, rather than interpreting your application code at *run time*. This means you don't pay the performance cost of the framework's abstractions, and you don't incur a penalty when your app first loads.\n\nYou can build your entire app with Svelte, or you can add it incrementally to an existing codebase. You can also ship components as standalone packages that work anywhere, without the overhead of a dependency on a conventional framework.\n\n\n## How to use this tutorial\n\nYou'll need to have basic familiarity with HTML, CSS and JavaScript to understand Svelte.\n\nAs you progress through the tutorial, you'll be presented with mini exercises designed to illustrate new features. Later chapters build on the knowledge gained in earlier ones, so it's recommended that you go from start to finish. If necessary, you can navigate via the dropdown above (click 'Introduction / Basics').\n\nEach tutorial chapter will have a 'Show me' button that you can click if you get stuck following the instructions. Try not to rely on it too much; you will learn faster by figuring out where to put each suggested code block and manually typing it in to the editor.\n\n\n## Understanding components\n\nIn Svelte, an application is composed from one or more *components*. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.svelte` file. The 'hello world' example in the code editor is a simple component.\n",
					},
				],
			},
			{
				name: "02-adding-data",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content: "<h1>Hello world!</h1>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello {name.toUpperCase()}!</h1>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Adding data\n---\n\nA component that just renders some static markup isn't very interesting. Let's add some data.\n\nFirst, add a script tag to your component and declare a `name` variable:\n\n```html\n<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello world!</h1>\n```\n\nThen, we can refer to `name` in the markup:\n\n```html\n<h1>Hello {name}!</h1>\n```\n\nInside the curly braces, we can put any JavaScript we want. Try changing `name` to `name.toUpperCase()` for a shoutier greeting.",
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
		name: "02-reactivity",
		content: [
			{
				name: "01-reactive-assignments",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\t// event handler code goes here\n\t}\n</script>\n\n<button>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Assignments\n---\n\nAt the heart of Svelte is a powerful system of *reactivity* for keeping the DOM in sync with your application state — for example, in response to an event.\n\nTo demonstrate it, we first need to wire up an event handler. Replace line 9 with this:\n\n```html\n<button on:click={handleClick}>\n```\n\nInside the `handleClick` function, all we need to do is change the value of `count`:\n\n```js\nfunction handleClick() {\n\tcount += 1;\n}\n```\n\nSvelte 'instruments' this assignment with some code that tells it the DOM will need to be updated.",
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

export const tutorials_out_list = [
	{
		name: "Introduction",
		tutorials: [
			{
				name: "Basics",
				slug: "basics",
			},
			{
				name: "Adding data",
				slug: "adding-data",
			},
		],
	},
	{
		name: "Reactivity",
		tutorials: [
			{
				name: "Assignments",
				slug: "reactive-assignments",
			},
		],
	},
];

export const tutorials_out_full = [
	{
		name: "Basics",
		slug: "basics",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content: "<h1>Hello world!</h1>",
			},
		],
		complete: [],
		content:
			"<p>Welcome to the Svelte tutorial. This will teach you everything you need to know to build fast, small web applications easily.</p>\n<p>You can also consult the <a href=\"docs\" rel=\"noopener noreferrer\">API docs</a> and the <a href=\"examples\" rel=\"noopener noreferrer\">examples</a>, or — if you're impatient to start hacking on your machine locally — the <a href=\"blog/the-easiest-way-to-get-started\" rel=\"noopener noreferrer\">60-second quickstart</a>.</p>\n<h2>What is Svelte?</h2>\n<p>Svelte is a tool for building fast web applications.</p>\n<p>It is similar to JavaScript frameworks such as React and Vue, which share a goal of making it easy to build slick interactive user interfaces.</p>\n<p>But there's a crucial difference: Svelte converts your app into ideal JavaScript at <em>build time</em>, rather than interpreting your application code at <em>run time</em>. This means you don't pay the performance cost of the framework's abstractions, and you don't incur a penalty when your app first loads.</p>\n<p>You can build your entire app with Svelte, or you can add it incrementally to an existing codebase. You can also ship components as standalone packages that work anywhere, without the overhead of a dependency on a conventional framework.</p>\n<h2>How to use this tutorial</h2>\n<p>You'll need to have basic familiarity with HTML, CSS and JavaScript to understand Svelte.</p>\n<p>As you progress through the tutorial, you'll be presented with mini exercises designed to illustrate new features. Later chapters build on the knowledge gained in earlier ones, so it's recommended that you go from start to finish. If necessary, you can navigate via the dropdown above (click 'Introduction / Basics').</p>\n<p>Each tutorial chapter will have a 'Show me' button that you can click if you get stuck following the instructions. Try not to rely on it too much; you will learn faster by figuring out where to put each suggested code block and manually typing it in to the editor.</p>\n<h2>Understanding components</h2>\n<p>In Svelte, an application is composed from one or more <em>components</em>. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a <code>.svelte</code> file. The 'hello world' example in the code editor is a simple component.</p>",
	},
	{
		name: "Adding data",
		slug: "adding-data",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content: "<h1>Hello world!</h1>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello {name.toUpperCase()}!</h1>",
			},
		],
		content:
			'<p>A component that just renders some static markup isn\'t very interesting. Let\'s add some data.</p>\n<p>First, add a script tag to your component and declare a <code>name</code> variable:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">\'world\'</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello world!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code></pre></div>\n<p>Then, we can refer to <code>name</code> in the markup:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello {name}!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code></pre></div>\n<p>Inside the curly braces, we can put any JavaScript we want. Try changing <code>name</code> to <code>name.toUpperCase()</code> for a shoutier greeting.</p>',
	},
	{
		name: "Assignments",
		slug: "reactive-assignments",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\t// event handler code goes here\n\t}\n</script>\n\n<button>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
			},
		],
		content:
			'<p>At the heart of Svelte is a powerful system of <em>reactivity</em> for keeping the DOM in sync with your application state — for example, in response to an event.</p>\n<p>To demonstrate it, we first need to wire up an event handler. Replace line 9 with this:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{handleClick}</span><span class="token punctuation">></span></span></code></pre></div>\n<p>Inside the <code>handleClick</code> function, all we need to do is change the value of <code>count</code>:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">function</span> <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tcount <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>Svelte \'instruments\' this assignment with some code that tells it the DOM will need to be updated.</p>',
	},
];
