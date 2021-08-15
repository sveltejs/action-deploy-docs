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
				name: "03-dynamic-attributes",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet src = 'tutorial/image.gif';\n</script>\n\n<img>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet src = 'tutorial/image.gif';\n\tlet name = 'Rick Astley';\n</script>\n\n<img {src} alt=\"{name} dances.\">\n",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Dynamic attributes\n---\n\nJust like you can use curly braces to control text, you can use them to control element attributes.\n\nOur image is missing a `src` — let's add one:\n\n```html\n<img src={src}>\n```\n\nThat's better. But Svelte is giving us a warning:\n\n> A11y: &lt;img&gt; element should have an alt attribute\n\nWhen building web apps, it's important to make sure that they're *accessible* to the broadest possible userbase, including people with (for example) impaired vision or motion, or people without powerful hardware or good internet connections. Accessibility (shortened to a11y) isn't always easy to get right, but Svelte will help by warning you if you write inaccessible markup.\n\nIn this case, we're missing the `alt` attribute that describes the image for people using screenreaders, or people with slow or flaky internet connections that can't download the image. Let's add one:\n\n```html\n<img src={src} alt=\"A man dances.\">\n```\n\nWe can use curly braces *inside* attributes. Try changing it to `\"{name} dances.\"` — remember to declare a `name` variable in the `<script>` block.\n\n\n## Shorthand attributes\n\nIt's not uncommon to have an attribute where the name and value are the same, like `src={src}`. Svelte gives us a convenient shorthand for these cases:\n\n```html\n<img {src} alt=\"A man dances.\">\n```\n\n",
					},
				],
			},
			{
				name: "04-styling",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<style>\n\t/* styles goes here */\n</style>\n\n<p>This is a paragraph.</p>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Styling\n---\n\nJust like in HTML, you can add a `<style>` tag to your component. Let's add some styles to the `<p>` element:\n\n```html\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>\n```\n\nImportantly, these rules are *scoped to the component*. You won't accidentally change the style of `<p>` elements elsewhere in your app, as we'll see in the next step.",
					},
				],
			},
			{
				name: "05-nested-components",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>",
							},
							{
								name: "Nested.svelte",
								content: "<p>This is another paragraph.</p>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>\n<Nested/>",
							},
							{
								name: "Nested.svelte",
								content: "<p>This is another paragraph.</p>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Nested components\n---\n\nIt would be impractical to put your entire app in a single component. Instead, we can import components from other files and include them as though we were including elements.\n\nAdd a `<script>` tag that imports `Nested.svelte`...\n\n```html\n<script>\n\timport Nested from './Nested.svelte';\n</script>\n```\n\n...then add it to the markup:\n\n```html\n<p>This is a paragraph.</p>\n<Nested/>\n```\n\nNotice that even though `Nested.svelte` has a `<p>` element, the styles from `App.svelte` don't leak in.\n\nAlso notice that the component name `Nested` is capitalised. This convention has been adopted to allow us to differentiate between user-defined components and regular HTML tags.\n",
					},
				],
			},
			{
				name: "06-html-tags",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet string = `this string contains some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{string}</p>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet string = `this string contains some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{@html string}</p>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: HTML tags\n---\n\nOrdinarily, strings are inserted as plain text, meaning that characters like `<` and `>` have no special meaning.\n\nBut sometimes you need to render HTML directly into a component. For example, the words you're reading right now exist in a markdown file that gets included on this page as a blob of HTML.\n\nIn Svelte, you do this with the special `{@html ...}` tag:\n\n```html\n<p>{@html string}</p>\n```\n\n> Svelte doesn't perform any sanitization of the expression inside `{@html ...}` before it gets inserted into the DOM. In other words, if you use this feature it's critical that you manually escape HTML that comes from sources you don't trust, otherwise you risk exposing your users to XSS attacks.\n",
					},
				],
			},
			{
				name: "07-making-an-app",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content: "<h1>What now?</h1>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Making an app\n---\n\nThis tutorial is designed to get you familiar with the process of writing components. But at some point, you'll want to start writing components in the comfort of your own text editor.\n\nFirst, you'll need to integrate Svelte with a build tool. There are officially maintained plugins for [Rollup](https://rollupjs.org) and [webpack](https://webpack.js.org/)...\n\n* [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte)\n* [svelte-loader](https://github.com/sveltejs/svelte-loader)\n\n...and a variety of [community-maintained ones](https://github.com/sveltejs/integrations#bundler-plugins).\n\nDon't worry if you're relatively new to web development and haven't used these tools before. We've prepared a simple step-by-step guide, [Svelte for new developers](blog/svelte-for-new-developers), which walks you through the process.\n\nYou'll also want to configure your text editor. If you're using VS Code, install the [Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), otherwise follow [this guide](blog/setting-up-your-editor) to configure your text editor to treat `.svelte` files the same as `.html` for the sake of syntax highlighting.\n\nThen, once you've got your project set up, using Svelte components is easy. The compiler turns each component into a regular JavaScript class — just import it and instantiate with `new`:\n\n```js\nimport App from './App.svelte';\n\nconst app = new App({\n\ttarget: document.body,\n\tprops: {\n\t\t// we'll learn about props later\n\t\tanswer: 42\n\t}\n});\n```\n\nYou can then interact with `app` using the [component API](docs#Client-side_component_API) if you need to.\n",
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
				name: "02-reactive-declarations",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet count = 0;\n\t$: doubled = count * 2;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>\n\n<p>{count} doubled is {doubled}</p>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Declarations\n---\n\nSvelte automatically updates the DOM when your component's state changes. Often, some parts of a component's state need to be computed from *other* parts (such as a `fullname` derived from a `firstname` and a `lastname`), and recomputed whenever they change.\n\nFor these, we have *reactive declarations*. They look like this:\n\n```js\nlet count = 0;\n$: doubled = count * 2;\n```\n\n> Don't worry if this looks a little alien. It's [valid](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) (if unconventional) JavaScript, which Svelte interprets to mean 're-run this code whenever any of the referenced values change'. Once you get used to it, there's no going back.\n\nLet's use `doubled` in our markup:\n\n```html\n<p>{count} doubled is {doubled}</p>\n```\n\nOf course, you could just write `{count * 2}` in the markup instead — you don't have to use reactive values. Reactive values become particularly valuable when you need to reference them multiple times, or you have values that depend on *other* reactive values.\n",
					},
				],
			},
			{
				name: "03-reactive-statements",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet count = 0;\n\n\t$: if (count >= 10) {\n\t\talert(`count is dangerously high!`);\n\t\tcount = 9;\n\t}\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Statements\n---\n\nWe're not limited to declaring reactive *values* — we can also run arbitrary *statements* reactively. For example, we can log the value of `count` whenever it changes:\n\n```js\n$: console.log(`the count is ${count}`);\n```\n\nYou can easily group statements together with a block:\n\n```js\n$: {\n\tconsole.log(`the count is ${count}`);\n\talert(`I SAID THE COUNT IS ${count}`);\n}\n```\n\nYou can even put the `$:` in front of things like `if` blocks:\n\n```js\n$: if (count >= 10) {\n\talert(`count is dangerously high!`);\n\tcount = 9;\n}\n```",
					},
				],
			},
			{
				name: "04-updating-arrays-and-objects",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet numbers = [1, 2, 3, 4];\n\n\tfunction addNumber() {\n\t\tnumbers.push(numbers.length + 1);\n\t}\n\n\t$: sum = numbers.reduce((t, n) => t + n, 0);\n</script>\n\n<p>{numbers.join(' + ')} = {sum}</p>\n\n<button on:click={addNumber}>\n\tAdd a number\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet numbers = [1, 2, 3, 4];\n\n\tfunction addNumber() {\n\t\tnumbers = [...numbers, numbers.length + 1];\n\t}\n\n\t$: sum = numbers.reduce((t, n) => t + n, 0);\n</script>\n\n<p>{numbers.join(' + ')} = {sum}</p>\n\n<button on:click={addNumber}>\n\tAdd a number\n</button>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Updating arrays and objects\n---\n\nBecause Svelte's reactivity is triggered by assignments, using array methods like `push` and `splice` won't automatically cause updates. For example, clicking the button doesn't do anything.\n\nOne way to fix that is to add an assignment that would otherwise be redundant:\n\n```js\nfunction addNumber() {\n\tnumbers.push(numbers.length + 1);\n\tnumbers = numbers;\n}\n```\n\nBut there's a more idiomatic solution:\n\n```js\nfunction addNumber() {\n\tnumbers = [...numbers, numbers.length + 1];\n}\n```\n\nYou can use similar patterns to replace `pop`, `shift`, `unshift` and `splice`.\n\nAssignments to *properties* of arrays and objects — e.g. `obj.foo += 1` or `array[i] = x` — work the same way as assignments to the values themselves.\n\n```js\nfunction addNumber() {\n\tnumbers[numbers.length] = numbers.length + 1;\n}\n```\n\nA simple rule of thumb: the name of the updated variable must appear on the left hand side of the assignment. For example this...\n\n```js\nconst foo = obj.foo;\nfoo.bar = 'baz';\n```\n\n...won't update references to `obj.foo.bar`, unless you follow it up with `obj = obj`.",
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
		name: "03-props",
		content: [
			{
				name: "01-declaring-props",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>",
							},
							{
								name: "Nested.svelte",
								content:
									"<script>\n\tlet answer;\n</script>\n\n<p>The answer is {answer}</p>",
							},
						],
					},
					{
						name: "app-b",
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
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Declaring props\n---\n\nSo far, we've dealt exclusively with internal state — that is to say, the values are only accessible within a given component.\n\nIn any real application, you'll need to pass data from one component down to its children. To do that, we need to declare *properties*, generally shortened to 'props'. In Svelte, we do that with the `export` keyword. Edit the `Nested.svelte` component:\n\n```html\n<script>\n\texport let answer;\n</script>\n```\n\n> Just like `$:`, this may feel a little weird at first. That's not how `export` normally works in JavaScript modules! Just roll with it for now — it'll soon become second nature.",
					},
				],
			},
			{
				name: "02-default-values",
				content: [
					{
						name: "app-a",
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
						],
					},
					{
						name: "app-b",
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
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Default values\n---\n\nWe can easily specify default values for props in `Nested.svelte`:\n\n```html\n<script>\n\texport let answer = 'a mystery';\n</script>\n```\n\nIf we now add a second component *without* an `answer` prop, it will fall back to the default:\n\n```html\n<Nested answer={42}/>\n<Nested/>\n```\n",
					},
				],
			},
			{
				name: "03-spread-props",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Info from './Info.svelte';\n\n\tconst pkg = {\n\t\tname: 'svelte',\n\t\tversion: 3,\n\t\tspeed: 'blazing',\n\t\twebsite: 'https://svelte.dev'\n\t};\n</script>\n\n<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>",
							},
							{
								name: "Info.svelte",
								content:
									'<script>\n\texport let name;\n\texport let version;\n\texport let speed;\n\texport let website;\n</script>\n\n<p>\n\tThe <code>{name}</code> package is {speed} fast.\n\tDownload version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>\n\tand <a href={website}>learn more here</a>\n</p>',
							},
						],
					},
					{
						name: "app-b",
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
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Spread props\n---\n\nIf you have an object of properties, you can 'spread' them onto a component instead of specifying each one:\n\n```html\n<Info {...pkg}/>\n```\n\n> Conversely, if you need to reference all the props that were passed into a component, including ones that weren't declared with `export`, you can do so by accessing `$$props` directly. It's not generally recommended, as it's difficult for Svelte to optimise, but it's useful in rare cases.\n",
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
		name: "04-logic",
		content: [
			{
				name: "01-if-blocks",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n<button on:click={toggle}>\n\tLog out\n</button>\n\n<button on:click={toggle}>\n\tLog in\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: If blocks\n---\n\nHTML doesn't have a way of expressing *logic*, like conditionals and loops. Svelte does.\n\nTo conditionally render some markup, we wrap it in an `if` block:\n\n```html\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}\n```\n\nTry it — update the component, and click on the buttons.",
					},
				],
			},
			{
				name: "02-else-blocks",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Else blocks\n---\n\nSince the two conditions — `if user.loggedIn` and `if !user.loggedIn` — are mutually exclusive, we can simplify this component slightly by using an `else` block:\n\n```html\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}\n```\n\n> A `#` character always indicates a *block opening* tag. A `/` character always indicates a *block closing* tag. A `:` character, as in `{:else}`, indicates a *block continuation* tag. Don't worry — you've already learned almost all the syntax Svelte adds to HTML.",
					},
				],
			},
			{
				name: "03-else-if-blocks",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else}\n\t{#if 5 > x}\n\t\t<p>{x} is less than 5</p>\n\t{:else}\n\t\t<p>{x} is between 5 and 10</p>\n\t{/if}\n{/if}",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Else-if blocks\n---\n\nMultiple conditions can be 'chained' together with `else if`:\n\n```html\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}\n```",
					},
				],
			},
			{
				name: "04-each-blocks",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t<!-- open each block -->\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={cat.id}\">\n\t\t\t{cat.name}\n\t\t</a></li>\n\t<!-- close each block -->\n</ul>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t{#each cats as { id, name }, i}\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={id}\">\n\t\t\t{i + 1}: {name}\n\t\t</a></li>\n\t{/each}\n</ul>",
							},
						],
					},
					{
						name: "text.md",
						content:
							'---\ntitle: Each blocks\n---\n\nIf you need to loop over lists of data, use an `each` block:\n\n```html\n<ul>\n\t{#each cats as cat}\n\t\t<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">\n\t\t\t{cat.name}\n\t\t</a></li>\n\t{/each}\n</ul>\n```\n\n> The expression (`cats`, in this case) can be any array or array-like object (i.e. it has a `length` property). You can loop over generic iterables with `each [...iterable]`.\n\nYou can get the current *index* as a second argument, like so:\n\n```html\n{#each cats as cat, i}\n\t<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">\n\t\t{i + 1}: {cat.name}\n\t</a></li>\n{/each}\n```\n\nIf you prefer, you can use destructuring — `each cats as { id, name }` — and replace `cat.id` and `cat.name` with `id` and `name`.',
					},
				],
			},
			{
				name: "05-keyed-each-blocks",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n{#each things as thing}\n\t<Thing current={thing.color}/>\n{/each}",
							},
							{
								name: "Thing.svelte",
								content:
									'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n{#each things as thing (thing.id)}\n\t<Thing current={thing.color}/>\n{/each}",
							},
							{
								name: "Thing.svelte",
								content:
									'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Keyed each blocks\n---\n\nBy default, when you modify the value of an `each` block, it will add and remove items at the *end* of the block, and update any values that have changed. That might not be what you want.\n\nIt's easier to show why than to explain. Click the 'Remove first thing' button a few times, and notice that it's removing `<Thing>` components from the end and updating the `color` for those that remain. Instead, we'd like to remove the first `<Thing>` component and leave the rest unaffected.\n\nTo do that, we specify a unique identifier for the `each` block:\n\n```html\n{#each things as thing (thing.id)}\n\t<Thing current={thing.color}/>\n{/each}\n```\n\nThe `(thing.id)` tells Svelte how to figure out what changed.\n\n> You can use any object as the key, as Svelte uses a `Map` internally — in other words you could do `(thing)` instead of `(thing.id)`. Using a string or number is generally safer, however, since it means identity persists without referential equality, for example when updating with fresh data from an API server.\n",
					},
				],
			},
			{
				name: "06-await-blocks",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n<!-- replace this element -->\n<p>{promise}</p>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									'<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style="color: red">{error.message}</p>\n{/await}',
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Await blocks\n---\n\nMost web applications have to deal with asynchronous data at some point. Svelte makes it easy to *await* the value of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) directly in your markup:\n\n```html\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style=\"color: red\">{error.message}</p>\n{/await}\n```\n\n> Only the most recent `promise` is considered, meaning you don't need to worry about race conditions.\n\nIf you know that your promise can't reject, you can omit the `catch` block. You can also omit the first block if you don't want to show anything until the promise resolves:\n\n```html\n{#await promise then value}\n\t<p>the value is {value}</p>\n{/await}\n```",
					},
				],
			},
			{
				name: "meta.json",
				content: '{\n\t"title": "Logic"\n}',
			},
		],
	},
	{
		name: "05-events",
		content: [
			{
				name: "01-dom-events",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: DOM events\n---\n\nAs we've briefly seen already, you can listen to any event on an element with the `on:` directive:\n\n```html\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>\n```",
					},
				],
			},
			{
				name: "02-inline-handlers",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									'<script>\n\tlet m = { x: 0, y: 0 };\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">\n\tThe mouse position is {m.x} x {m.y}\n</div>',
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Inline handlers\n---\n\nYou can also declare event handlers inline:\n\n```html\n<div on:mousemove=\"{e => m = { x: e.clientX, y: e.clientY }}\">\n\tThe mouse position is {m.x} x {m.y}\n</div>\n```\n\nThe quote marks are optional, but they're helpful for syntax highlighting in some environments.\n\n> In some frameworks you may see recommendations to avoid inline event handlers for performance reasons, particularly inside loops. That advice doesn't apply to Svelte — the compiler will always do the right thing, whichever form you choose.",
					},
				],
			},
			{
				name: "03-event-modifiers",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tfunction handleClick() {\n\t\talert('clicked')\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClick me\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\tfunction handleClick() {\n\t\talert('no more alerts')\n\t}\n</script>\n\n<button on:click|once={handleClick}>\n\tClick me\n</button>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Event modifiers\n---\n\nDOM event handlers can have *modifiers* that alter their behaviour. For example, a handler with a `once` modifier will only run a single time:\n\n```html\n<script>\n\tfunction handleClick() {\n\t\talert('no more alerts')\n\t}\n</script>\n\n<button on:click|once={handleClick}>\n\tClick me\n</button>\n```\n\nThe full list of modifiers:\n\n* `preventDefault` — calls `event.preventDefault()` before running the handler. Useful for client-side form handling, for example.\n* `stopPropagation` — calls `event.stopPropagation()`, preventing the event reaching the next element\n* `passive` — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)\n* `nonpassive` — explicitly set `passive: false`\n* `capture` — fires the handler during the *capture* phase instead of the *bubbling* phase ([MDN docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture))\n* `once` — remove the handler after the first time it runs\n* `self` — only trigger handler if event.target is the element itself\n\nYou can chain modifiers together, e.g. `on:click|once|capture={...}`.\n",
					},
				],
			},
			{
				name: "04-component-events",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Inner from './Inner.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Inner on:message={handleMessage}/>",
							},
							{
								name: "Inner.svelte",
								content:
									"<script>\n\t// setup code goes here\n\n\tfunction sayHello() {\n\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Inner from './Inner.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Inner on:message={handleMessage}/>",
							},
							{
								name: "Inner.svelte",
								content:
									"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Component events\n---\n\nComponents can also dispatch events. To do so, they must create an event dispatcher. Update `Inner.svelte`:\n\n```html\n<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n```\n\n> `createEventDispatcher` must be called when the component is first instantiated — you can't do it later inside e.g. a `setTimeout` callback. This links `dispatch` to the component instance.",
					},
				],
			},
			{
				name: "05-event-forwarding",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Outer from './Outer.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Outer on:message={handleMessage}/>",
							},
							{
								name: "Inner.svelte",
								content:
									"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
							},
							{
								name: "Outer.svelte",
								content:
									"<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner/>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport Outer from './Outer.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Outer on:message={handleMessage}/>",
							},
							{
								name: "Inner.svelte",
								content:
									"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
							},
							{
								name: "Outer.svelte",
								content:
									"<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner on:message/>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: Event forwarding\n---\n\nUnlike DOM events, component events don't *bubble*. If you want to listen to an event on some deeply nested component, the intermediate components must *forward* the event.\n\nIn this case, we have the same `App.svelte` and `Inner.svelte` as in the [previous chapter](tutorial/component-events), but there's now an `Outer.svelte` component that contains `<Inner/>`.\n\nOne way we could solve the problem is adding `createEventDispatcher` to `Outer.svelte`, listening for the `message` event, and creating a handler for it:\n\n```html\n<script>\n\timport Inner from './Inner.svelte';\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction forward(event) {\n\t\tdispatch('message', event.detail);\n\t}\n</script>\n\n<Inner on:message={forward}/>\n```\n\nBut that's a lot of code to write, so Svelte gives us an equivalent shorthand — an `on:message` event directive without a value means 'forward all `message` events'.\n\n```html\n<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner on:message/>\n```",
					},
				],
			},
			{
				name: "06-dom-event-forwarding",
				content: [
					{
						name: "app-a",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport CustomButton from './CustomButton.svelte';\n\n\tfunction handleClick() {\n\t\talert('clicked');\n\t}\n</script>\n\n<CustomButton on:click={handleClick}/>",
							},
							{
								name: "CustomButton.svelte",
								content:
									"<style>\n\tbutton {\n\t\theight: 4rem;\n\t\twidth: 8rem;\n\t\tbackground-color: #aaa;\n\t\tborder-color: #f1c40f;\n\t\tcolor: #f1c40f;\n\t\tfont-size: 1.25rem;\n\t\tbackground-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);\n\t\tbackground-position: 100%;\n\t\tbackground-size: 400%;\n\t\ttransition: background 300ms ease-in-out;\n\t}\n\tbutton:hover {\n\t\tbackground-position: 0;\n\t\tcolor: #aaa;\n\t}\n</style>\n\n<button>\n\tClick me\n</button>",
							},
						],
					},
					{
						name: "app-b",
						content: [
							{
								name: "App.svelte",
								content:
									"<script>\n\timport CustomButton from './CustomButton.svelte';\n\n\tfunction handleClick() {\n\t\talert('clicked');\n\t}\n</script>\n\n<CustomButton on:click={handleClick}/>",
							},
							{
								name: "CustomButton.svelte",
								content:
									"<style>\n\tbutton {\n\t\theight: 4rem;\n\t\twidth: 8rem;\n\t\tbackground-color: #aaa;\n\t\tborder-color: #f1c40f;\n\t\tcolor: #f1c40f;\n\t\tfont-size: 1.25rem;\n\t\tbackground-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);\n\t\tbackground-position: 100%;\n\t\tbackground-size: 400%;\n\t\ttransition: background 300ms ease-in-out;\n\t}\n\tbutton:hover {\n\t\tbackground-position: 0;\n\t\tcolor: #aaa;\n\t}\n</style>\n\n<button on:click>\n\tClick me\n</button>",
							},
						],
					},
					{
						name: "text.md",
						content:
							"---\ntitle: DOM event forwarding\n---\n\nEvent forwarding works for DOM events too.\n\nWe want to get notified of clicks on our `<CustomButton>` — to do that, we just need to forward `click` events on the `<button>` element in `CustomButton.svelte`:\n\n```html\n<button on:click>\n\tClick me\n</button>\n```",
					},
				],
			},
			{
				name: "meta.json",
				content: '{\n\t"title": "Events"\n}',
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
				slug: "introduction-basics",
			},
			{
				name: "Adding data",
				slug: "introduction-adding-data",
			},
			{
				name: "Dynamic attributes",
				slug: "introduction-dynamic-attributes",
			},
			{
				name: "Styling",
				slug: "introduction-styling",
			},
			{
				name: "Nested components",
				slug: "introduction-nested-components",
			},
			{
				name: "HTML tags",
				slug: "introduction-html-tags",
			},
			{
				name: "Making an app",
				slug: "introduction-making-an-app",
			},
		],
	},
	{
		name: "Reactivity",
		tutorials: [
			{
				name: "Assignments",
				slug: "reactivity-assignments",
			},
			{
				name: "Declarations",
				slug: "reactivity-declarations",
			},
			{
				name: "Statements",
				slug: "reactivity-statements",
			},
			{
				name: "Updating arrays and objects",
				slug: "reactivity-updating-arrays-and-objects",
			},
		],
	},
	{
		name: "Props",
		tutorials: [
			{
				name: "Declaring props",
				slug: "props-declaring-props",
			},
			{
				name: "Default values",
				slug: "props-default-values",
			},
			{
				name: "Spread props",
				slug: "props-spread-props",
			},
		],
	},
	{
		name: "Logic",
		tutorials: [
			{
				name: "If blocks",
				slug: "logic-if-blocks",
			},
			{
				name: "Else blocks",
				slug: "logic-else-blocks",
			},
			{
				name: "Else-if blocks",
				slug: "logic-else-if-blocks",
			},
			{
				name: "Each blocks",
				slug: "logic-each-blocks",
			},
			{
				name: "Keyed each blocks",
				slug: "logic-keyed-each-blocks",
			},
			{
				name: "Await blocks",
				slug: "logic-await-blocks",
			},
		],
	},
	{
		name: "Events",
		tutorials: [
			{
				name: "DOM events",
				slug: "events-dom-events",
			},
			{
				name: "Inline handlers",
				slug: "events-inline-handlers",
			},
			{
				name: "Event modifiers",
				slug: "events-event-modifiers",
			},
			{
				name: "Component events",
				slug: "events-component-events",
			},
			{
				name: "Event forwarding",
				slug: "events-event-forwarding",
			},
			{
				name: "DOM event forwarding",
				slug: "events-dom-event-forwarding",
			},
		],
	},
];

