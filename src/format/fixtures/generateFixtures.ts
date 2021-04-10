import { promises as fs } from "fs";
import * as path from "path";
import { format } from "../format_api";
import markdown from "./api-docs-markdown";

const output_path = path.join(
	process.cwd(),
	"src",
	"format",
	"fixtures",
	"api-docs-html.js"
);
// const input = path.join(dir, "api-docs-markdown.js");

async function run() {
	const { contents } = await format()(
		"./api-docs.md",
		markdown,
		"svelte",
		"docs",
		"docs"
	);
	await fs.writeFile(output_path, `export default ${JSON.stringify(contents)}`);
}

run();
