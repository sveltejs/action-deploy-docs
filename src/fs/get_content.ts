import { promises as fs } from "fs";
import * as path from "path";

interface BaseDocs {
	api: [string, string][];
}

function get_content_and_filename(
	base: string,
	filename: string
): Promise<[string, string]> {
	return new Promise(async (rs, rj) => {
		try {
			const content = await fs.readFile(path.join(base, filename), {
				encoding: "utf-8",
			});
			rs([filename, content]);
		} catch (e) {
			rj(e);
		}
	});
}

export async function get_base_documentation(
	docs_path: string,
	working_directory: string = process.cwd()
): Promise<BaseDocs> {
	const docs_dir = path.join(working_directory, docs_path);

	const api = await fs.readdir(path.join(docs_dir, "api"));
	const api_content = await Promise.all(
		api
			.filter((f) => path.extname(f) === ".md")
			.map((f) => get_content_and_filename(path.join(docs_dir, "api"), f))
	);

	return {
		api: api_content,
	};
}

export function get_package_docuementation(
	pkg_path: string,
	working_directory: string = process.cwd()
) {}
