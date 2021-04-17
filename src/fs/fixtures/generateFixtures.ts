import { promises as fs } from "fs";
import * as path from "path";
import { rc_read_file } from "../get_content";

const base_path = path.join(process.cwd(), "src", "fs", "fixtures");
const repo_names = ["repo-1", "repo-2", "repo-3", "repo-4"];

async function run() {
	const repos = await Promise.all(
		repo_names.map((repo) => rc_read_file(path.join(base_path, repo)))
	);

	await Promise.all(
		repos.map((files, i) =>
			fs.writeFile(
				path.join(base_path, `output-${repo_names[i]}.js`),
				`export default ${JSON.stringify(files)}`
			)
		)
	);
}

run();
