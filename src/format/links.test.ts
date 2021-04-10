import { suite } from "uvu";
import * as assert from "uvu/assert";

import { Root, Paragraph } from "mdast";
import unified from "unified";
import markdown from "remark-parse";

import { set_link_attributes } from "./links";

const processor = unified().use(markdown).use(set_link_attributes);

const _links = suite("links");

_links("renders link", async () => {
	const src = `[a link](/local/path/to/file)`;
	const output = (await processor.run(processor.parse(src))) as Root;

	assert.is((output.children[0] as Paragraph).children[0].type, "html");
	assert.is(
		(output.children[0] as Paragraph).children[0].value,
		'<a href="/local/path/to/file" rel="noopener noreferrer">a link</a>'
	);
});

_links("renders link with title attribute", async () => {
	const src = `[a link](/local/path/to/file "about my link")`;
	const output = (await processor.run(processor.parse(src))) as Root;

	assert.is(
		(output.children[0] as Paragraph).children[0].value,
		'<a href="/local/path/to/file" title="about my link" rel="noopener noreferrer">a link</a>'
	);
});

_links("renders external links with target _blank: no title", async () => {
	const src = `[a link](https://google.com)`;
	const output = (await processor.run(processor.parse(src))) as Root;

	assert.is(
		(output.children[0] as Paragraph).children[0].value,
		'<a href="https://google.com" target="_blank" rel="noopener noreferrer">a link</a>'
	);
});

_links("renders external links with target _blank: no title", async () => {
	const src = `[a link](https://google.com "a search engine")`;
	const output = (await processor.run(processor.parse(src))) as Root;

	assert.is(
		(output.children[0] as Paragraph).children[0].value,
		'<a href="https://google.com" target="_blank" title="a search engine" rel="noopener noreferrer">a link</a>'
	);
});

_links.run();
