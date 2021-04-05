import { suite } from "uvu";
import * as assert from "uvu/assert";
import recursive_output from "./fixtures/recursive_output";

import * as path from "path";

import {
	get_base_documentation,
	get_package_documentation,
	rc_read_file,
} from "./get_content";

const repo = path.join(__dirname, "fixtures", "repo-1");
const repo2 = path.join(__dirname, "fixtures", "repo-2");
const repo3 = path.join(__dirname, "fixtures", "repo-3");

const get_docs = suite("get_base_documentation");
const get_pkg_docs = suite("get_package_documentation");
const recrusive_read = suite("rc_read_file");

recrusive_read("recursively reads file and dirs", async () => {
	const content = await rc_read_file(repo3);
	// console.log(JSON.stringify(content, null, 2));
	assert.equal(content, recursive_output);
});

get_docs("gets the api documentation correctly", async () => {
	const content = await get_base_documentation("documentation", repo);

	assert.equal(content && content.docs, [
		["01-one.md", "file-one\n"],
		["02-two.md", "file-two\n"],
		["03-three.md", "file-three\n"],
		["04-four.md", "file-four\n"],
	]);
});

get_docs.only("get base documentation when it is a root readme", async () => {
	const content = await get_base_documentation("documentation", repo2);
	assert.equal(content && content.docs, [
		["standard-package", "repo-2 docs\n"],
	]);
});

get_pkg_docs(
	"get documentation for packages ignoring invalid packages",
	async () => {
		const content = await get_package_documentation("packages", repo);

		assert.equal(content, [
			["random-extra-files", "random-extra-files\n"],
			["standard-package", "standard-package\n"],
		]);
	}
);

get_pkg_docs(
	"get documentation for packages optionally ignoring certain package",
	async () => {
		const content = await get_package_documentation("packages", repo, {
			ignore: ["standard-package"],
		});

		assert.equal(content, [["random-extra-files", "random-extra-files\n"]]);
	}
);

get_docs.run();
get_pkg_docs.run();
recrusive_read.run();
