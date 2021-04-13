import { suite } from "uvu";
import * as assert from "uvu/assert";

import { blog_in, blog_out_full, blog_out_list } from "./fixtures/blog";
import { docs_list_out, docs_full_out, docs_in } from "./fixtures/docs";
import {
	examples_in,
	examples_out_full,
	examples_out_list,
} from "./fixtures/examples";
import {
	tutorials_in,
	tutorials_out_list,
	tutorials_out_full,
} from "./fixtures/tutorials";

import {
	transform_blog,
	transform_docs,
	transform_examples,
	transform_faq,
	transform_tutorials,
} from "./docs";
import { faq_in, faq_out_full, faq_out_list } from "./fixtures/faq";

const _docs = suite("transform_docs");

_docs("transforms docs", async () => {
	const output = await transform_docs(docs_in, "svelte", "docs");
	assert.equal(output, { list: docs_list_out, full: docs_full_out });
});

_docs("transforms examples", async () => {
	const output = await transform_examples(examples_in);
	assert.equal(output, { list: examples_out_list, full: examples_out_full });
});

_docs("transforms examples", async () => {
	const output = await transform_tutorials(tutorials_in, "svelte");
	assert.equal(output, { list: tutorials_out_list, full: tutorials_out_full });
});

_docs("transforms blog", async () => {
	const output = await transform_blog(blog_in, "svelte", "blog");
	assert.equal(output, { list: blog_out_list, full: blog_out_full });
});

_docs("transforms blog", async () => {
	const output = await transform_faq(faq_in, "svelte", "faq");
	assert.equal(output, { list: faq_out_list, full: faq_out_full });
});

_docs.run();
