import { suite } from "uvu";
import * as assert from "uvu/assert";

import unified from "unified";
import markdown from "remark-parse";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";
import vFile from "vfile";

import { highight_code_block } from "./highlight";
import { split_view } from "./split_view";

import u from "unist-builder";
import { custom_vfile } from "./types";

const { process } = unified()
	.use(markdown)
	.use(highight_code_block)
	.use(rehype, {
		allowDangerousHtml: true,

		handlers: {
			html: function html(h, node) {
				return h.dangerous
					? h.augment(
							node,
							u("raw", { data: node.data || {} }, node.value as string)
					  )
					: null;
			},
		},
	})
	.use(split_view)
	.use(stringify, { allowDangerousCharacters: true, allowDangerousHtml: true });

const split = suite("split_view");

split("wraps from hr to end of code block in split view markup", async () => {
	const src = `
### hello

___

this is more text

and this

\`\`\`js
console.log('boo')
\`\`\`
`;

	const output = await process(
		vFile<custom_vfile>({ contents: src, data: { docs_type: "docs" } })
	);

	assert.equal(
		output.contents,
		"<h3>hello</h3>\n" +
			'<div class="side-by-side"><div class="copy">\n' +
			"<p>this is more text</p>\n" +
			"<p>and this</p>\n" +
			`</div><div class="code"><div class="code-block"><pre class='language-javascript'><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'boo'</span><span class="token punctuation">)</span></code></pre></div></div></div>`
	);
});

split("works with other content present", async () => {
	const src = `
### hello

___

this is more text

and this

\`\`\`js
console.log('boo')
\`\`\`

## hello
`;

	const output = await process(
		vFile<custom_vfile>({ contents: src, data: { docs_type: "docs" } })
	);
	assert.equal(
		output.contents,
		"<h3>hello</h3>\n" +
			'<div class="side-by-side"><div class="copy">\n' +
			"<p>this is more text</p>\n" +
			"<p>and this</p>\n" +
			`</div><div class="code"><div class="code-block"><pre class='language-javascript'><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'boo'</span><span class="token punctuation">)</span></code></pre></div></div></div>\n` +
			"<h2>hello</h2>"
	);
});

split("ignore non-docs content", async () => {
	const src = `
### hello

___

this is more text

and this

\`\`\`js
console.log('boo')
\`\`\`

## hello
`;

	const output = await process(
		vFile<custom_vfile>({ contents: src, data: { docs_type: "blof" } })
	);
	assert.equal(
		output.contents,

		"<h3>hello</h3>\n" +
			"<hr>\n" +
			"<p>this is more text</p>\n" +
			"<p>and this</p>\n" +
			`<div class="code-block"><pre class='language-javascript'><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'boo'</span><span class="token punctuation">)</span></code></pre></div>\n` +
			"<h2>hello</h2>"
	);
});

split.run();
