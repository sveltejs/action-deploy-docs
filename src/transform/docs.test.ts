import { suite } from "uvu";
import * as assert from "uvu/assert";

import { docs_list_out, docs_full_out, docs_in } from "./fixtures/docs";
import {
	examples_in,
	examples_out_full,
	examples_out_list,
} from "./fixtures/examples";

import { transform_docs, transform_examples } from "./docs";

const _docs = suite("transform_docs");

_docs("transforms docs", async () => {
	const output = await transform_docs(docs_in, "svelte", "docs");
	assert.equal(output, { list: docs_list_out, full: docs_full_out });
});

_docs("transforms examples", async () => {
	const output = await transform_examples(examples_in);
	assert.equal(output, { list: examples_out_list, full: examples_out_full });
});

_docs.run();
