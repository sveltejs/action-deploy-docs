import { promises as fs } from "fs";
import * as path from "path";

export interface BaseDocs {
	api: [string, string][];
}

const fs_opts = {
	encoding: "utf-8",
} as const;

function get_content_and_filename(
	base: string,
	filename: string
): Promise<[string, string]> {
	return new Promise(async (rs, rj) => {
		try {
			const content = await fs.readFile(path.join(base, filename), fs_opts);
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

	const api = await fs.readdir(path.join(docs_dir, "docs"));
	const api_content = await Promise.all(
		api
			.filter((f) => path.extname(f) === ".md")
			.map((f) => get_content_and_filename(path.join(docs_dir, "docs"), f))
	);

	return {
		api: api_content,
	};
}

function get_pkg_and_readme(
	base: string,
	pkg_dir: string
): Promise<[string, string] | false> {
	return new Promise(async (rs, rj) => {
		try {
			const [pkg, docs] = await Promise.all([
				fs.readFile(path.join(base, pkg_dir, "package.json"), fs_opts),
				fs.readFile(path.join(base, pkg_dir, "README.md"), fs_opts),
			]);
			console.log(
				`\n - get_pkg_and_readme: ${path.join(
					base,
					pkg_dir,
					"package.json"
				)} - \n`
			);
			console.log(pkg, docs);
			rs([JSON.parse(pkg).name, docs]);
		} catch (e) {
			rs(false);
		}
	});
}

interface PackageOptions {
	ignore: string[];
}

export async function get_package_documentation(
	pkg_path: string,
	working_directory: string = process.cwd(),
	opts: PackageOptions = { ignore: [] }
): Promise<[string, string][]> {
	const pkg_dir = path.join(working_directory, pkg_path);
	const packages = await fs.readdir(pkg_dir);
	console.log(pkg_dir, packages);
	return (
		await Promise.all(packages.map((f) => get_pkg_and_readme(pkg_dir, f)))
	).filter((contents) => contents && !opts.ignore.includes(contents[0])) as [
		string,
		string
	][];
}
