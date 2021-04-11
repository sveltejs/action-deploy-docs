import { suite } from "uvu";
import * as assert from "uvu/assert";
import {
	base,
	cf_full,
	cf_contents_keyby_slug,
	cf_contents_keyby_file,
	cf_list,
	cf_full_next,
	cf_contents_keyby_slug_next,
	cf_list_next,
} from "./fixtures/cloudflare";

import { transform_cloudflare } from "./cloudflare";

const cf_transform = suite("transform_cloudflare");

cf_transform("transforms docs", () => {
	const transformed = transform_cloudflare(base, {
		project: "svelte",
		type: "docs",
		keyby: "slug",
	});

	assert.equal(
		transformed[0],
		[cf_full, ...cf_contents_keyby_slug, cf_list][0],
		"full content correctly transformed"
	);
	assert.equal(
		transformed[1],
		[cf_full, ...cf_contents_keyby_slug, cf_list][1],
		"individual content items correctly transformed"
	);
	assert.equal(
		transformed[transformed.length - 1],
		[cf_full, ...cf_contents_keyby_slug, cf_list][transformed.length - 1],
		"list content correctly transformed"
	);

	assert.equal(
		transformed,
		[cf_full, ...cf_contents_keyby_slug, cf_list],
		"list content correctly transformed"
	);
});

cf_transform("individual listings can be keyed by any property", () => {
	const transformed = transform_cloudflare(base, {
		project: "svelte",
		type: "docs",
		keyby: "file",
	});

	assert.equal(transformed, [cf_full, ...cf_contents_keyby_file, cf_list]);
});

cf_transform("individual listings can be keyed by any object property", () => {
	const transformed = transform_cloudflare(base, {
		project: "svelte",
		type: "docs",
		keyby: "slug",
		version: "next",
	});

	assert.equal(
		transformed,
		[cf_full_next, ...cf_contents_keyby_slug_next, cf_list_next],
		"list content correctly transformed"
	);
});

cf_transform.run();
