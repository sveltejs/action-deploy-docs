//@ts-nocheck
export const everything = [
	{
		content: {
			list: [
				{
					title: "part 1",
					slug: "part-1",
					file: "01-boo.md",
					sections: [
						{
							slug: "part-1-docs1-content",
							title: "docs1 content",
							sections: [],
						},
					],
				},
				{
					title: "part 2",
					slug: "part-2",
					file: "02-boo.md",
					sections: [
						{
							slug: "part-2-docs2-content",
							title: "docs2 content",
							sections: [],
						},
					],
				},
				{
					title: "part 3",
					slug: "part-3",
					file: "03-boo.md",
					sections: [
						{
							slug: "part-3-docs3-content",
							title: "docs3 content",
							sections: [],
						},
					],
				},
			],
			full: [
				{
					title: "part 1",
					slug: "part-1",
					file: "01-boo.md",
					sections: [
						{
							slug: "part-1-docs1-content",
							title: "docs1 content",
							sections: [],
						},
					],
					content:
						'<h3 id="part-1-docs1-content">docs1 content</h3>',
				},
				{
					title: "part 2",
					slug: "part-2",
					file: "02-boo.md",
					sections: [
						{
							slug: "part-2-docs2-content",
							title: "docs2 content",
							sections: [],
						},
					],
					content:
						'<h3 id="part-2-docs2-content">docs2 content</h3>',
				},
				{
					title: "part 3",
					slug: "part-3",
					file: "03-boo.md",
					sections: [
						{
							slug: "part-3-docs3-content",
							title: "docs3 content",
							sections: [],
						},
					],
					content:
						'<h3 id="part-3-docs3-content">docs3 content</h3>',
				},
			],
		},
		project: "svelte",
		type: "docs",
	},
	{
		content: {
			list: [
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
			],
			full: [
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
			],
		},
		project: "svelte",
		type: "tutorial",
	},
	{
		content: {
			list: [
				{
					title: "Sapper: Towards the ideal web app framework",
					slug: "sapper-towards-the-ideal-web-app-framework",
					file: "2017-12-31-sapper-towards-the-ideal-web-app-framework.md",
					date: {
						pretty: "Sun Dec 31 2017",
						numeric: "2017-12-31",
					},
				},
				{
					title: "The zen of Just Writing CSS",
					slug: "the-zen-of-just-writing-css",
					file: "2017-09-06-the-zen-of-just-writing-css.md",
					date: {
						pretty: "Wed Sep 06 2017",
						numeric: "2017-09-06",
					},
				},
				{
					title: "The easiest way to get started with Svelte",
					slug: "the-easiest-way-to-get-started",
					file: "2017-08-07-the-easiest-way-to-get-started.md",
					date: {
						pretty: "Mon Aug 07 2017",
						numeric: "2017-08-07",
					},
				},
				{
					title:
						"Frameworks without the framework: why didn't we think of this sooner?",
					slug: "frameworks-without-the-framework",
					file: "2016-11-26-frameworks-without-the-framework.md",
					date: {
						pretty: "Sat Nov 26 2016",
						numeric: "2016-11-26",
					},
				},
			],
			full: [
				{
					title: "Sapper: Towards the ideal web app framework",
					slug: "sapper-towards-the-ideal-web-app-framework",
					file: "2017-12-31-sapper-towards-the-ideal-web-app-framework.md",
					content:
						'<blockquote>\n<p>Quickstart for the impatient: <a href="https://sapper.svelte.dev" target="_blank" rel="noopener noreferrer">the Sapper docs</a>, and the <a href="https://github.com/sveltejs/sapper-template" target="_blank" rel="noopener noreferrer">starter template</a></p>\n</blockquote>\n<p>If you had to list the characteristics of the perfect Node.js web application framework, you\'d probably come up with something like this:</p>\n<ol>\n<li>It should do server-side rendering, for fast initial loads and no caveats around SEO</li>\n<li>As a corollary, your app\'s codebase should be universal — write once for server <em>and</em> client</li>\n<li>The client-side app should <em>hydrate</em> the server-rendered HTML, attaching event listeners (and so on) to existing elements rather than re-rendering them</li>\n<li>Navigating to subsequent pages should be instantaneous</li>\n<li>Offline, and other Progressive Web App characteristics, must be supported out of the box</li>\n<li>Only the JavaScript and CSS required for the first page should load initially. That means the framework should do automatic code-splitting at the route level, and support dynamic <code>import(...)</code> for more granular manual control</li>\n<li>No compromise on performance</li>\n<li>First-rate developer experience, with hot module reloading and all the trimmings</li>\n<li>The resulting codebase should be easy to grok and maintain</li>\n<li>It should be possible to understand and customise every aspect of the system — no webpack configs locked up in the framework, and as little hidden \'plumbing\' as possible</li>\n<li>Learning the entire framework in under an hour should be easy, and not just for experienced developers</li>\n</ol>\n<p><a href="https://github.com/zeit/next.js" target="_blank" rel="noopener noreferrer">Next.js</a> is close to this ideal. If you haven\'t encountered it yet, I strongly recommend going through the tutorials at <a href="https://learnnextjs.com" target="_blank" rel="noopener noreferrer">learnnextjs.com</a>. Next introduced a brilliant idea: all the pages of your app are files in a <code>your-project/pages</code> directory, and each of those files is just a React component.</p>\n<p>Everything else flows from that breakthrough design decision. Finding the code responsible for a given page is easy, because you can just look at the filesystem rather than playing \'guess the component name\'. Project structure bikeshedding is a thing of the past. And the combination of SSR (server-side rendering) and code-splitting — something the React Router team <a href="https://reacttraining.com/react-router/web/guides/code-splitting" target="_blank" rel="noopener noreferrer">gave up on</a>, declaring \'Godspeed those who attempt the server-rendered, code-split apps\' — is trivial.</p>\n<p>But it\'s not perfect. As churlish as it might be to list the flaws in something <em>so, so good</em>, there are some:</p>\n<ul>\n<li>Next uses something called \'route masking\' to create nice URLs (e.g. <code>/blog/hello-world</code> instead of <code>/post?slug=hello-world</code>). This undermines the guarantee about directory structure corresponding to app structure, and forces you to maintain configuration that translates between the two forms</li>\n<li>All your routes are assumed to be universal \'pages\'. But it\'s very common to need routes that only render on the server, such as a 301 redirect or an <a href="/blog/sapper-towards-the-ideal-web-app-framework.json" rel="noopener noreferrer">API endpoint</a> that serves the data for your pages, and Next doesn\'t have a great solution for this. You can add logic to your <code>server.js</code> file to handle these cases, but it feels at odds with the declarative approach taken for pages</li>\n<li>To use the client-side router, links can\'t be standard <code>&#x3C;a></code> tags. Instead, you have to use framework-specific <code>&#x3C;Link></code> components, which is impossible in the markdown content for a blog post such as this one, for example</li>\n</ul>\n<p>The real problem, though, is that all that goodness comes for a price. The simplest possible Next app — a single \'hello world\' page that renders some static text — involves 66kb of gzipped JavaScript. Unzipped, it\'s 204kb, which is a non-trivial amount of code for a mobile device to parse at a time when performance is a critical factor determining whether or not your users will stick around. And that\'s the <em>baseline</em>.</p>\n<p>We can do better!</p>\n<h2 id="the-compiler-as-framework-paradigm-shift">The compiler-as-framework paradigm shift</h2>\n<p><a href="blog/frameworks-without-the-framework" rel="noopener noreferrer">Svelte introduced a radical idea</a>: what if your UI framework wasn\'t a framework at all, but a compiler that turned your components into standalone JavaScript modules? Instead of using a library like React or Vue, which knows nothing about your app and must therefore be a one-size-fits-all solution, we can ship highly-optimised vanilla JavaScript. Just the code your app needs, and without the memory and performance overhead of solutions based on a virtual DOM.</p>\n<p>The JavaScript world is <a href="https://tomdale.net/2017/09/compilers-are-the-new-frameworks/" target="_blank" rel="noopener noreferrer">moving towards this model</a>. <a href="https://stenciljs.com" target="_blank" rel="noopener noreferrer">Stencil</a>, a Svelte-inspired framework from the Ionic team, compiles to web components. <a href="https://glimmerjs.com" target="_blank" rel="noopener noreferrer">Glimmer</a> <em>doesn\'t</em> compile to standalone JavaScript (the pros and cons of which deserve a separate blog post), but the team is doing some fascinating research around compiling templates to bytecode. (React is <a href="https://twitter.com/trueadm/status/944908776896978946" target="_blank" rel="noopener noreferrer">getting in on the action</a>, though their current research focuses on optimising your JSX app code, which is arguably more similar to the ahead-of-time optimisations that Angular, Ractive and Vue have been doing for a few years.)</p>\n<p>What happens if we use the new model as a starting point?</p>\n<h2 id="introducing-sapper">Introducing Sapper</h2>\n<aside><p>The <a href="https://sapper.svelte.dev/docs#Why_the_name">name comes from</a> the term for combat engineers, and is also short for Svelte app maker</p></aside>\n<p><a href="https://sapper.svelte.dev" target="_blank" rel="noopener noreferrer">Sapper</a> is the answer to that question. <strong>Sapper is a Next.js-style framework that aims to meet the eleven criteria at the top of this article while dramatically reducing the amount of code that gets sent to the browser.</strong> It\'s implemented as Express-compatible middleware, meaning it\'s easy to understand and customise.</p>\n<p>The same \'hello world\' app that took 204kb with React and Next weighs just 7kb with Sapper. That number is likely to fall further in the future as we explore the space of optimisation possibilities, such as not shipping any JavaScript <em>at all</em> for pages that aren\'t interactive, beyond the tiny Sapper runtime that handles client-side routing.</p>\n<p>What about a more \'real world\' example? Conveniently, the <a href="https://github.com/gothinkster/realworld" target="_blank" rel="noopener noreferrer">RealWorld</a> project, which challenges frameworks to develop an implementation of a Medium clone, gives us a way to find out. The <a href="https://github.com/sveltejs/realworld" target="_blank" rel="noopener noreferrer">Sapper implementation</a> takes 39.6kb (11.8kb zipped) to render an interactive homepage.</p>\n<aside><p>Code-splitting isn\'t free — if the reference implementation used code-splitting, it would be larger still</p></aside>\n<p>The entire app costs 132.7kb (39.9kb zipped), which is significantly smaller than the reference React/Redux implementation at 327kb (85.7kb), but even if it was as large it would <em>feel</em> faster because of code-splitting. And that\'s a crucial point. We\'re told we need to code-split our apps, but if your app uses a traditional framework like React or Vue then there\'s a hard lower bound on the size of your initial code-split chunk — the framework itself, which is likely to be a significant portion of your total app size. With the Svelte approach, that\'s no longer the case.</p>\n<p>But size is only part of the story. Svelte apps are also extremely performant and memory-efficient, and the framework includes powerful features that you would sacrifice if you chose a \'minimal\' or \'simple\' UI library.</p>\n<h2 id="trade-offs">Trade-offs</h2>\n<p>The biggest drawback for many developers evaluating Sapper would be \'but I like React, and I already know how to use it\', which is fair.</p>\n<p>If you\'re in that camp, I\'d invite you to at least try alternative frameworks. You might be pleasantly surprised! The <a href="https://github.com/sveltejs/realworld" target="_blank" rel="noopener noreferrer">Sapper RealWorld</a> implementation totals 1,201 lines of source code, compared to 2,377 for the reference implementation, because you\'re able to express concepts very concisely using Svelte\'s template syntax (which <a href="https://v2.svelte.dev/guide#template-syntax" target="_blank" rel="noopener noreferrer">takes all of five minutes to master</a>). You get <a href="blog/the-zen-of-just-writing-css" rel="noopener noreferrer">scoped CSS</a>, with unused style removal and minification built-in, and you can use preprocessors like LESS if you want. You no longer need to use Babel. SSR is ridiculously fast, because it\'s just string concatenation. And we recently introduced <a href="https://v2.svelte.dev/guide#state-management" target="_blank" rel="noopener noreferrer">svelte/store</a>, a tiny global store that synchronises state across your component hierarchy with zero boilerplate. The worst that can happen is that you\'ll end up feeling vindicated!</p>\n<p>But there are trade-offs nonetheless. Some people have a pathological aversion to any form of \'template language\', and maybe that applies to you. JSX proponents will clobber you with the \'it\'s just JavaScript\' mantra, and therein lies React\'s greatest strength, which is that it is infinitely flexible. That flexibility comes with its own set of trade-offs, but we\'re not here to discuss those.</p>\n<p>And then there\'s <em>ecosystem</em>. The universe around React in particular — the devtools, editor integrations, ancillary libraries, tutorials, StackOverflow answers, hell, even job opportunities — is unrivalled. While it\'s true that citing \'ecosystem\' as the main reason to choose a tool is a sign that you\'re stuck on a local maximum, apt to be marooned by the rising waters of progress, it\'s still a major point in favour of incumbents.</p>\n<h2 id="roadmap">Roadmap</h2>\n<p>We\'re not at version 1.0.0 yet, and a few things may change before we get there. Once we do (soon!), there are a lot of exciting possibilities.</p>\n<p>I believe the next frontier of web performance is \'whole-app optimisation\'. Currently, Svelte\'s compiler operates at the component level, but a compiler that understood the boundaries <em>between</em> those components could generate even more efficient code. The React team\'s <a href="https://twitter.com/trueadm/status/944908776896978946" target="_blank" rel="noopener noreferrer">Prepack research</a> is predicated on a similar idea, and the Glimmer team is doing some interesting work in this space. Svelte and Sapper are well positioned to take advantage of these ideas.</p>\n<p>Speaking of Glimmer, the idea of compiling components to bytecode is one that we\'ll probably steal in 2018. A framework like Sapper could conceivably determine which compilation mode to use based on the characteristics of your app. It could even serve JavaScript for the initial route for the fastest possible startup time, then lazily serve a bytecode interpreter for subsequent routes, resulting in the optimal combination of startup size and total app size.</p>\n<p>Mostly, though, we want the direction of Sapper to be determined by its users. If you\'re the kind of developer who enjoys life on the bleeding edge and would like to help shape the future of how we build web apps, please join us on <a href="https://github.com/sveltejs/svelte" target="_blank" rel="noopener noreferrer">GitHub</a> and <a href="chat" rel="noopener noreferrer">Discord</a>.</p>',
					date: {
						pretty: "Sun Dec 31 2017",
						numeric: "2017-12-31",
					},
				},
				{
					title: "The zen of Just Writing CSS",
					slug: "the-zen-of-just-writing-css",
					file: "2017-09-06-the-zen-of-just-writing-css.md",
					content:
						'<p>It\'s fashionable to dislike CSS. There are lots of reasons why that\'s the case, but it boils down to this: CSS is <em>unpredictable</em>. If you\'ve never had the experience of tweaking a style rule and accidentally breaking some layout that you thought was completely unrelated — usually when you\'re trying to ship — then you\'re either new at this or you\'re a much better programmer than the rest of us.</p>\n<p>So the JavaScript community rolled up its sleeves and got to work. Over the last couple of years, there\'s been a Cambrian explosion of libraries aimed at making CSS behave, collectively referred to as <em>CSS-in-JS</em>.</p>\n<p>What you might not realise is that <strong>the biggest problems with CSS can be solved without CSS-in-JS</strong>. Without those problems, writing CSS isn\'t just tolerable — it\'s enjoyable. And you don\'t have to find solutions to the additional problems that CSS-in-JS introduces.</p>\n<p>This article isn\'t in any way intended as criticism of the hard work the CSS-in-JS community has done. It\'s one of the most active corners of the JS ecosystem, and new ideas are springing up every week. Instead, my purpose is to illustrate why an alternative approach — based on Single File Components with real CSS — is so damn delightful.</p>\n<h2 id="the-biggest-problem-with-css">The biggest problem with CSS</h2>\n<p>Everything in CSS is global. Because of that, styles intended for one bit of markup often end up affecting another. Because of <em>that</em>, developers often resort to wild namespacing conventions (not \'rules\', since they\'re very difficult to enforce) that mostly just increase your risk of RSI.</p>\n<p>It gets worse when you\'re working on a team. No-one dares touch styles authored by someone else, because it\'s often unclear what they\'re doing, what markup they apply to, and what disasters will unfold if you remove them.</p>\n<p>The consequence of all this is the <strong>append-only stylesheet</strong>. There\'s no way of knowing which code can safely be removed, so it\'s common to undo some existing style with another, more specific style — even on relatively small projects.</p>\n<h2 id="single-file-components-change-all-that">Single File Components change all that</h2>\n<p>The idea behind SFCs is simple: you write your components in an HTML file that (optionally) contains a <code>&#x3C;style></code> and <code>&#x3C;script></code> attribute describing the component\'s styles and behaviour. Svelte, Ractive, Vue and Polymer all follow this basic pattern.</p>\n<aside>\n\t<p><a href="blog/frameworks-without-the-framework">Read the introductory blog post</a> if you\'re new to Svelte. Or <a href="https://twitter.com/padolsey/status/899717303234908160">read</a> <a href="https://twitter.com/sveltejs/status/901818357644701696">the</a> <a href="https://twitter.com/sveltejs/status/901818106309476352">testimonials</a>.</p>\n</aside>\n<p>(For the rest of this article we\'ll be using Svelte, obviously. But if the idea of using a template language makes you shudder — your fears are misplaced, but that\'s a topic for another day — then just use Vue which lets you use JSX in your SFCs.)</p>\n<p>Several wonderful things happen as a result:</p>\n<ul>\n<li>Your styles are <em>scoped to the component</em>. No more leakage, no more unpredictable cascade. And no more sesquipedalian classnames designed to prevent conflicts.</li>\n<li>You don\'t need to go spelunking through your folder structure to find the rules that are breaking your stuff.</li>\n<li>The compiler (in Svelte\'s case) can <strong>identify and remove unused styles</strong>. No more append-only stylesheets!</li>\n</ul>\n<p>Let\'s see what that looks like in practice.</p>\n<figure>\n\t<video controls poster=\'https://svelte-technology-assets.surge.sh/just-write-css.jpg\'>\n\t\t<source type=\'video/mp4\' src=\'https://svelte-technology-assets.surge.sh/just-write-css.mp4\'>\n\t</video>\n<div class="code-block"><pre class=\'language-undefined\'><code>&lt;figcaption&gt;\n\tIs this what they mean by \'use the platform\'?\n&lt;/figcaption&gt;</code></pre></div>\n</figure>\n<p>Every code editor already knows about CSS, so there\'s a good chance that you\'ll get autocomplete, linting, syntax highlighting and so on — all without additional JS-fatigue-inducing tools.</p>\n<p>And because it\'s real CSS, rather than some camelCased quotes-everywhere impostor, we can take advantage of the \'tweak in devtools, paste back into our source code\' workflow, which I personally couldn\'t live without. Notice that we get CSS sourcemaps out of the box, so you can instantly pinpoint the lines in question. It\'s hard to overstate the importance of this: when you\'re in WYSIWYG mode, you\'re not thinking in terms of your component tree, so having a robust way to figure out <em>where these damn styles came from</em> is essential. Doubly so if someone else originally wrote the component. (I promise you, this is the single biggest productivity boost to your CSS workflow. If you\'re writing styles without sourcemaps, you are almost certainly wasting a lot of time. I know I was.)</p>\n<p>Svelte transforms your selectors (using an attribute that\'s also applied to affected elements, though the exact mechanism is unimportant and subject to change) to achieve the scoping. It warns on and removes any unused rules, then it minifies the result and lets you write it out to a <code>.css</code> file. There\'s also an experimental new option to compile to web components, using shadow DOM to encapsulate the styles, if that\'s your jam.</p>\n<p>This is all possible because your CSS is parsed (with <a href="https://github.com/csstree/csstree" target="_blank" rel="noopener noreferrer">css-tree</a>) and statically analysed in the context of your markup. Static analysis opens the doors to all kinds of exciting future possibilities — smarter optimisations, a11y hints — that are much harder if your styles are computed dynamically at runtime. We\'re just getting started.</p>\n<h2 id="but-we-can-add-tools-to-do-x">But we can add tools to do [x]!</h2>\n<p>If your reaction to the video was \'fine, but if we use TypeScript and write plugins for each editor then we can get all the autocomplete and syntax highlighting stuff\' — in other words, if you believe that in order to achieve parity with CSS it makes sense to build, document, promote and maintain a fleet of ancillary projects — then, well, you and I may never see eye to eye!</p>\n<h2 id="we-don-t-have-all-the-answers-yet">We don\'t have all the answers — yet</h2>\n<p>Having said all that, CSS-in-JS does point to answers to some lingering questions:</p>\n<ul>\n<li>How can we install styles from npm?</li>\n<li>How can we reuse constants that are defined in a single place?</li>\n<li>How can we compose declarations?</li>\n</ul>\n<p>Personally, I haven\'t found these issues to outweigh the benefits of the approach outlined above. You may well have a different set of priorities, and they may be reason enough for you to abandon CSS.</p>\n<p>But at the end of the day, you have to know CSS anyway. Love it or loathe it, you must at least <em>learn</em> it. As custodians of the web, we have a choice: create abstractions that steepen the web dev learning curve yet further, or work together to fix the bad parts of CSS. I know which I choose.</p>',
					date: {
						pretty: "Wed Sep 06 2017",
						numeric: "2017-09-06",
					},
				},
				{
					title: "The easiest way to get started with Svelte",
					slug: "the-easiest-way-to-get-started",
					file: "2017-08-07-the-easiest-way-to-get-started.md",
					content:
						'<p>Svelte is a <a href="/blog/frameworks-without-the-framework" rel="noopener noreferrer">new kind of framework</a>. Rather than putting a <code>&#x3C;script src=\'svelte.js\'></code> tag on the page, or bringing it into your app with <code>import</code> or <code>require</code>, Svelte is a compiler that works behind the scenes to turn your component files into beautifully optimised JavaScript.</p>\n<p>Because of that, getting started with it can be a little bit confusing at first. How, you might reasonably ask, do you make a Svelte app?</p>\n<h2 id="1-use-the-repl">1. Use the REPL</h2>\n<p>The <a href="repl" rel="noopener noreferrer">Svelte REPL</a> is the easiest way to begin. You can choose from a list of examples to get you started, and tweak them until they do what you want.</p>\n<aside><p>You\'ll need to have <a href="https://nodejs.org/">Node.js</a> installed, and know how to use the terminal</p></aside>\n<p>At some point, your app will outgrow the REPL. Click the <strong>download</strong> button to save a <code>svelte-app.zip</code> file to your computer and uncompress it.</p>\n<p>Open a terminal window and set the project up...</p>\n<div class="code-block"><pre class=\'language-bash\'><code><span class="token builtin class-name">cd</span> /path/to/svelte-app\n<span class="token function">npm</span> <span class="token function">install</span></code></pre></div>\n<p>...then start up a development server:</p>\n<div class="code-block"><pre class=\'language-bash\'><code><span class="token function">npm</span> run dev</code></pre></div>\n<p>This will serve your app on <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer">localhost:5000</a> and rebuild it with <a href="https://rollupjs.org" target="_blank" rel="noopener noreferrer">Rollup</a> every time you make a change to the files in <code>svelte-app/src</code>.</p>\n<h2 id="2-use-degit">2. Use degit</h2>\n<p>When you download from the REPL, you\'re getting a customised version of the <a href="https://github.com/sveltejs/template" target="_blank" rel="noopener noreferrer">sveltejs/template</a> repo. You can skip messing around with zip files by using <a href="https://github.com/Rich-Harris/degit" target="_blank" rel="noopener noreferrer">degit</a>, a project scaffolding tool.</p>\n<p>In the terminal, you can instantly create a new project like so:</p>\n<div class="code-block"><pre class=\'language-bash\'><code>npx degit sveltejs/template my-svelte-project\n<span class="token builtin class-name">cd</span> my-svelte-project\n<span class="token function">npm</span> <span class="token function">install</span>\n<span class="token function">npm</span> run dev</code></pre></div>\n<p>This will create a new project in the <code>my-svelte-project</code> directory, install its dependencies, and start a server on <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer">http://localhost:5000</a>.</p>\n<p>Once you\'ve tinkered a bit and understood how everything fits together, you can fork <a href="https://github.com/sveltejs/template" target="_blank" rel="noopener noreferrer">sveltejs/template</a> and start doing this instead:</p>\n<div class="code-block"><pre class=\'language-bash\'><code>npx degit your-name/template my-new-project</code></pre></div>\n<p>And that\'s it! Do <code>npm run build</code> to create a production-ready version of your app, and check the project template\'s <a href="https://github.com/sveltejs/template/blob/master/README.md" target="_blank" rel="noopener noreferrer">README</a> for instructions on how to easily deploy your app to the web with <a href="https://zeit.co/now" target="_blank" rel="noopener noreferrer">Now</a> or <a href="http://surge.sh/" target="_blank" rel="noopener noreferrer">Surge</a>.</p>\n<p>You\'re not restricted to using Rollup — there are also integrations for <a href="https://github.com/sveltejs/svelte-loader" target="_blank" rel="noopener noreferrer">webpack</a>, <a href="https://github.com/tehshrike/sveltify" target="_blank" rel="noopener noreferrer">Browserify</a> and others, or you can use the <a href="https://github.com/sveltejs/svelte-cli" target="_blank" rel="noopener noreferrer">Svelte CLI</a> (Update from 2019: with Svelte 3 the CLI was deprecated and we now use <a href="https://www.npmjs.com/package/sirv-cli" target="_blank" rel="noopener noreferrer">sirv-cli</a> in our template. Feel free to use whatever tool you like!) or the <a href="https://github.com/sveltejs/svelte/tree/v2#api" target="_blank" rel="noopener noreferrer">API</a> directly. If you make a project template using one of these tools, please share it with the <a href="chat" rel="noopener noreferrer">Svelte Discord chatroom</a>, or via <a href="https://twitter.com/sveltejs" target="_blank" rel="noopener noreferrer">@sveltejs</a> on Twitter!</p>',
					date: {
						pretty: "Mon Aug 07 2017",
						numeric: "2017-08-07",
					},
				},
				{
					title:
						"Frameworks without the framework: why didn't we think of this sooner?",
					slug: "frameworks-without-the-framework",
					file: "2016-11-26-frameworks-without-the-framework.md",
					content:
						'<blockquote>\n<p>Wait, this new framework has a <em>runtime</em>? Ugh. Thanks, I\'ll pass.\n<strong>– front end developers in 2018</strong></p>\n</blockquote>\n<p>We\'re shipping too much code to our users. Like a lot of front end developers, I\'ve been in denial about that fact, thinking that it was fine to serve 100kb of JavaScript on page load – just use <a href="https://twitter.com/miketaylr/status/227056824275333120" target="_blank" rel="noopener noreferrer">one less .jpg!</a> – and that what <em>really</em> mattered was performance once your app was already interactive.</p>\n<p>But I was wrong. 100kb of .js isn\'t equivalent to 100kb of .jpg. It\'s not just the network time that\'ll kill your app\'s startup performance, but the time spent parsing and evaluating your script, during which time the browser becomes completely unresponsive. On mobile, those milliseconds rack up very quickly.</p>\n<p>If you\'re not convinced that this is a problem, follow <a href="https://twitter.com/slightlylate" target="_blank" rel="noopener noreferrer">Alex Russell</a> on Twitter. Alex <a href="https://twitter.com/slightlylate/status/728355959022587905" target="_blank" rel="noopener noreferrer">hasn\'t been making many friends in the framework community lately</a>, but he\'s not wrong. But the proposed alternative to using frameworks like Angular, React and Ember – <a href="https://www.polymer-project.org/1.0/" target="_blank" rel="noopener noreferrer">Polymer</a> – hasn\'t yet gained traction in the front end world, and it\'s certainly not for a lack of marketing.</p>\n<p>Perhaps we need to rethink the whole thing.</p>\n<h2 id="what-problem-do-frameworks-really-solve">What problem do frameworks <em>really</em> solve?</h2>\n<p>The common view is that frameworks make it easier to manage the complexity of your code: the framework abstracts away all the fussy implementation details with techniques like virtual DOM diffing. But that\'s not really true. At best, frameworks <em>move the complexity around</em>, away from code that you had to write and into code you didn\'t.</p>\n<p>Instead, the reason that ideas like React are so wildly and deservedly successful is that they make it easier to manage the complexity of your <em>concepts</em>. Frameworks are primarily a tool for structuring your thoughts, not your code.</p>\n<p>Given that, what if the framework <em>didn\'t actually run in the browser</em>? What if, instead, it converted your application into pure vanilla JavaScript, just like Babel converts ES2016+ to ES5? You\'d pay no upfront cost of shipping a hefty runtime, and your app would get seriously fast, because there\'d be no layers of abstraction between your app and the browser.</p>\n<h2 id="introducing-svelte">Introducing Svelte</h2>\n<p>Svelte is a new framework that does exactly that. You write your components using HTML, CSS and JavaScript (plus a few extra bits you can <a href="https://v2.svelte.dev/guide" target="_blank" rel="noopener noreferrer">learn in under 5 minutes</a>), and during your build process Svelte compiles them into tiny standalone JavaScript modules. By statically analysing the component template, we can make sure that the browser does as little work as possible.</p>\n<p>The <a href="https://svelte-todomvc.surge.sh/" target="_blank" rel="noopener noreferrer">Svelte implementation of TodoMVC</a> weighs 3.6kb zipped. For comparison, React plus ReactDOM <em>without any app code</em> weighs about 45kb zipped. It takes about 10x as long for the browser just to evaluate React as it does for Svelte to be up and running with an interactive TodoMVC.</p>\n<p>And once your app <em>is</em> up and running, according to <a href="https://github.com/krausest/js-framework-benchmark" target="_blank" rel="noopener noreferrer">js-framework-benchmark</a> <strong>Svelte is fast as heck</strong>. It\'s faster than React. It\'s faster than Vue. It\'s faster than Angular, or Ember, or Ractive, or Preact, or Riot, or Mithril. It\'s competitive with Inferno, which is probably the fastest UI framework in the world, for now, because <a href="https://twitter.com/trueadm" target="_blank" rel="noopener noreferrer">Dominic Gannaway</a> is a wizard. (Svelte is slower at removing elements. We\'re <a href="https://github.com/sveltejs/svelte/issues/26" target="_blank" rel="noopener noreferrer">working on it</a>.)</p>\n<p>It\'s basically as fast as vanilla JS, which makes sense because it <em>is</em> vanilla JS – just vanilla JS that you didn\'t have to write.</p>\n<h2 id="but-that-s-not-the-important-thing">But that\'s not the important thing</h2>\n<p>Well, it <em>is</em> important – performance matters a great deal. What\'s really exciting about this approach, though, is that we can finally solve some of the thorniest problems in web development.</p>\n<p>Consider interoperability. Want to <code>npm install cool-calendar-widget</code> and use it in your app? Previously, you could only do that if you were already using (a correct version of) the framework that the widget was designed for – if <code>cool-calendar-widget</code> was built in React and you\'re using Angular then, well, hard cheese. But if the widget author used Svelte, apps that use it can be built using whatever technology you like. (On the TODO list: a way to convert Svelte components into web components.)</p>\n<p>Or <a href="https://twitter.com/samccone/status/797528710085652480" target="_blank" rel="noopener noreferrer">code splitting</a>. It\'s a great idea (only load the code the user needs for the initial view, then get the rest later), but there\'s a problem – even if you only initially serve one React component instead of 100, <em>you still have to serve React itself</em>. With Svelte, code splitting can be much more effective, because the framework is embedded in the component, and the component is tiny.</p>\n<p>Finally, something I\'ve wrestled with a great deal as an open source maintainer: your users always want <em>their</em> features prioritised, and underestimate the cost of those features to people who don\'t need them. A framework author must always balance the long-term health of the project with the desire to meet their users\' needs. That\'s incredibly difficult, because it\'s hard to anticipate – much less articulate – the consequences of incremental bloat, and it takes serious soft skills to tell people (who may have been enthusiastically evangelising your tool up to that point) that their feature isn\'t important enough. But with an approach like Svelte\'s, many features can be added with absolutely no cost to people who don\'t use them, because the code that implements those features just doesn\'t get generated by the compiler if it\'s unnecessary.</p>\n<h2 id="we-re-just-getting-started">We\'re just getting started</h2>\n<p>Svelte is very new. There\'s a lot of work still left to do – creating build tool integrations, adding a server-side renderer, hot reloading, transitions, more documentation and examples, starter kits, and so on.</p>\n<p>But you can already build rich components with it, which is why we\'ve gone straight to a stable 1.0.0 release. <a href="https://v2.svelte.dev/guide" target="_blank" rel="noopener noreferrer">Read the guide</a>, <a href="/repl" rel="noopener noreferrer">try it out in the REPL</a>, and head over to <a href="https://github.com/sveltejs/svelte" target="_blank" rel="noopener noreferrer">GitHub</a> to help kickstart the next era of front end development.</p>',
					date: {
						pretty: "Sat Nov 26 2016",
						numeric: "2016-11-26",
					},
				},
			],
		},
		project: "svelte",
		type: "blog",
	},
	{
		content: {
			list: [
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
			],
			full: [
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
			],
		},
		project: "svelte",
		type: "examples",
	},
	{
		content: {
			list: [
				{
					title: "I'm new to Svelte. Where should I start?",
					slug: "im-new-to-svelte",
					file: "100-im-new-to-svelte.md",
				},
				{
					title: "Are there any video courses?",
					slug: "are-there-any-video-courses",
					file: "200-are-there-any-video-courses.md",
				},
				{
					title: "Are there any books?",
					slug: "are-there-any-books",
					file: "250-are-there-any-books.md",
				},
				{
					title: "How can I get VS Code to syntax-highlight my .svelte files?",
					slug: "how-can-i-get-syntax-highlighting",
					file: "400-how-can-i-get-syntax-highlighting.md",
				},
				{
					title: "How do I document my components?",
					slug: "how-do-i-document-my-components",
					file: "450-how-do-i-document-my-components.md",
				},
			],
			full: [
				{
					title: "I'm new to Svelte. Where should I start?",
					slug: "im-new-to-svelte",
					file: "100-im-new-to-svelte.md",
					content:
						'<p>We think the best way to get started is playing through the interactive <a href="tutorial" rel="noopener noreferrer">Tutorial</a>. Each step there is mainly focused on one specific aspect and is easy to follow. You\'ll be editing and running real Svelte components right in your browser.</p>\n<p>Five to ten minutes should be enough to get you up and running. An hour and a half should get you through the entire tutorial.</p>',
				},
				{
					title: "Are there any video courses?",
					slug: "are-there-any-video-courses",
					file: "200-are-there-any-video-courses.md",
					content:
						'<p>Rich Harris, the creator of Svelte, taught a course:</p>\n<ul>\n<li><a href="https://frontendmasters.com/courses/svelte/" target="_blank" rel="noopener noreferrer">Frontend Masters</a></li>\n</ul>\n<p>There are also a number of third-party courses:</p>\n<ul>\n<li><a href="https://egghead.io/browse/frameworks/svelte" target="_blank" rel="noopener noreferrer">Egghead</a></li>\n<li><a href="https://www.udemy.com/courses/search/?q=sveltejs+svelte" target="_blank" rel="noopener noreferrer">Udemy</a></li>\n</ul>\n<p>Note that Udemy very frequently has discounts over 90%.</p>',
				},
				{
					title: "Are there any books?",
					slug: "are-there-any-books",
					file: "250-are-there-any-books.md",
					content:
						'<p>There are a few books:</p>\n<ul>\n<li><a href="https://flaviocopes.com/page/download-svelte-handbook/" target="_blank" rel="noopener noreferrer">Svelte Handbook</a> by Flavio Copes</li>\n<li><a href="https://www.amazon.com/dp/B08D6T6BKS/" target="_blank" rel="noopener noreferrer">Svelte 3 Up and Running</a> by Alessandro Segala</li>\n<li><a href="https://www.manning.com/books/svelte-and-sapper-in-action" target="_blank" rel="noopener noreferrer">Svelte and Sapper in Action</a> by R. Mark Volkmann</li>\n</ul>',
				},
				{
					title: "How can I get VS Code to syntax-highlight my .svelte files?",
					slug: "how-can-i-get-syntax-highlighting",
					file: "400-how-can-i-get-syntax-highlighting.md",
					content:
						'<p>There is an <a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode" target="_blank" rel="noopener noreferrer">official VS Code extension for Svelte</a>.</p>',
				},
				{
					title: "How do I document my components?",
					slug: "how-do-i-document-my-components",
					file: "450-how-do-i-document-my-components.md",
					content:
						"<p>In editors which use the Svelte Language Server you can document Components, functions and exports using specially formatted comments.</p>\n<div class=\"code-block\"><pre class='language-undefined'><code>&lt;script&gt;\n\t/** What should we call the user? */\n\texport let name = 'world';\n&lt;/script&gt;\n\n&lt;!--\n@component\nHere's some documentation for this component.\nIt will show up on hover.\n\n- You can use markdown here.\n- You can also use code blocks here.\n- Usage:\n  ```tsx\n  &lt;main name=\"Arethra\"&gt;\n  ```\n--&gt;\n&lt;main&gt;\n\t&lt;h1&gt;\n\t\tHello, {name}\n\t&lt;/h1&gt;\n&lt;/main&gt;</code></pre></div>\n<p>Note: The <code>@component</code> is necessary in the HTML comment which describes your component.</p>",
				},
			],
		},
		project: "svelte",
		type: "faq",
	},
	{
		content: {
			list: [
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
			],
			full: [
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
			],
		},
		project: "svelte",
		type: "migrating",
	},
];
