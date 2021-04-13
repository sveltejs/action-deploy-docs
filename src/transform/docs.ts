import type {
	BlogMeta,
	Blog,
	DocMeta,
	Doc,
	Example,
	ExampleCategory,
	ExampleMeta,
	Faq,
	FaqMeta,
	File,
	Tutorial,
	TutorialMeta,
	TutorialCategory,
} from "../types";

import type { SimpleFile } from "../fs";

import { format } from "../format";
import { make_session_slug_processor } from "../format/slug";
import { name } from "vfile-message";

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
	content: ExampleSource[] | string;
};

export type TutorialSource = {
	name: string;
	content: ExamplesCatSource[];
};

// TODO: there are about 10 of these, dedupe?
const make_slug = make_session_slug_processor({
	preserve_unicode: false,
	separator: "-",
});

export async function transform_blog(
	blogs: DocsSource[],
	project: string,
	dir: string
): Promise<{ list: BlogMeta[]; full: Blog[] }> {
	const dates: { pretty: string; numeric: string }[] = [];
	const final_blog = (
		await Promise.all(
			blogs.map((doc, i) => {
				const match = /^(\d+-\d+-\d+)-(.+)\.md$/.exec(blogs[i].name);
				if (!match)
					throw new Error(`Invalid filename for blog: '${blogs[i].name}'`);

				const [, pubdate, slug] = match;
				const date = new Date(`${pubdate} EDT`);
				dates.push({
					pretty: date.toDateString(),
					numeric: pubdate,
				});

				return format({
					file: doc.name,
					markdown: doc.content,
					project,
					docs_type: "blog",
					dir,
					level: 2,
					slug,
				});
			})
		)
	)
		.map((doc, i) => {
			return {
				title: doc.data.section_title,
				slug: doc.data.section_slug,
				file: blogs[i].name,
				content: doc.contents.toString(),
				date: dates[i],
			};
		})
		.sort((a, b) => (a.date.numeric < b.date.numeric ? 1 : -1));

	return {
		list: final_blog.map((d) => {
			const { content, ...rest } = d;
			return rest;
		}),
		full: final_blog,
	};
}

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
					level: 3,
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

function extract_meta(files: SimpleFile[]): [SimpleFile[], { title: string }] {
	const index = files.findIndex(({ name }) => name.endsWith("meta.json"));

	if (index < 0) throw new Error("Examples must have a meta.json file.");

	const meta = JSON.parse(files.splice(index, 1)[0].content as string);

	return [files, meta];
}

function process_example(
	content: SimpleFile[],
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
		if (typeof content === "string")
			throw new Error("Example contents cannot contain further directories.");

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

async function process_tutorial(
	content: SimpleFile[],
	seen_slugs: Map<string, number>,
	project: string
): Promise<[Tutorial[], TutorialMeta[]]> {
	let full: Tutorial[] = [];
	let list = await Promise.all(
		content.map(async ({ content }) => {
			// TODO: this is backwards, fix
			if (typeof content === "string")
				throw new Error("Example contents cannot contain further directories.");

			let initial: SimpleFile[];
			let completed: SimpleFile[];
			let text: string;

			content.forEach(({ name, content }) => {
				if (name === "app-a" && Array.isArray(content)) initial = content;
				if (name === "app-b" && Array.isArray(content)) completed = content;
				if (name === "text.md" && typeof content === "string") text = content;
			});

			const vfile = await format({
				file: name,
				markdown: text,
				docs_type: "tutorials",
				project,
				dir: "tutorial",
				level: 3,
			});

			const _example = {
				name: vfile.data.section_title,
				slug: vfile.data.section_slug,
			};

			full.push({
				..._example,
				initial: initial.map(get_files),
				complete: completed ? completed.map(get_files) : [],
				content: vfile.contents as string,
			});

			return _example;
		})
	);

	return [full, list];
}

export async function transform_tutorials(
	examples: TutorialSource[],
	project: string
	// dir: string
): Promise<{ full: Tutorial[]; list: TutorialCategory[] }> {
	const seen_slugs = new Map();

	const full: Tutorial[] = [];
	const list = await Promise.all(
		examples.map(async ({ content }) => {
			const [files, meta] = extract_meta(content);
			const [example_full, example_list] = await process_tutorial(
				files,
				seen_slugs,
				project
			);

			example_full.forEach((v) => full.push(v));

			return {
				name: meta.title,
				tutorials: example_list,
			};
		})
	);
	return { list, full };
}

export async function transform_faq(
	blogs: DocsSource[],
	project: string,
	dir: string
): Promise<{ list: FaqMeta[]; full: Faq[] }> {
	const orders: number[] = [];
	const final_faq = (
		await Promise.all(
			blogs.map((doc) => {
				const match = /^(\d+)-(.+)\.md$/.exec(doc.name);
				if (!match) throw new Error(`Invalid filename for faq: '${doc.name}'`);

				const [, order, slug] = match;
				orders.push(+order);

				return format({
					file: doc.name,
					markdown: doc.content,
					project,
					docs_type: "faq",
					dir,
					level: 3,
					slug,
				});
			})
		)
	)
		.map((doc, i) => {
			return {
				title: doc.data.section_title,
				slug: doc.data.section_slug,
				file: blogs[i].name,
				content: doc.contents.toString(),
				order: orders[i],
			};
		})
		.sort((a, b) => (a.order < b.order ? 1 : -1));

	return {
		list: final_faq.map((d) => {
			const { content, ...rest } = d;
			return rest;
		}),
		full: final_faq,
	};
}
