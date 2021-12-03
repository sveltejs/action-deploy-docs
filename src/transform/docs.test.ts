import { suite } from "uvu";
import * as assert from "uvu/assert";

import { blog_in, blog_out_full, blog_out_list } from "./fixtures/blog";
import {
	docs_list_out,
	docs_full_out,
	docs_in,
	docs_readme_in,
	docs_readme_full_out,
	docs_readme_list_out,
} from "./fixtures/docs";
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
	transform_tutorial,
	transform,
} from "./docs";
import { faq_in, faq_out_full, faq_out_list } from "./fixtures/faq";
import {
	migrating_in,
	migrating_out_full,
	migrating_out_list,
} from "./fixtures/migrating";
import { everything } from "./fixtures/everything";

const _docs = suite("transform_docs");

_docs("transforms docs", async () => {
	const output = await transform_docs(docs_in, "svelte", "docs");
	assert.equal(output, { list: docs_list_out, full: docs_full_out });
});

_docs("transforms readme docs", async () => {
	const output = await transform_docs(
		docs_readme_in,
		"@sveltejs/adapter-vercel",
		"docs"
	);

	assert.equal(output, {
		list: docs_readme_list_out,
		full: docs_readme_full_out,
	});
});

_docs("transforms examples", async () => {
	const output = await transform_examples(examples_in);
	assert.equal(output, { list: examples_out_list, full: examples_out_full });
});

_docs("transforms tutorials", async () => {
	const output = await transform_tutorial(tutorials_in, "svelte");
	assert.equal(output, { list: tutorials_out_list, full: tutorials_out_full });
});

_docs("transforms blog", async () => {
	const output = await transform_blog(blog_in, "svelte", "blog");
	// console.log(output)

	
	
	assert.equal(output.full[0].content, blog_out_full[0].content);
	assert.equal(output, { list: blog_out_list, full: blog_out_full });
});

_docs("transforms faq", async () => {
	const output = await transform_faq(faq_in, "svelte", "faq");
	assert.equal(output, { list: faq_out_list, full: faq_out_full });
});

_docs("transforms migrating", async () => {
	const output = await transform_docs(migrating_in, "svelte", "migrating");
	assert.equal(output, { list: migrating_out_list, full: migrating_out_full });
});

_docs("transforms everything", async () => {
	const docs = {
		docs: docs_in,
		tutorial: tutorials_in,
		blog: blog_in,
		examples: examples_in,
		faq: faq_in,
		migrating: migrating_in,
	};
	const output = await transform(docs, "svelte");
	function lines(obj: object) {
		return JSON.stringify(obj, null, 2).split("\n");
	}

	assert.equal(lines(output), lines(everything));
});

_docs.run();
