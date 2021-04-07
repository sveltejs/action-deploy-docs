// import { suite } from "uvu";
// import * as assert from "uvu/assert";

// import { RE_FRONTMATTER, extract_frontmatter, link_renderer } from "./markdown";

// const regex = suite("frontmatter-regex");
// const frontmatter = suite("extract-frontmatter");
// const renderer = suite("link-renderer");

// regex("matches frontmatter correctly", () => {
// 	const frontmatter = `---
// name: one
// secondname: two
// ---`;

// 	assert.ok(RE_FRONTMATTER.test(frontmatter));
// });

// regex("does not match incorrect frontmatter", () => {
// 	const frontmatter = `---
// name: one
// secondname: two
// `;

// 	assert.not(RE_FRONTMATTER.test(frontmatter));
// });

// regex("capturing group correctly extracts the yaml within", () => {
// 	const frontmatter = `---
// name: one
// secondname: two
// ---`;

// 	const [, $1] = RE_FRONTMATTER.exec(frontmatter);

// 	assert.is($1, "name: one\nsecondname: two");
// });

// regex("only captures the frontmatter ignoring hr syntax", () => {
// 	const frontmatter = `---
// name: one
// secondname: two
// ---

// # hello

// ---

// a paragraph.
// `;

// 	const [, $1] = RE_FRONTMATTER.exec(frontmatter);

// 	assert.is($1, "name: one\nsecondname: two");
// });

// frontmatter("extracts and parses yaml metadata from frontmatter", () => {
// 	const frontmatter = `---
// 	name: one
// 	secondname: two
// ---

// # hello

// ---

// a paragraph.
// 	`;

// 	const output = extract_frontmatter(frontmatter);
// 	assert.equal(output, {
// 		metadata: { name: "one", secondname: "two" },
// 		content: "\n\n# hello\n\n---\n\na paragraph.\n\t",
// 	});
// });

// renderer("renders link", () => {
// 	const output = link_renderer("/local/path/to/file", null, "a link");

// 	assert.is(
// 		output,
// 		'<a href="/local/path/to/file" rel="noopener noreferrer">a link</a>'
// 	);
// });

// renderer("renders link with title attribute", () => {
// 	const output = link_renderer(
// 		"/local/path/to/file",
// 		"about my link",
// 		"a link"
// 	);

// 	assert.is(
// 		output,
// 		'<a href="/local/path/to/file" title="about my link" rel="noopener noreferrer">a link</a>'
// 	);
// });

// renderer("renders external links with target _blank: no title", () => {
// 	const output = link_renderer("https://google.com", null, "a link");

// 	assert.is(
// 		output,
// 		'<a href="https://google.com" target="_blank" rel="noopener noreferrer">a link</a>'
// 	);
// });

// renderer("renders external links with target _blank: no title", () => {
// 	const output = link_renderer(
// 		"https://google.com",
// 		"a search engine",
// 		"a link"
// 	);

// 	assert.is(
// 		output,
// 		'<a href="https://google.com" target="_blank" title="a search engine" rel="noopener noreferrer">a link</a>'
// 	);
// });

// regex.run();
// frontmatter.run();
// renderer.run();
