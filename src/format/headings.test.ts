import { Root, Heading } from "mdast";

import { suite } from "uvu";
import * as assert from "uvu/assert";

import unified from "unified";
import markdown from "remark-parse";
import extract_frontmatter from "remark-frontmatter";
import frontmatter from "remark-frontmatter";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";
import vFile from "vfile";

import {
	linkify_headings,
	strip_h1,
	increment_headings,
	validate_headings,
} from "./headings";

const { process: linkify_only } = unified()
	.use(markdown)
	.use(extract_frontmatter)
	.use(linkify_headings)
	.use(rehype)
	.use(stringify);

const strip_only = unified().use(markdown).use(frontmatter).use(strip_h1);
const increment_only = unified().use(markdown).use(increment_headings);

const _headings = suite("headings");
const strip = suite("strip_h1");
const inc = suite("increment_headings");

_headings("transforms and formats headings", async () => {
	const sections: unknown[] = [];
	const src = vFile({
		contents: `### hello`,
		data: {
			dir: "blog",
			docs_type: "docs",
			sections,
			section_stack: [sections],
			section_title: "section",
			base_level: 3,
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await linkify_only(src);

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
			docs_type: "blog",
			sections,
			section_stack: [sections],
			section_title: "section",
			base_level: 3,
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await linkify_only(src);

	assert.equal(
		output.contents,
		`<h3><span id="subsection" class="offset-anchor"></span><a href="blog#subsection" class="anchor" aria-hidden></a>subsection</h3>
<h4><span id="subsection-subsubsection" class="offset-anchor"></span><a href="blog#subsection-subsubsection" class="anchor" aria-hidden></a>subsubsection</h4>`
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
			docs_type: "blog",
			sections,
			section_stack: [sections],
			section_title: "section",
			base_level: 3,
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await linkify_only(src);

	assert.equal(
		output.contents,
		`<h3><span id="subsection" class="offset-anchor"></span><a href="blog#subsection" class="anchor" aria-hidden></a>subsection</h3>
<h4><span id="subsection-subsubsection" class="offset-anchor"></span><a href="blog#subsection-subsubsection" class="anchor" aria-hidden></a>subsubsection</h4>
<h5><span id="subsection-subsubsection-subsubsubsection" class="offset-anchor" data-scrollignore></span><a href="blog#subsection-subsubsection-subsubsubsection" class="anchor" aria-hidden></a>subsubsubsection</h5>`
	);
});

_headings("transforms and formats multi-level headings", async () => {
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
			docs_type: "blog",
			sections,
			section_stack: [sections],
			section_title: "section",
			base_level: 3,
			prev_level: 3,
			slugs: [],
			seen_slugs: new Map(),
		},
	});

	const output = await linkify_only(src);

	assert.equal(
		output.contents,
		`<h3><span id="subsection" class="offset-anchor"></span><a href="blog#subsection" class="anchor" aria-hidden></a>subsection</h3>
<h4><span id="subsection-subsubsection" class="offset-anchor"></span><a href="blog#subsection-subsubsection" class="anchor" aria-hidden></a>subsubsection</h4>
<h5><span id="subsection-subsubsection-subsubsubsection" class="offset-anchor" data-scrollignore></span><a href="blog#subsection-subsubsection-subsubsubsection" class="anchor" aria-hidden></a>subsubsubsection</h5>
<h3><span id="one" class="offset-anchor"></span><a href="blog#one" class="anchor" aria-hidden></a>one</h3>
<h4><span id="one-two" class="offset-anchor"></span><a href="blog#one-two" class="anchor" aria-hidden></a>two</h4>
<h5><span id="one-two-three" class="offset-anchor" data-scrollignore></span><a href="blog#one-two-three" class="anchor" aria-hidden></a>three</h5>
<h4><span id="one-four" class="offset-anchor"></span><a href="blog#one-four" class="anchor" aria-hidden></a>four</h4>`
	);
});

_headings(
	"transforms and formats multi-level headings: level 2 headings",
	async () => {
		const sections: unknown[] = [];
		const src = vFile({
			contents: `## subsection

### subsubsection

#### subsubsubsection

## one

### two

#### three

### four

`,
			data: {
				dir: "blog",
				docs_type: "blog",
				sections,
				section_stack: [sections],
				section_title: "section",
				base_level: 2,
				prev_level: 2,
				slugs: [],
				seen_slugs: new Map(),
			},
		});

		const output = await linkify_only(src);

		assert.equal(
			output.contents,
			`<h2><span id="subsection" class="offset-anchor"></span><a href="blog#subsection" class="anchor" aria-hidden></a>subsection</h2>
<h3><span id="subsection-subsubsection" class="offset-anchor"></span><a href="blog#subsection-subsubsection" class="anchor" aria-hidden></a>subsubsection</h3>
<h4><span id="subsection-subsubsection-subsubsubsection" class="offset-anchor" data-scrollignore></span><a href="blog#subsection-subsubsection-subsubsubsection" class="anchor" aria-hidden></a>subsubsubsection</h4>
<h2><span id="one" class="offset-anchor"></span><a href="blog#one" class="anchor" aria-hidden></a>one</h2>
<h3><span id="one-two" class="offset-anchor"></span><a href="blog#one-two" class="anchor" aria-hidden></a>two</h3>
<h4><span id="one-two-three" class="offset-anchor" data-scrollignore></span><a href="blog#one-two-three" class="anchor" aria-hidden></a>three</h4>
<h3><span id="one-four" class="offset-anchor"></span><a href="blog#one-four" class="anchor" aria-hidden></a>four</h3>`
		);
	}
);

_headings(
	"transforms and formats multi-level headings: level 2 headings",
	async () => {
		const sections: unknown[] = [];
		const src = vFile({
			contents: `### script

#### one

##### two

### style
`,
			data: {
				dir: "docs",
				docs_type: "docs",
				sections,
				section_stack: [sections],
				section_title: "component format",
				base_level: 3,
				prev_level: 3,
				slugs: [],
				seen_slugs: new Map(),
			},
		});

		const output = await linkify_only(src);

		assert.equal(
			output.contents,
			`<h3><span id="component-format-script" class="offset-anchor"></span><a href="docs#component-format-script" class="anchor" aria-hidden></a>script</h3>
<h4><span id="component-format-script-one" class="offset-anchor"></span><a href="docs#component-format-script-one" class="anchor" aria-hidden></a>one</h4>
<h5><span id="component-format-script-one-two" class="offset-anchor" data-scrollignore></span><a href="docs#component-format-script-one-two" class="anchor" aria-hidden></a>two</h5>
<h3><span id="component-format-style" class="offset-anchor"></span><a href="docs#component-format-style" class="anchor" aria-hidden></a>style</h3>`
		);

		//@ts-ignore
		assert.equal(output.data.sections, [
			{
				slug: "component-format-script",
				title: "script",
				sections: [
					{
						slug: "component-format-script-one",
						title: "one",
						sections: [
							{
								slug: "component-format-script-one-two",
								title: "two",
								sections: [],
							},
						],
					},
				],
			},
			{ slug: "component-format-style", title: "style", sections: [] },
		]);
	}
);

strip("strips leading level 1 headings", async () => {
	const src = `
	
	
# title

## second title
`;

	const AST = (await strip_only.run(strip_only.parse({ contents: src }), {
		data: { file_type: "readme" },
	})) as Root;

	assert.equal(AST.children[0].depth, 2);
	assert.equal((AST.children[0] as Heading).children[0].value, "second title");
});

strip("ignores other types of heading", async () => {
	const src = `## second title
`;

	const AST = (await strip_only.run(strip_only.parse({ contents: src }), {
		data: { file_type: "readme" },
	})) as Root;

	assert.equal(AST.children[0].depth, 2);
	assert.equal((AST.children[0] as Heading).children[0].value, "second title");
});

strip("ignores non-markdown leading nodes", async () => {
	const src = `---
thing: thing
---

# second title
`;

	const AST = (await strip_only.run(strip_only.parse({ contents: src }), {
		data: { file_type: "readme" },
	})) as Root;

	assert.equal(AST.children[1], undefined);
});

strip("ignores non-readme types", async () => {
	const src = `# title
`;

	const AST = (await strip_only.run(strip_only.parse({ contents: src }), {
		data: { file_type: "other" },
	})) as Root;

	assert.equal(AST.children[0].depth, 1);
	assert.equal((AST.children[0] as Heading).children[0].value, "title");
});

inc("increments headings by 1", async () => {
	const src = `## second title
`;

	const AST = (await increment_only.run(
		increment_only.parse({ contents: src }),
		{
			data: { file_type: "readme" },
		}
	)) as Root;

	assert.equal(AST.children[0].depth, 3);
});

inc("increments headings by 1", async () => {
	const src = `## second title

## second title

### second title

### second title

#### second title
`;

	const AST = (await increment_only.run(
		increment_only.parse({ contents: src }),
		{
			data: { file_type: "readme" },
		}
	)) as Root;

	assert.equal(AST.children[0].depth, 3);
	assert.equal(AST.children[1].depth, 3);
	assert.equal(AST.children[2].depth, 4);
	assert.equal(AST.children[3].depth, 4);
	assert.equal(AST.children[4].depth, 5);
});

inc("throws an error if a heading becomes level 6", async () => {
	const src = `##### second title
`;

	try {
		(await increment_only.run(increment_only.parse({ contents: src }), {
			data: { file_type: "readme" },
		})) as Root;
		assert.unreachable();
	} catch (e) {
		assert.equal(
			e.message,
			"Headings above level 5 are not allowed. Readme headings are automatically incremented by 1."
		);
	}
});

inc("ignores non-readme types", async () => {
	const src = `## second title`;

	const AST = (await increment_only.run(
		increment_only.parse({ contents: src }),
		{
			data: { file_type: "boop" },
		}
	)) as Root;

	assert.equal(AST.children[0].depth, 2);
});

strip.run();
inc.run();
_headings.run();
