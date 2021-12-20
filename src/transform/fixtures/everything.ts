import { blog_out_full, blog_out_list } from "./blog";
import { docs_full_out, docs_list_out } from "./docs";
import { examples_out_full, examples_out_list } from "./examples";
import { faq_out_full, faq_out_list } from "./faq";
import { migrating_out_full, migrating_out_list } from "./migrating";
import { tutorials_out_list, tutorials_out_full } from "./tutorials";

// @ts-nocheck
export const everything = [
	{
		content: {
			list: docs_list_out,
			full: docs_full_out,
		},
		project: "svelte",
		type: "docs",
	},
	{
		content: {
			list: tutorials_out_list,
			full: tutorials_out_full,
		},
		project: "svelte",
		type: "tutorial",
	},
	{
		content: {
			list: blog_out_list,
			full: blog_out_full,
		},
		project: "svelte",
		type: "blog",
	},
	{
		content: {
			list: examples_out_list,
			full: examples_out_full,
		},
		project: "svelte",
		type: "examples",
	},
	{
		content: {
			list: faq_out_list,
			full: faq_out_full,
		},
		project: "svelte",
		type: "faq",
	},
	{
		content: {
			list: migrating_out_list,
			full: migrating_out_full,
		},
		project: "svelte",
		type: "migrating",
	},
];
