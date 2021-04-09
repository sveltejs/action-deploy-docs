import { suite } from "uvu";
import * as assert from "uvu/assert";

import unified from "unified";
import markdown from "remark-parse";
import extract_frontmatter from "remark-frontmatter";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";
import vFile from "vfile";

import { headings } from "./headings";

const { process } = unified()
	.use(markdown)
	.use(extract_frontmatter)
	.use(headings)
	.use(rehype)
	// .use(() => (tree) => console.log(JSON.stringify(tree, null, 2)))
	.use(stringify);

const _headings = suite("headings");

_headings("transforms and formats headings", async () => {
	const sections: unknown[] = [];
	const src = vFile({
		contents: `### hello`,
		data: {
			dir: "blog",
			sections,
			section_stack: [sections],
			section_title: "section",
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await process(src);

	assert.equal(
		output.contents,
		`<h3><span id="section-hello" class="offset-anchor"></span><a href="blog#section-hello" class="anchor" aria-hidden></a>hello</h3>`
	);
});

_headings("transforms and formats multi-level headings", async () => {
	const sections: unknown[] = [];
	const src = vFile({
		contents: `### subsection

#### subsubsection
`,
		data: {
			dir: "blog",
			sections,
			section_stack: [sections],
			section_title: "section",
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await process(src);

	assert.equal(
		output.contents,
		`<h3><span id="section-subsection" class="offset-anchor"></span><a href="blog#section-subsection" class="anchor" aria-hidden></a>subsection</h3>
<h4><span id="section-subsection-subsubsection" class="offset-anchor"></span><a href="blog#section-subsection-subsubsection" class="anchor" aria-hidden></a>subsubsection</h4>`
	);
});

_headings("transforms and formats multi-level headings", async () => {
	const sections: unknown[] = [];
	const src = vFile({
		contents: `### subsection

#### subsubsection

##### subsubsubsection

`,
		data: {
			dir: "blog",
			sections,
			section_stack: [sections],
			section_title: "section",
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await process(src);

	assert.equal(
		output.contents,
		`<h3><span id="section-subsection-1" class="offset-anchor"></span><a href="blog#section-subsection-1" class="anchor" aria-hidden></a>subsection</h3>
<h4><span id="section-subsection-1-subsubsection" class="offset-anchor"></span><a href="blog#section-subsection-1-subsubsection" class="anchor" aria-hidden></a>subsubsection</h4>
<h5><span id="section-subsection-1-subsubsection-subsubsubsection" class="offset-anchor" data-scrollignore></span><a href="blog#section-subsection-1-subsubsection-subsubsubsection" class="anchor" aria-hidden></a>subsubsubsection</h5>`
	);
});

_headings.only("transforms and formats multi-level headings", async () => {
	const sections: unknown[] = [];
	const src = vFile({
		contents: `### subsection

#### subsubsection

##### subsubsubsection

### one

#### two

##### three

#### four

`,
		data: {
			dir: "blog",
			sections,
			section_stack: [sections],
			section_title: "section",
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await process(src);

	assert.equal(
		output.contents,
		`<h3><span id="section-subsection" class="offset-anchor"></span><a href="blog#section-subsection" class="anchor" aria-hidden></a>subsection</h3>
<h4><span id="section-subsection-subsubsection" class="offset-anchor"></span><a href="blog#section-subsection-subsubsection" class="anchor" aria-hidden></a>subsubsection</h4>
<h5><span id="section-subsection-subsubsection-subsubsubsection" class="offset-anchor" data-scrollignore></span><a href="blog#section-subsection-subsubsection-subsubsubsection" class="anchor" aria-hidden></a>subsubsubsection</h5>
<h3><span id="section-one" class="offset-anchor"></span><a href="blog#section-one" class="anchor" aria-hidden></a>one</h3>
<h4><span id="section-one-two" class="offset-anchor"></span><a href="blog#section-one-two" class="anchor" aria-hidden></a>two</h4>
<h5><span id="section-one-two-three" class="offset-anchor" data-scrollignore></span><a href="blog#section-one-two-three" class="anchor" aria-hidden></a>three</h5>
<h4><span id="section-one-four" class="offset-anchor"></span><a href="blog#section-one-four" class="anchor" aria-hidden></a>four</h4>`
	);
});

_headings.run();
