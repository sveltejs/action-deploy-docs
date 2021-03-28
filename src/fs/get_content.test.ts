import { suite } from "uvu";
import * as assert from "uvu/assert";

import {
	get_base_documentation,
	get_package_documentation,
} from "./get_content";
import * as path from "path";

const repo = path.join(__dirname, "fixtures", "repo-1");

const get_docs = suite("get_base_documentation");
const get_pkg_docs = suite("get_package_documentation");

get_docs("gets the api documentation correctly", async () => {
	const content = await get_base_documentation("documentation", repo);

	assert.equal(content.api, [
		["01-one.md", "file-one\n"],
		["02-two.md", "file-two\n"],
		["03-three.md", "file-three\n"],
		["04-four.md", "file-four\n"],
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