export const tutorials_out_full = [
	{
		name: "Basics",
		slug: "introduction-basics",
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
		slug: "introduction-adding-data",
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
		name: "Dynamic attributes",
		slug: "introduction-dynamic-attributes",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet src = 'tutorial/image.gif';\n</script>\n\n<img>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet src = 'tutorial/image.gif';\n\tlet name = 'Rick Astley';\n</script>\n\n<img {src} alt=\"{name} dances.\">\n",
			},
		],
		content:
			'<p>Just like you can use curly braces to control text, you can use them to control element attributes.</p>\n<p>Our image is missing a <code>src</code> — let\'s add one:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{src}</span><span class="token punctuation">></span></span></code></pre></div>\n<p>That\'s better. But Svelte is giving us a warning:</p>\n<blockquote>\n<p>A11y: &#x3C;img> element should have an alt attribute</p>\n</blockquote>\n<p>When building web apps, it\'s important to make sure that they\'re <em>accessible</em> to the broadest possible userbase, including people with (for example) impaired vision or motion, or people without powerful hardware or good internet connections. Accessibility (shortened to a11y) isn\'t always easy to get right, but Svelte will help by warning you if you write inaccessible markup.</p>\n<p>In this case, we\'re missing the <code>alt</code> attribute that describes the image for people using screenreaders, or people with slow or flaky internet connections that can\'t download the image. Let\'s add one:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{src}</span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>A man dances.<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></code></pre></div>\n<p>We can use curly braces <em>inside</em> attributes. Try changing it to <code>"{name} dances."</code> — remember to declare a <code>name</code> variable in the <code>&#x3C;script></code> block.</p>\n<h2>Shorthand attributes</h2>\n<p>It\'s not uncommon to have an attribute where the name and value are the same, like <code>src={src}</code>. Svelte gives us a convenient shorthand for these cases:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">{src}</span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>A man dances.<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></code></pre></div>',
	},
	{
		name: "Styling",
		slug: "introduction-styling",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<style>\n\t/* styles goes here */\n</style>\n\n<p>This is a paragraph.</p>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>",
			},
		],
		content:
			'<p>Just like in HTML, you can add a <code>&#x3C;style></code> tag to your component. Let\'s add some styles to the <code>&#x3C;p></code> element:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">\n\t<span class="token selector">p</span> <span class="token punctuation">{</span>\n\t\t<span class="token property">color</span><span class="token punctuation">:</span> purple<span class="token punctuation">;</span>\n\t\t<span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">\'Comic Sans MS\'</span><span class="token punctuation">,</span> cursive<span class="token punctuation">;</span>\n\t\t<span class="token property">font-size</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>\n\t<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This is a paragraph.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code></pre></div>\n<p>Importantly, these rules are <em>scoped to the component</em>. You won\'t accidentally change the style of <code>&#x3C;p></code> elements elsewhere in your app, as we\'ll see in the next step.</p>',
	},
	{
		name: "Nested components",
		slug: "introduction-nested-components",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>",
			},
			{
				name: "Nested.svelte",
				type: "svelte",
				content: "<p>This is another paragraph.</p>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>\n<Nested/>",
			},
			{
				name: "Nested.svelte",
				type: "svelte",
				content: "<p>This is another paragraph.</p>",
			},
		],
		content:
			'<p>It would be impractical to put your entire app in a single component. Instead, we can import components from other files and include them as though we were including elements.</p>\n<p>Add a <code>&#x3C;script></code> tag that imports <code>Nested.svelte</code>...</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">import</span> Nested <span class="token keyword">from</span> <span class="token string">\'./Nested.svelte\'</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre></div>\n<p>...then add it to the markup:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This is a paragraph.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Nested</span><span class="token punctuation">/></span></span></code></pre></div>\n<p>Notice that even though <code>Nested.svelte</code> has a <code>&#x3C;p></code> element, the styles from <code>App.svelte</code> don\'t leak in.</p>\n<p>Also notice that the component name <code>Nested</code> is capitalised. This convention has been adopted to allow us to differentiate between user-defined components and regular HTML tags.</p>',
	},
	{
		name: "HTML tags",
		slug: "introduction-html-tags",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet string = `this string contains some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{string}</p>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet string = `this string contains some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{@html string}</p>",
			},
		],
		content:
			'<p>Ordinarily, strings are inserted as plain text, meaning that characters like <code>&#x3C;</code> and <code>></code> have no special meaning.</p>\n<p>But sometimes you need to render HTML directly into a component. For example, the words you\'re reading right now exist in a markdown file that gets included on this page as a blob of HTML.</p>\n<p>In Svelte, you do this with the special <code>{@html ...}</code> tag:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{@html string}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code></pre></div>\n<blockquote>\n<p>Svelte doesn\'t perform any sanitization of the expression inside <code>{@html ...}</code> before it gets inserted into the DOM. In other words, if you use this feature it\'s critical that you manually escape HTML that comes from sources you don\'t trust, otherwise you risk exposing your users to XSS attacks.</p>\n</blockquote>',
	},
	{
		name: "Making an app",
		slug: "introduction-making-an-app",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content: "<h1>What now?</h1>",
			},
		],
		complete: [],
		content:
			'<p>This tutorial is designed to get you familiar with the process of writing components. But at some point, you\'ll want to start writing components in the comfort of your own text editor.</p>\n<p>First, you\'ll need to integrate Svelte with a build tool. There are officially maintained plugins for <a href="https://rollupjs.org" target="_blank" rel="noopener noreferrer">Rollup</a> and <a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer">webpack</a>...</p>\n<ul>\n<li><a href="https://github.com/sveltejs/rollup-plugin-svelte" target="_blank" rel="noopener noreferrer">rollup-plugin-svelte</a></li>\n<li><a href="https://github.com/sveltejs/svelte-loader" target="_blank" rel="noopener noreferrer">svelte-loader</a></li>\n</ul>\n<p>...and a variety of <a href="https://github.com/sveltejs/integrations#bundler-plugins" target="_blank" rel="noopener noreferrer">community-maintained ones</a>.</p>\n<p>Don\'t worry if you\'re relatively new to web development and haven\'t used these tools before. We\'ve prepared a simple step-by-step guide, <a href="blog/svelte-for-new-developers" rel="noopener noreferrer">Svelte for new developers</a>, which walks you through the process.</p>\n<p>You\'ll also want to configure your text editor. If you\'re using VS Code, install the <a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode" target="_blank" rel="noopener noreferrer">Svelte extension</a>, otherwise follow <a href="blog/setting-up-your-editor" rel="noopener noreferrer">this guide</a> to configure your text editor to treat <code>.svelte</code> files the same as <code>.html</code> for the sake of syntax highlighting.</p>\n<p>Then, once you\'ve got your project set up, using Svelte components is easy. The compiler turns each component into a regular JavaScript class — just import it and instantiate with <code>new</code>:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">\'./App.svelte\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\ttarget<span class="token operator">:</span> document<span class="token punctuation">.</span>body<span class="token punctuation">,</span>\n\tprops<span class="token operator">:</span> <span class="token punctuation">{</span>\n\t\t<span class="token comment">// we\'ll learn about props later</span>\n\t\tanswer<span class="token operator">:</span> <span class="token number">42</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>\n<p>You can then interact with <code>app</code> using the <a href="docs#Client-side_component_API" rel="noopener noreferrer">component API</a> if you need to.</p>',
	},
	{
		name: "Assignments",
		slug: "reactivity-assignments",
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
	{
		name: "Declarations",
		slug: "reactivity-declarations",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\t$: doubled = count * 2;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>\n\n<p>{count} doubled is {doubled}</p>",
			},
		],
		content:
			'<p>Svelte automatically updates the DOM when your component\'s state changes. Often, some parts of a component\'s state need to be computed from <em>other</em> parts (such as a <code>fullname</code> derived from a <code>firstname</code> and a <code>lastname</code>), and recomputed whenever they change.</p>\n<p>For these, we have <em>reactive declarations</em>. They look like this:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n$<span class="token operator">:</span> doubled <span class="token operator">=</span> count <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span></code></pre></div>\n<blockquote>\n<p>Don\'t worry if this looks a little alien. It\'s <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label" target="_blank" rel="noopener noreferrer">valid</a> (if unconventional) JavaScript, which Svelte interprets to mean \'re-run this code whenever any of the referenced values change\'. Once you get used to it, there\'s no going back.</p>\n</blockquote>\n<p>Let\'s use <code>doubled</code> in our markup:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{count} doubled is {doubled}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code></pre></div>\n<p>Of course, you could just write <code>{count * 2}</code> in the markup instead — you don\'t have to use reactive values. Reactive values become particularly valuable when you need to reference them multiple times, or you have values that depend on <em>other</em> reactive values.</p>',
	},
	{
		name: "Statements",
		slug: "reactivity-statements",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet count = 0;\n\n\t$: if (count >= 10) {\n\t\talert(`count is dangerously high!`);\n\t\tcount = 9;\n\t}\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
			},
		],
		content:
			'<p>We\'re not limited to declaring reactive <em>values</em> — we can also run arbitrary <em>statements</em> reactively. For example, we can log the value of <code>count</code> whenever it changes:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code>$<span class="token operator">:</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">the count is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>\n<p>You can easily group statements together with a block:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code>$<span class="token operator">:</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">the count is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\t<span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">I SAID THE COUNT IS </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>You can even put the <code>$:</code> in front of things like <code>if</code> blocks:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code>$<span class="token operator">:</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">>=</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">count is dangerously high!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\tcount <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>',
	},
	{
		name: "Updating arrays and objects",
		slug: "reactivity-updating-arrays-and-objects",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet numbers = [1, 2, 3, 4];\n\n\tfunction addNumber() {\n\t\tnumbers.push(numbers.length + 1);\n\t}\n\n\t$: sum = numbers.reduce((t, n) => t + n, 0);\n</script>\n\n<p>{numbers.join(' + ')} = {sum}</p>\n\n<button on:click={addNumber}>\n\tAdd a number\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet numbers = [1, 2, 3, 4];\n\n\tfunction addNumber() {\n\t\tnumbers = [...numbers, numbers.length + 1];\n\t}\n\n\t$: sum = numbers.reduce((t, n) => t + n, 0);\n</script>\n\n<p>{numbers.join(' + ')} = {sum}</p>\n\n<button on:click={addNumber}>\n\tAdd a number\n</button>",
			},
		],
		content:
			'<p>Because Svelte\'s reactivity is triggered by assignments, using array methods like <code>push</code> and <code>splice</code> won\'t automatically cause updates. For example, clicking the button doesn\'t do anything.</p>\n<p>One way to fix that is to add an assignment that would otherwise be redundant:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">function</span> <span class="token function">addNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tnumbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>numbers<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\tnumbers <span class="token operator">=</span> numbers<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>But there\'s a more idiomatic solution:</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">function</span> <span class="token function">addNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tnumbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>numbers<span class="token punctuation">,</span> numbers<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>You can use similar patterns to replace <code>pop</code>, <code>shift</code>, <code>unshift</code> and <code>splice</code>.</p>\n<p>Assignments to <em>properties</em> of arrays and objects — e.g. <code>obj.foo += 1</code> or <code>array[i] = x</code> — work the same way as assignments to the values themselves.</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">function</span> <span class="token function">addNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tnumbers<span class="token punctuation">[</span>numbers<span class="token punctuation">.</span>length<span class="token punctuation">]</span> <span class="token operator">=</span> numbers<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>A simple rule of thumb: the name of the updated variable must appear on the left hand side of the assignment. For example this...</p>\n<div class="code-block"><pre class=\'language-javascript\'><code><span class="token keyword">const</span> foo <span class="token operator">=</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">;</span>\nfoo<span class="token punctuation">.</span>bar <span class="token operator">=</span> <span class="token string">\'baz\'</span><span class="token punctuation">;</span></code></pre></div>\n<p>...won\'t update references to <code>obj.foo.bar</code>, unless you follow it up with <code>obj = obj</code>.</p>',
	},
	{
		name: "Declaring props",
		slug: "props-declaring-props",
		initial: [
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
					"<script>\n\tlet answer;\n</script>\n\n<p>The answer is {answer}</p>",
			},
		],
		complete: [
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
		content:
			'<p>So far, we\'ve dealt exclusively with internal state — that is to say, the values are only accessible within a given component.</p>\n<p>In any real application, you\'ll need to pass data from one component down to its children. To do that, we need to declare <em>properties</em>, generally shortened to \'props\'. In Svelte, we do that with the <code>export</code> keyword. Edit the <code>Nested.svelte</code> component:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">export</span> <span class="token keyword">let</span> answer<span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre></div>\n<blockquote>\n<p>Just like <code>$:</code>, this may feel a little weird at first. That\'s not how <code>export</code> normally works in JavaScript modules! Just roll with it for now — it\'ll soon become second nature.</p>\n</blockquote>',
	},
	{
		name: "Default values",
		slug: "props-default-values",
		initial: [
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
		complete: [
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
		content:
			'<p>We can easily specify default values for props in <code>Nested.svelte</code>:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">export</span> <span class="token keyword">let</span> answer <span class="token operator">=</span> <span class="token string">\'a mystery\'</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre></div>\n<p>If we now add a second component <em>without</em> an <code>answer</code> prop, it will fall back to the default:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Nested</span> <span class="token attr-name">answer</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{42}/</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Nested</span><span class="token punctuation">/></span></span></code></pre></div>',
	},
	{
		name: "Spread props",
		slug: "props-spread-props",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Info from './Info.svelte';\n\n\tconst pkg = {\n\t\tname: 'svelte',\n\t\tversion: 3,\n\t\tspeed: 'blazing',\n\t\twebsite: 'https://svelte.dev'\n\t};\n</script>\n\n<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>",
			},
			{
				name: "Info.svelte",
				type: "svelte",
				content:
					'<script>\n\texport let name;\n\texport let version;\n\texport let speed;\n\texport let website;\n</script>\n\n<p>\n\tThe <code>{name}</code> package is {speed} fast.\n\tDownload version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>\n\tand <a href={website}>learn more here</a>\n</p>',
			},
		],
		complete: [
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
		content:
			'<p>If you have an object of properties, you can \'spread\' them onto a component instead of specifying each one:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Info</span> <span class="token attr-name">{...pkg}</span><span class="token punctuation">/></span></span></code></pre></div>\n<blockquote>\n<p>Conversely, if you need to reference all the props that were passed into a component, including ones that weren\'t declared with <code>export</code>, you can do so by accessing <code>$$props</code> directly. It\'s not generally recommended, as it\'s difficult for Svelte to optimise, but it\'s useful in rare cases.</p>\n</blockquote>',
	},
	{
		name: "If blocks",
		slug: "logic-if-blocks",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n<button on:click={toggle}>\n\tLog out\n</button>\n\n<button on:click={toggle}>\n\tLog in\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
			},
		],
		content:
			'<p>HTML doesn\'t have a way of expressing <em>logic</em>, like conditionals and loops. Svelte does.</p>\n<p>To conditionally render some markup, we wrap it in an <code>if</code> block:</p>\n<div class="code-block"><pre class=\'language-markup\'><code>{#if user.loggedIn}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{toggle}</span><span class="token punctuation">></span></span>\n\t\tLog out\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n{/if}\n\n{#if !user.loggedIn}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{toggle}</span><span class="token punctuation">></span></span>\n\t\tLog in\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n{/if}</code></pre></div>\n<p>Try it — update the component, and click on the buttons.</p>',
	},
	{
		name: "Else blocks",
		slug: "logic-else-blocks",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
			},
		],
		content:
			'<p>Since the two conditions — <code>if user.loggedIn</code> and <code>if !user.loggedIn</code> — are mutually exclusive, we can simplify this component slightly by using an <code>else</code> block:</p>\n<div class="code-block"><pre class=\'language-markup\'><code>{#if user.loggedIn}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{toggle}</span><span class="token punctuation">></span></span>\n\t\tLog out\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n{:else}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{toggle}</span><span class="token punctuation">></span></span>\n\t\tLog in\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n{/if}</code></pre></div>\n<blockquote>\n<p>A <code>#</code> character always indicates a <em>block opening</em> tag. A <code>/</code> character always indicates a <em>block closing</em> tag. A <code>:</code> character, as in <code>{:else}</code>, indicates a <em>block continuation</em> tag. Don\'t worry — you\'ve already learned almost all the syntax Svelte adds to HTML.</p>\n</blockquote>',
	},
	{
		name: "Else-if blocks",
		slug: "logic-else-if-blocks",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else}\n\t{#if 5 > x}\n\t\t<p>{x} is less than 5</p>\n\t{:else}\n\t\t<p>{x} is between 5 and 10</p>\n\t{/if}\n{/if}",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}",
			},
		],
		content:
			'<p>Multiple conditions can be \'chained\' together with <code>else if</code>:</p>\n<div class="code-block"><pre class=\'language-markup\'><code>{#if x > 10}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{x} is greater than 10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n{:else if 5 > x}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{x} is less than 5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n{:else}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{x} is between 5 and 10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n{/if}</code></pre></div>',
	},
	{
		name: "Each blocks",
		slug: "logic-each-blocks",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t<!-- open each block -->\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={cat.id}\">\n\t\t\t{cat.name}\n\t\t</a></li>\n\t<!-- close each block -->\n</ul>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t{#each cats as { id, name }, i}\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={id}\">\n\t\t\t{i + 1}: {name}\n\t\t</a></li>\n\t{/each}\n</ul>",
			},
		],
		content:
			'<p>If you need to loop over lists of data, use an <code>each</code> block:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>\n\t{#each cats as cat}\n\t\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>_blank<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://www.youtube.com/watch?v={cat.id}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\t\t\t{cat.name}\n\t\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n\t{/each}\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span></code></pre></div>\n<blockquote>\n<p>The expression (<code>cats</code>, in this case) can be any array or array-like object (i.e. it has a <code>length</code> property). You can loop over generic iterables with <code>each [...iterable]</code>.</p>\n</blockquote>\n<p>You can get the current <em>index</em> as a second argument, like so:</p>\n<div class="code-block"><pre class=\'language-markup\'><code>{#each cats as cat, i}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>_blank<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://www.youtube.com/watch?v={cat.id}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\t\t{i + 1}: {cat.name}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n{/each}</code></pre></div>\n<p>If you prefer, you can use destructuring — <code>each cats as { id, name }</code> — and replace <code>cat.id</code> and <code>cat.name</code> with <code>id</code> and <code>name</code>.</p>',
	},
	{
		name: "Keyed each blocks",
		slug: "logic-keyed-each-blocks",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n{#each things as thing}\n\t<Thing current={thing.color}/>\n{/each}",
			},
			{
				name: "Thing.svelte",
				type: "svelte",
				content:
					'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n{#each things as thing (thing.id)}\n\t<Thing current={thing.color}/>\n{/each}",
			},
			{
				name: "Thing.svelte",
				type: "svelte",
				content:
					'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
			},
		],
		content:
			'<p>By default, when you modify the value of an <code>each</code> block, it will add and remove items at the <em>end</em> of the block, and update any values that have changed. That might not be what you want.</p>\n<p>It\'s easier to show why than to explain. Click the \'Remove first thing\' button a few times, and notice that it\'s removing <code>&#x3C;Thing></code> components from the end and updating the <code>color</code> for those that remain. Instead, we\'d like to remove the first <code>&#x3C;Thing></code> component and leave the rest unaffected.</p>\n<p>To do that, we specify a unique identifier for the <code>each</code> block:</p>\n<div class="code-block"><pre class=\'language-markup\'><code>{#each things as thing (thing.id)}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Thing</span> <span class="token attr-name">current</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{thing.color}/</span><span class="token punctuation">></span></span>\n{/each}</code></pre></div>\n<p>The <code>(thing.id)</code> tells Svelte how to figure out what changed.</p>\n<blockquote>\n<p>You can use any object as the key, as Svelte uses a <code>Map</code> internally — in other words you could do <code>(thing)</code> instead of <code>(thing.id)</code>. Using a string or number is generally safer, however, since it means identity persists without referential equality, for example when updating with fresh data from an API server.</p>\n</blockquote>',
	},
	{
		name: "Await blocks",
		slug: "logic-await-blocks",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n<!-- replace this element -->\n<p>{promise}</p>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					'<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style="color: red">{error.message}</p>\n{/await}',
			},
		],
		content:
			'<p>Most web applications have to deal with asynchronous data at some point. Svelte makes it easy to <em>await</em> the value of <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" target="_blank" rel="noopener noreferrer">promises</a> directly in your markup:</p>\n<div class="code-block"><pre class=\'language-markup\'><code>{#await promise}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>...waiting<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n{:then number}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>The number is {number}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n{:catch error}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token style-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token style language-css"><span class="token property">color</span><span class="token punctuation">:</span> red</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>{error.message}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n{/await}</code></pre></div>\n<blockquote>\n<p>Only the most recent <code>promise</code> is considered, meaning you don\'t need to worry about race conditions.</p>\n</blockquote>\n<p>If you know that your promise can\'t reject, you can omit the <code>catch</code> block. You can also omit the first block if you don\'t want to show anything until the promise resolves:</p>\n<div class="code-block"><pre class=\'language-markup\'><code>{#await promise then value}\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>the value is {value}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n{/await}</code></pre></div>',
	},
	{
		name: "DOM events",
		slug: "events-dom-events",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
			},
		],
		content:
			'<p>As we\'ve briefly seen already, you can listen to any event on an element with the <code>on:</code> directive:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">on:</span>mousemove</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{handleMousemove}</span><span class="token punctuation">></span></span>\n\tThe mouse position is {m.x} x {m.y}\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre></div>',
	},
	{
		name: "Inline handlers",
		slug: "events-inline-handlers",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					'<script>\n\tlet m = { x: 0, y: 0 };\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">\n\tThe mouse position is {m.x} x {m.y}\n</div>',
			},
		],
		content:
			'<p>You can also declare event handlers inline:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">on:</span>mousemove</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{e => m = { x: e.clientX, y: e.clientY }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\tThe mouse position is {m.x} x {m.y}\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre></div>\n<p>The quote marks are optional, but they\'re helpful for syntax highlighting in some environments.</p>\n<blockquote>\n<p>In some frameworks you may see recommendations to avoid inline event handlers for performance reasons, particularly inside loops. That advice doesn\'t apply to Svelte — the compiler will always do the right thing, whichever form you choose.</p>\n</blockquote>',
	},
	{
		name: "Event modifiers",
		slug: "events-event-modifiers",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tfunction handleClick() {\n\t\talert('clicked')\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClick me\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\tfunction handleClick() {\n\t\talert('no more alerts')\n\t}\n</script>\n\n<button on:click|once={handleClick}>\n\tClick me\n</button>",
			},
		],
		content:
			'<p>DOM event handlers can have <em>modifiers</em> that alter their behaviour. For example, a handler with a <code>once</code> modifier will only run a single time:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">function</span> <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'no more alerts\'</span><span class="token punctuation">)</span>\n\t<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click|once</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{handleClick}</span><span class="token punctuation">></span></span>\n\tClick me\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code></pre></div>\n<p>The full list of modifiers:</p>\n<ul>\n<li><code>preventDefault</code> — calls <code>event.preventDefault()</code> before running the handler. Useful for client-side form handling, for example.</li>\n<li><code>stopPropagation</code> — calls <code>event.stopPropagation()</code>, preventing the event reaching the next element</li>\n<li><code>passive</code> — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it\'s safe to do so)</li>\n<li><code>nonpassive</code> — explicitly set <code>passive: false</code></li>\n<li><code>capture</code> — fires the handler during the <em>capture</em> phase instead of the <em>bubbling</em> phase (<a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture" target="_blank" rel="noopener noreferrer">MDN docs</a>)</li>\n<li><code>once</code> — remove the handler after the first time it runs</li>\n<li><code>self</code> — only trigger handler if event.target is the element itself</li>\n</ul>\n<p>You can chain modifiers together, e.g. <code>on:click|once|capture={...}</code>.</p>',
	},
	{
		name: "Component events",
		slug: "events-component-events",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Inner from './Inner.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Inner on:message={handleMessage}/>",
			},
			{
				name: "Inner.svelte",
				type: "svelte",
				content:
					"<script>\n\t// setup code goes here\n\n\tfunction sayHello() {\n\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Inner from './Inner.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Inner on:message={handleMessage}/>",
			},
			{
				name: "Inner.svelte",
				type: "svelte",
				content:
					"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
			},
		],
		content:
			'<p>Components can also dispatch events. To do so, they must create an event dispatcher. Update <code>Inner.svelte</code>:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">import</span> <span class="token punctuation">{</span> createEventDispatcher <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'svelte\'</span><span class="token punctuation">;</span>\n\n\t<span class="token keyword">const</span> dispatch <span class="token operator">=</span> <span class="token function">createEventDispatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\t<span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'message\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n\t\t\ttext<span class="token operator">:</span> <span class="token string">\'Hello!\'</span>\n\t\t<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\t<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre></div>\n<blockquote>\n<p><code>createEventDispatcher</code> must be called when the component is first instantiated — you can\'t do it later inside e.g. a <code>setTimeout</code> callback. This links <code>dispatch</code> to the component instance.</p>\n</blockquote>',
	},
	{
		name: "Event forwarding",
		slug: "events-event-forwarding",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Outer from './Outer.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Outer on:message={handleMessage}/>",
			},
			{
				name: "Inner.svelte",
				type: "svelte",
				content:
					"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
			},
			{
				name: "Outer.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner/>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Outer from './Outer.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Outer on:message={handleMessage}/>",
			},
			{
				name: "Inner.svelte",
				type: "svelte",
				content:
					"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
			},
			{
				name: "Outer.svelte",
				type: "svelte",
				content:
					"<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner on:message/>",
			},
		],
		content:
			'<p>Unlike DOM events, component events don\'t <em>bubble</em>. If you want to listen to an event on some deeply nested component, the intermediate components must <em>forward</em> the event.</p>\n<p>In this case, we have the same <code>App.svelte</code> and <code>Inner.svelte</code> as in the <a href="tutorial/component-events" rel="noopener noreferrer">previous chapter</a>, but there\'s now an <code>Outer.svelte</code> component that contains <code>&#x3C;Inner/></code>.</p>\n<p>One way we could solve the problem is adding <code>createEventDispatcher</code> to <code>Outer.svelte</code>, listening for the <code>message</code> event, and creating a handler for it:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">import</span> Inner <span class="token keyword">from</span> <span class="token string">\'./Inner.svelte\'</span><span class="token punctuation">;</span>\n\t<span class="token keyword">import</span> <span class="token punctuation">{</span> createEventDispatcher <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'svelte\'</span><span class="token punctuation">;</span>\n\n\t<span class="token keyword">const</span> dispatch <span class="token operator">=</span> <span class="token function">createEventDispatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\t<span class="token keyword">function</span> <span class="token function">forward</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'message\'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>detail<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\t<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Inner</span> <span class="token attr-name"><span class="token namespace">on:</span>message</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{forward}/</span><span class="token punctuation">></span></span></code></pre></div>\n<p>But that\'s a lot of code to write, so Svelte gives us an equivalent shorthand — an <code>on:message</code> event directive without a value means \'forward all <code>message</code> events\'.</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n\t<span class="token keyword">import</span> Inner <span class="token keyword">from</span> <span class="token string">\'./Inner.svelte\'</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Inner</span> <span class="token attr-name"><span class="token namespace">on:</span>message</span><span class="token punctuation">/></span></span></code></pre></div>',
	},
	{
		name: "DOM event forwarding",
		slug: "events-dom-event-forwarding",
		initial: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport CustomButton from './CustomButton.svelte';\n\n\tfunction handleClick() {\n\t\talert('clicked');\n\t}\n</script>\n\n<CustomButton on:click={handleClick}/>",
			},
			{
				name: "CustomButton.svelte",
				type: "svelte",
				content:
					"<style>\n\tbutton {\n\t\theight: 4rem;\n\t\twidth: 8rem;\n\t\tbackground-color: #aaa;\n\t\tborder-color: #f1c40f;\n\t\tcolor: #f1c40f;\n\t\tfont-size: 1.25rem;\n\t\tbackground-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);\n\t\tbackground-position: 100%;\n\t\tbackground-size: 400%;\n\t\ttransition: background 300ms ease-in-out;\n\t}\n\tbutton:hover {\n\t\tbackground-position: 0;\n\t\tcolor: #aaa;\n\t}\n</style>\n\n<button>\n\tClick me\n</button>",
			},
		],
		complete: [
			{
				name: "App.svelte",
				type: "svelte",
				content:
					"<script>\n\timport CustomButton from './CustomButton.svelte';\n\n\tfunction handleClick() {\n\t\talert('clicked');\n\t}\n</script>\n\n<CustomButton on:click={handleClick}/>",
			},
			{
				name: "CustomButton.svelte",
				type: "svelte",
				content:
					"<style>\n\tbutton {\n\t\theight: 4rem;\n\t\twidth: 8rem;\n\t\tbackground-color: #aaa;\n\t\tborder-color: #f1c40f;\n\t\tcolor: #f1c40f;\n\t\tfont-size: 1.25rem;\n\t\tbackground-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);\n\t\tbackground-position: 100%;\n\t\tbackground-size: 400%;\n\t\ttransition: background 300ms ease-in-out;\n\t}\n\tbutton:hover {\n\t\tbackground-position: 0;\n\t\tcolor: #aaa;\n\t}\n</style>\n\n<button on:click>\n\tClick me\n</button>",
			},
		],
		content:
			'<p>Event forwarding works for DOM events too.</p>\n<p>We want to get notified of clicks on our <code>&#x3C;CustomButton></code> — to do that, we just need to forward <code>click</code> events on the <code>&#x3C;button></code> element in <code>CustomButton.svelte</code>:</p>\n<div class="code-block"><pre class=\'language-markup\'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click</span><span class="token punctuation">></span></span>\n\tClick me\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code></pre></div>',
	},
];
