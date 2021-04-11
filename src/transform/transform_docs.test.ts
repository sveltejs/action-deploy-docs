import { suite } from "uvu";
import * as assert from "uvu/assert";

import { docs_list_out, docs_full_out, docs_in } from "./fixtures/docs";

import { transform_docs } from "./transform_docs";

const _docs = suite("transform_docs");

_docs("transforms docs", async () => {
	const output = await transform_docs(docs_in, "svelte", "docs", "other");
	assert.equal(output, { list: docs_list_out, full: docs_full_out });
});

_docs.run();
