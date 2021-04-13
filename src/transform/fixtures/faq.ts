export const faq_in = [
	{
		name: "100-im-new-to-svelte.md",
		content:
			"---\nquestion: I'm new to Svelte. Where should I start?\n---\n\nWe think the best way to get started is playing through the interactive [Tutorial](tutorial). Each step there is mainly focused on one specific aspect and is easy to follow. You'll be editing and running real Svelte components right in your browser.\n\nFive to ten minutes should be enough to get you up and running. An hour and a half should get you through the entire tutorial.",
	},
	{
		name: "200-are-there-any-video-courses.md",
		content:
			"---\nquestion: Are there any video courses?\n---\n\nRich Harris, the creator of Svelte, taught a course:\n\n- [Frontend Masters](https://frontendmasters.com/courses/svelte/)\n\nThere are also a number of third-party courses:\n\n- [Egghead](https://egghead.io/browse/frameworks/svelte)\n- [Udemy](https://www.udemy.com/courses/search/?q=sveltejs+svelte)\n\nNote that Udemy very frequently has discounts over 90%.\n",
	},
	{
		name: "250-are-there-any-books.md",
		content:
			"---\nquestion: Are there any books?\n---\n\nThere are a few books:\n\n- [Svelte Handbook](https://flaviocopes.com/page/download-svelte-handbook/) by Flavio Copes\n- [Svelte 3 Up and Running](https://www.amazon.com/dp/B08D6T6BKS/) by Alessandro Segala\n- [Svelte and Sapper in Action](https://www.manning.com/books/svelte-and-sapper-in-action) by R. Mark Volkmann\n",
	},
	{
		name: "400-how-can-i-get-syntax-highlighting.md",
		content:
			"---\nquestion: How can I get VS Code to syntax-highlight my .svelte files?\n---\n\nThere is an [official VS Code extension for Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).\n",
	},
	{
		name: "450-how-do-i-document-my-components.md",
		content:
			"---\nquestion: How do I document my components?\n---\n\nIn editors which use the Svelte Language Server you can document Components, functions and exports using specially formatted comments.\n\n````svelte\n<script>\n\t/** What should we call the user? */\n\texport let name = 'world';\n</script>\n\n<!--\n@component\nHere's some documentation for this component.\nIt will show up on hover.\n\n- You can use markdown here.\n- You can also use code blocks here.\n- Usage:\n  ```tsx\n  <main name=\"Arethra\">\n  ```\n-->\n<main>\n\t<h1>\n\t\tHello, {name}\n\t</h1>\n</main>\n````\n\nNote: The `@component` is necessary in the HTML comment which describes your component.\n",
	},
];

export const faq_out_full = [
	{
		title: "I'm new to Svelte. Where should I start?",
		slug: "im-new-to-svelte",
		file: "100-im-new-to-svelte.md",
		content:
			'<p>We think the best way to get started is playing through the interactive <a href="tutorial" rel="noopener noreferrer">Tutorial</a>. Each step there is mainly focused on one specific aspect and is easy to follow. You\'ll be editing and running real Svelte components right in your browser.</p>\n<p>Five to ten minutes should be enough to get you up and running. An hour and a half should get you through the entire tutorial.</p>',
		order: 100,
	},
	{
		title: "Are there any video courses?",
		slug: "are-there-any-video-courses",
		file: "200-are-there-any-video-courses.md",
		content:
			'<p>Rich Harris, the creator of Svelte, taught a course:</p>\n<ul>\n<li><a href="https://frontendmasters.com/courses/svelte/" target="_blank" rel="noopener noreferrer">Frontend Masters</a></li>\n</ul>\n<p>There are also a number of third-party courses:</p>\n<ul>\n<li><a href="https://egghead.io/browse/frameworks/svelte" target="_blank" rel="noopener noreferrer">Egghead</a></li>\n<li><a href="https://www.udemy.com/courses/search/?q=sveltejs+svelte" target="_blank" rel="noopener noreferrer">Udemy</a></li>\n</ul>\n<p>Note that Udemy very frequently has discounts over 90%.</p>',
		order: 200,
	},
	{
		title: "Are there any books?",
		slug: "are-there-any-books",
		file: "250-are-there-any-books.md",
		content:
			'<p>There are a few books:</p>\n<ul>\n<li><a href="https://flaviocopes.com/page/download-svelte-handbook/" target="_blank" rel="noopener noreferrer">Svelte Handbook</a> by Flavio Copes</li>\n<li><a href="https://www.amazon.com/dp/B08D6T6BKS/" target="_blank" rel="noopener noreferrer">Svelte 3 Up and Running</a> by Alessandro Segala</li>\n<li><a href="https://www.manning.com/books/svelte-and-sapper-in-action" target="_blank" rel="noopener noreferrer">Svelte and Sapper in Action</a> by R. Mark Volkmann</li>\n</ul>',
		order: 250,
	},
	{
		title: "How can I get VS Code to syntax-highlight my .svelte files?",
		slug: "how-can-i-get-syntax-highlighting",
		file: "400-how-can-i-get-syntax-highlighting.md",
		content:
			'<p>There is an <a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode" target="_blank" rel="noopener noreferrer">official VS Code extension for Svelte</a>.</p>',
		order: 400,
	},
	{
		title: "How do I document my components?",
		slug: "how-do-i-document-my-components",
		file: "450-how-do-i-document-my-components.md",
		content:
			"<p>In editors which use the Svelte Language Server you can document Components, functions and exports using specially formatted comments.</p>\n<div class=\"code-block\"><pre class='language-undefined'><code>&lt;script&gt;\n\t/** What should we call the user? */\n\texport let name = 'world';\n&lt;/script&gt;\n\n&lt;!--\n@component\nHere's some documentation for this component.\nIt will show up on hover.\n\n- You can use markdown here.\n- You can also use code blocks here.\n- Usage:\n  ```tsx\n  &lt;main name=\"Arethra\"&gt;\n  ```\n--&gt;\n&lt;main&gt;\n\t&lt;h1&gt;\n\t\tHello, {name}\n\t&lt;/h1&gt;\n&lt;/main&gt;</code></pre></div>\n<p>Note: The <code>@component</code> is necessary in the HTML comment which describes your component.</p>",
		order: 450,
	},
];

export const faq_out_list = [
	{
		title: "I'm new to Svelte. Where should I start?",
		slug: "im-new-to-svelte",
		file: "100-im-new-to-svelte.md",
		order: 100,
	},
	{
		title: "Are there any video courses?",
		slug: "are-there-any-video-courses",
		file: "200-are-there-any-video-courses.md",
		order: 200,
	},
	{
		title: "Are there any books?",
		slug: "are-there-any-books",
		file: "250-are-there-any-books.md",
		order: 250,
	},
	{
		title: "How can I get VS Code to syntax-highlight my .svelte files?",
		slug: "how-can-i-get-syntax-highlighting",
		file: "400-how-can-i-get-syntax-highlighting.md",
		order: 400,
	},
	{
		title: "How do I document my components?",
		slug: "how-do-i-document-my-components",
		file: "450-how-do-i-document-my-components.md",
		order: 450,
	},
];
