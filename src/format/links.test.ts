import { suite } from "uvu";
import * as assert from "uvu/assert";

import { Root, Paragraph } from "mdast";
import unified from "unified";
import markdown from "remark-parse";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";

import { set_link_attributes } from "./links";

const { process } = unified()
	.use(markdown)
	.use(rehype)
	.use(set_link_attributes)
	.use(stringify);

const _links = suite("links");

_links("renders link", async () => {
	const src = `[a link](/local/path/to/file)`;
	const output = await process(src);

	assert.is(
		output.contents,
		'<p><a href="/local/path/to/file" rel="noopener noreferrer">a link</a></p>'
	);
});

_links("renders link with title attribute", async () => {
	const src = `[a link](/local/path/to/file "about my link")`;
	const output = await process(src);

	assert.is(
		output.contents,
		'<p><a href="/local/path/to/file" title="about my link" rel="noopener noreferrer">a link</a></p>'
	);
});

_links("renders external links with target _blank: no title", async () => {
	const src = `[a link](https://google.com)`;
	const output = await process(src);

	assert.is(
		output.contents,
		'<p><a href="https://google.com" target="_blank" rel="noopener noreferrer">a link</a></p>'
	);
});

_links("renders external links with target _blank: title", async () => {
	const src = `[a link](https://google.com "a search engine")`;
	const output = await process(src);

	assert.is(
		output.contents,
		'<p><a href="https://google.com" title="a search engine" target="_blank" rel="noopener noreferrer">a link</a></p>'
	);
});

_links("renders links containing multiple child nodes", async () => {
	const src =
		"[CommonJS packages in `noExternal`](https://github.com/vitejs/vite/issues/2579)";
	const output = await process(src);

	assert.is(
		output.contents,
		'<p><a href="https://github.com/vitejs/vite/issues/2579" target="_blank" rel="noopener noreferrer">CommonJS packages in <code>noExternal</code></a></p>'
	);
});

_links.run();
