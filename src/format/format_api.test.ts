import { suite } from "uvu";
import * as assert from "uvu/assert";

import { format_api } from "./format_api";

import api from "./fixtures/api-docs-markdown.js";
import api_output from "./fixtures/api-docs-html.js";

const format = suite("transform docs");

format("formats the api docs", () => {
	const output = format_api("./api-docs.md", api);

	assert.equal(output, api_output);
});

// this is because we concat the api docs
// separate md files become a single html page
// duplicate slugs are bad

format("duplicate slugs should throw an error", () => {
	assert.throws(() => {
		format_api("./api-docs.md", api);
		format_api("./api-docs.md", api);
	}, /Duplicate slug Template_syntax/);
});

format.run();
