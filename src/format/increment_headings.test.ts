import { suite } from "uvu";
import * as assert from "uvu/assert";
import { Root, Text, Heading } from "mdast";

import unified from "unified";
import markdown from "remark-parse";
import frontmatter from "remark-frontmatter";

import { strip_h1, increment_headings } from "./increment_headings";

const strip_only = unified().use(markdown).use(frontmatter).use(strip_h1);
const increment_only = unified().use(markdown).use(increment_headings);

const strip = suite("strip_h1");
const inc = suite("increment_headings");

strip("strips leading level 1 headings", async () => {
	const src = `
	
	
# title

## second title
`;

	const AST = (await strip_only.run(strip_only.parse({ contents: src }), {
		data: { type: "readme" },
	})) as Root;

	assert.equal(AST.children[0].depth, 2);
	assert.equal((AST.children[0] as Heading).children[0].value, "second title");
});

strip("ignores other types of heading", async () => {
	const src = `## second title
`;

	const AST = (await strip_only.run(strip_only.parse({ contents: src }), {
		data: { type: "readme" },
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
		data: { type: "readme" },
	})) as Root;

	assert.equal(AST.children[1], undefined);
});

inc("increments headings by 1", async () => {
	const src = `## second title
`;

	const AST = (await increment_only.run(
		increment_only.parse({ contents: src }),
		{
			data: { type: "readme" },
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
			data: { type: "readme" },
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
			data: { type: "readme" },
		})) as Root;
		assert.unreachable();
	} catch (e) {
		assert.equal(
			e.message,
			"Headings above level 5 are not allowed. Readme headings are automatically incremented by 1."
		);
	}
});

strip.run();
inc.run();
