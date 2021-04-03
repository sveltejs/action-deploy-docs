import { promises as fs } from "fs";
import * as path from "path";
import { format_api } from "../format_api";
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
	const formatted = format_api("./api-docs.md", markdown, "docs");
	await fs.writeFile(
		output_path,
		`export default ${JSON.stringify(formatted)}`
	);
}

run();
