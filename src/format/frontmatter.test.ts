import { suite } from "uvu";
import * as assert from "uvu/assert";

import { parse_frontmatter } from "./frontmatter";

import unified from "unified";
import markdown from "remark-parse";
import extract_frontmatter from "remark-frontmatter";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";

const processor = unified()
	.use(markdown)
	.use(extract_frontmatter)
	.use(parse_frontmatter)
	.use(rehype)
	.use(stringify);

const frontmatter = suite("extract-frontmatter");

frontmatter("extracts and parses yaml metadata from frontmatter", async () => {
	const src = `---
  name: one
  secondname: two
---

# hello

---

	`;

	const output = await processor.process(src);

	assert.equal((output.data as any).frontmatter, {
		name: "one",
		secondname: "two",
	});
	assert.equal(output.contents, "<h1>hello</h1>\n<hr>");
});

frontmatter("extracts and parses yaml metadata from frontmatter", async () => {
	const src = `---
names:
  - 1
  - 2
  - 3  
secondname: 
  hello: friend
  goodbye: friend
---

# hello

---

	`;

	const output = await processor.process(src);

	assert.equal((output.data as any).frontmatter, {
		names: [1, 2, 3],
		secondname: { hello: "friend", goodbye: "friend" },
	});
	assert.equal(output.contents, "<h1>hello</h1>\n<hr>");
});

frontmatter.run();
