import { promises as fs } from "fs";
import * as path from "path";

import { increment_headings } from "../format/increment_headings";

interface SimpleFile {
	name: string;
	content: SimpleFile[] | string;
}

type File = SimpleFile & {
	is_dir: boolean;
};

type doc_types =
	| "docs"
	| "faq"
	| "migrating"
	| "blog"
	| "tutorials"
	| "examples";

export interface Docs {
	docs?: unknown;
	faq?: unknown;
	migrating?: unknown;
	blog?: unknown;
	tutorials?: unknown;
	examples?: unknown;
}

type transformed_docs = [string, Docs][];

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
				.filter((name) => !name.endsWith("DS_Store"))
				.map((name) => rc_read_file(path.join(file_path, name)))
		);
	}

	return file_or_dir;
}

const doc_types = ["docs", "faq", "migrating", "blog", "tutorials", "examples"];

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

export function transform_files(
	file: File,
	pkg_path: string,
	docs_path: string,
	project: string
): transformed_docs {
	let is_docs = false;

	const base_docs: Docs = {};
	const pkgs: transformed_docs = [];

	if (file.is_dir && Array.isArray(file.content)) {
		file.content.forEach(({ name, content }) => {
			if (name === docs_path && Array.isArray(content)) {
				is_docs = true;
				content.forEach((docs) => {
					if (!doc_types.includes(docs.name) || !Array.isArray(docs.content))
						return;

					base_docs[docs.name as doc_types] = docs.content.map((entry) =>
						strip_meta(entry.name, entry.content)
					);
				});
			}
			if (name === pkg_path && Array.isArray(content)) {
				content.forEach((docs) => {
					if (!Array.isArray(docs.content)) return;

					pkgs.push([
						docs.name,
						{
							docs: docs.content.map((entry) =>
								strip_meta(entry.name, entry.content)
							),
						},
					]);
				});
			}
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
