import { promises as fs } from "fs";
import * as path from "path";

export interface BaseDocs {
	docs: [string, string][];
}

const fs_opts = {
	encoding: "utf-8",
} as const;

function get_content_and_filename(
	base: string,
	filename: string
): Promise<[string, string]> {
	console.log(filename, filename.replace(/^@sveltejs\//, ""));
	console.log("\n");
	return new Promise(async (rs, rj) => {
		try {
			const content = await fs.readFile(path.join(base, filename), fs_opts);
			rs([filename, content]);
		} catch (e) {
			rj(e);
		}
	});
}

async function maybe_read_dir(
	docs_dir: string
): Promise<Array<string> | false> {
	try {
		return await fs.readdir(path.join(docs_dir, "docs"));
	} catch (e) {
		return false;
	}
}

async function maybe_read_file(docs_dir: string): Promise<string | false> {
	try {
		return (await fs.readFile(path.join(docs_dir, "docs"))).toString();
	} catch (e) {
		return false;
	}
}

export async function get_base_documentation(
	docs_path: string,
	working_directory: string = process.cwd()
): Promise<BaseDocs | false> {
	const docs_dir = path.join(working_directory, docs_path);
	let api_content;
	let api = await maybe_read_dir(docs_dir);
	if (api) {
		api_content = await Promise.all(
			api
				.filter((f) => path.extname(f) === ".md" && !f.startsWith("xx"))
				.map((f) => get_content_and_filename(path.join(docs_dir, "docs"), f))
		);
	} else {
		const content = await get_pkg_and_readme(process.cwd(), "");
		if (content) api_content = [content];
	}

	if (!api_content) return false;

	return {
		docs: api_content,
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

			const { name, private: _private } = JSON.parse(pkg);
			if (_private) throw new Error("This is a private package");

			rs([name.replace(/^@sveltejs\//, ""), docs]);
		} catch (e) {
			// console.error(e.message);
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
): Promise<[string, string][] | false> {
	const _ignore = opts.ignore.concat(
		opts.ignore.map((pkg) => `@sveltejs/${pkg}`)
	);
	const pkg_dir = path.join(working_directory, pkg_path);
	const packages = await maybe_read_dir(pkg_dir);

	if (!packages) return false;

	return (
		await Promise.all(packages.map((f) => get_pkg_and_readme(pkg_dir, f)))
	).filter((contents) => contents && !_ignore.includes(contents[0])) as [
		string,
		string
	][];
}
