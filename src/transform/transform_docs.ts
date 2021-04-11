import type {
	DocMeta,
	Doc,
	tutorials,
	Example,
	ExampleCategory,
	ExampleMeta,
	File,
} from "../types";

import { format } from "../format";
import { make_session_slug_processor } from "../format/slug";

type DocsSource = {
	name: string;
	content: string;
};

type ExampleSource = {
	name: string;
	content: DocsSource[] | string;
};

export type ExamplesCatSource = {
	name: string;
	content: ExampleSource[];
};

// TODO: there are about 10 of these, dedupe?

const make_slug = make_session_slug_processor({
	preserve_unicode: false,
	separator: "-",
});

export async function transform_docs(
	docs: DocsSource[],
	project: string,
	dir: string
): Promise<{ list: DocMeta[]; full: Doc[] }> {
	const seen_slugs = new Map();
	const final_docs = (
		await Promise.all(
			docs.map((doc) => {
				return format({
					file: doc.name,
					markdown: doc.content,
					project,
					docs_type: "docs",
					dir,
					seen_slugs,
				});
			})
		)
	).map((doc, i) => ({
		title: doc.data.section_title,
		slug: doc.data.section_slug,
		file: docs[i].name,
		sections: doc.data.sections,
		content: doc.contents.toString(),
	}));

	return {
		list: final_docs.map((d) => {
			const { content, ...rest } = d;
			return rest;
		}),
		full: final_docs,
	};
}

function get_files({ name, content }: DocsSource): File {
	return {
		name,
		type: name.split(".").pop(),
		content,
	};
}

function extract_meta(
	files: ExampleSource[]
): [DocsSource[], { title: string }] {
	const index = files.findIndex(({ name }) => name.endsWith("meta.json"));

	if (index < 0) throw new Error("Examples must have a meta.json file.");

	const meta = JSON.parse(files.splice(index, 1)[0].content as string);

	return [files as DocsSource[], meta];
}

function process_example(
	content: ExampleSource[],
	seen_slugs: Map<string, number>
): [Example[], ExampleMeta[]] {
	let full: Example[] = [];
	let list = content.map(({ content }) => {
		if (typeof content === "string")
			throw new Error("Example contents cannot contain further directories.");

		const [files, meta] = extract_meta(content);
		const slug = make_slug(meta.title, seen_slugs);

		const _example = {
			name: meta.title,
			slug,
			thumbnail: `examples/thumbnails/${slug}.jpg`,
		};

		full.push({ ..._example, files: files.map(get_files) });

		return _example;
	});

	return [full, list];
}

export async function transform_examples(
	examples: ExamplesCatSource[]
	// TODO: signatures should be consistent -- do we need these params?
	// project: string,
	// dir: string
): Promise<{ full: Example[]; list: ExampleCategory[] }> {
	const seen_slugs = new Map();

	const full: Example[] = [];
	const list = examples.map(({ content }) => {
		const [files, meta] = extract_meta(content);
		const [example_full, example_list] = process_example(files, seen_slugs);

		example_full.forEach((v) => full.push(v));

		return {
			name: meta.title,
			examples: example_list,
		};
	});
	return { list, full };
}
