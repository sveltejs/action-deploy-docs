import { suite } from "uvu";
import * as assert from "uvu/assert";

import { get_base_documentation } from "./get_content";
import * as path from "path";

const get_docs = suite("get_base_documentation");
const get_pkg_docs = suite("get_package_docuementation");

get_docs("gets the api documentation correctly", async () => {
	const content = await get_base_documentation(
		"documentation",
		path.join(__dirname, "fixtures", "repo-1")
	);

	assert.equal(content.api, [
		["01-one.md", "file-one\n"],
		["02-two.md", "file-two\n"],
		["03-three.md", "file-three\n"],
		["04-four.md", "file-four\n"],
	]);
});

get_docs.run();
