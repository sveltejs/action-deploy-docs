import { promises as fs } from "fs";
import * as path from "path";

export type SimpleFile = {
	name: string;
	content: SimpleFile[] | string;
};

type File = {
	name: string;
	is_dir: boolean;
	content: File[] | string;
};

type doc_types =
	| "docs"
	| "faq"
	| "migrating"
	| "blog"
	| "tutorial"
	| "examples";

export type DocFiles = {
	docs?: unknown;
	faq?: unknown;
	migrating?: unknown;
	blog?: unknown;
	tutorial?: unknown;
	examples?: unknown;
};

export type transformed_docs = [string, DocFiles][];

export async function rc_read_file(file_path: string): Promise<File> {
	let file_or_dir: File = {
		name: file_path.split("/").pop(),
		is_dir: false,
		content: "",
	};
	try {
		file_or_dir.content = await (await fs.readFile(file_path)).toString();
	} catch (e) {
		file_or_dir.is_dir = true;
		file_or_dir.content = await Promise.all(
			(await fs.readdir(file_path))
				.filter(
					(name) =>
						!name.endsWith("DS_Store") &&
						name !== "node_modules" &&
						!name.startsWith("xx")
				)
				.map((name) => rc_read_file(path.join(file_path, name)))
		);
	}

	return file_or_dir;
}

const doc_types = ["docs", "faq", "migrating", "blog", "tutorial", "examples"];

function strip_meta(name: string, content: string | SimpleFile[]): SimpleFile {
	return {
		name: name,
		content: Array.isArray(content)
			? content.map((v) => strip_meta(v.name, v.content))
			: content,
	};
}

function is_empty<T extends object>(obj: T): boolean {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false;
		}
	}

	return JSON.stringify(obj) === JSON.stringify({});
}

function find_folder(
	files: File,
	paths: string[],
	index: number = 0
): File | false {
	if (!Array.isArray(files.content)) return false;

	const segment = files.content.find((v) => v.name === paths[index]);

	if (!segment) return false;
	if (paths[index + 1] === undefined) return segment;

	return find_folder(segment, paths, index + 1);
}

export function transform_files(
	file: File,
	pkg_path: string,
	docs_path: string,
	project: string
): transformed_docs {
	let is_docs = false;

	const base_docs: DocFiles = {};
	const pkgs: transformed_docs = [];

	const docs_folder = find_folder(file, docs_path.split("/"), 0);
	const pkg_folder = find_folder(file, pkg_path.split("/"), 0);

	if (docs_folder && Array.isArray(docs_folder.content)) {
		is_docs = true;
		docs_folder.content.forEach((docs) => {
			if (!doc_types.includes(docs.name) || !Array.isArray(docs.content))
				return;

			base_docs[docs.name as doc_types] = docs.content.map((entry) =>
				strip_meta(entry.name, entry.content)
			);
		});
	}

	if (pkg_folder && Array.isArray(pkg_folder.content)) {
		pkg_folder.content.forEach((docs) => {
			if (!Array.isArray(docs.content)) return;
			const readme = docs.content.find(({ name }) => name === "README.md");
			const pkg = docs.content.find(({ name }) => name === "package.json");

			if (
				!readme ||
				!pkg ||
				JSON.parse(pkg.content as string).name === project ||
				JSON.parse(pkg.content as string).name.replace("@sveltejs/", "") ===
					project
			)
				return;

			pkgs.push([
				JSON.parse(pkg.content as string).name.replace("@sveltejs/", ""),
				{
					docs: [strip_meta("README.md", readme.content)],
				},
			]);
		});
	}

	if (!is_docs && Array.isArray(file.content)) {
		const readme = file.content.find(({ name }) => name === "README.md");

		if (readme)
			pkgs.push([
				project,
				{
					docs: [strip_meta("README.md", readme.content)],
				},
			]);
	}

	if (!is_empty(base_docs)) pkgs.push([project, base_docs]);

	return pkgs;
}

export async function get_docs(
	project: string,
	pkg_path: string,
	docs_path: string,
	working_directory: string = process.cwd()
) {
	return transform_files(
		await rc_read_file(working_directory),
		pkg_path,
		docs_path,
		project
	);
}
