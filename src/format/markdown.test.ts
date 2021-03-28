import { suite } from "uvu";
import * as assert from "uvu/assert";

import { RE_FRONTMATTER, extract_frontmatter } from "./markdown";

const regex = suite("frontmatter-regex");
const frontmatter = suite("extract-frontmatter");

regex("matches frontmatter correctly", () => {
	const frontmatter = `---
name: one
secondname: two
---`;

	assert.ok(RE_FRONTMATTER.test(frontmatter));
});

regex("does not match incorrect frontmatter", () => {
	const frontmatter = `---
name: one
secondname: two
`;

	assert.not(RE_FRONTMATTER.test(frontmatter));
});

regex("capturing group correctly extracts the yaml within", () => {
	const frontmatter = `---
name: one
secondname: two
---`;

	const [, $1] = RE_FRONTMATTER.exec(frontmatter);

	assert.is($1, "name: one\nsecondname: two");
});

regex("only captures the frontmatter ignoring hr syntax", () => {
	const frontmatter = `---
name: one
secondname: two
---

# hello

---

a paragraph.
`;

	const [, $1] = RE_FRONTMATTER.exec(frontmatter);

	assert.is($1, "name: one\nsecondname: two");
});

frontmatter("extracts and parses yaml metadata from frontmatter", () => {
	const frontmatter = `---
	name: one
	secondname: two
---

# hello

---

a paragraph.
	`;

	const output = extract_frontmatter(frontmatter);
	assert.equal(output, {
		metadata: { name: "one", secondname: "two" },
		content: "\n\n# hello\n\n---\n\na paragraph.\n\t",
	});
});

regex.run();
frontmatter.run();
