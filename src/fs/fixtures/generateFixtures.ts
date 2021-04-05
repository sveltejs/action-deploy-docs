import { promises as fs } from "fs";
import * as path from "path";
import { rc_read_file } from "../get_content";

const base_path = path.join(process.cwd(), "src", "fs", "fixtures");
const input_path = path.join(base_path, "repo-3");
const output_path = path.join(base_path, "recursive_output.js");

async function run() {
	const files = await rc_read_file(input_path);
	await fs.writeFile(output_path, `export default ${JSON.stringify(files)}`);
}

run();
