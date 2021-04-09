import { suite } from "uvu";
import * as assert from "uvu/assert";

import { create_formatter } from "./format_api";

import api from "./fixtures/api-docs-markdown.js";
import api_output from "./fixtures/api-docs-html.js";

const format = suite("transform docs");

// format.skip("formats the api docs", () => {
// 	const output = format_api("./api-docs.md", api, "docs");

// 	assert.equal(output, api_output);
// });

// this is because we concat the api docs
// separate md files become a single html page
// duplicate slugs are bad

// format.skip("duplicate slugs should throw an error", () => {
// 	assert.throws(() => {
// 		format_api("./api-docs.md", api, "docs");
// 		format_api("./api-docs.md", api, "docs");
// 	}, /Duplicate slug Template_syntax/);
// });

format("formats", async () => {
	const formatter = create_formatter();
	const md = `### hello

This is some paragraph text

___

this is more text

and this

\`\`\`js
console.log('boo')
\`\`\`
	
`;
	const x = await formatter("boo.md", md, "svelte", "docs", "docs/boo");

	// console.log(x);
});

format.run();
