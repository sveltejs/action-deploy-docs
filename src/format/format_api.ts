import { make_session_slug_processor } from "./slug";

export const SLUG_PRESERVE_UNICODE = false;
export const SLUG_SEPARATOR = "-";

const make_slug = make_session_slug_processor({
	preserve_unicode: SLUG_PRESERVE_UNICODE,
	separator: SLUG_SEPARATOR,
});

import { docs_type } from "./types";
import unified from "unified";
import markdown from "remark-parse";
import extract_frontmatter from "remark-frontmatter";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";
import vFile from "vfile";

import {
	strip_h1,
	linkify_headings,
	validate_headings,
	increment_headings,
} from "./headings";
import { set_link_attributes } from "./links";
import { highight_code_block } from "./code";
import { parse_frontmatter } from "./frontmatter";
import { split_view } from "./split_view";
import { custom_vfile } from "./types";
import { section } from "../types";

import u from "unist-builder";

interface Format {
	file: string;
	markdown: string;
	project: string;
	docs_type: docs_type;
	dir: string;
	seen_slugs?: Map<string, number>;
	level: number;
	title?: string;
	slug?: string;
}

// MDAST == Markdown AST
// HAST == HTML AST

const { process } = unified()
	// parse to MDAST
	.use(markdown)
	.use(extract_frontmatter)
	//  MDAST transforms
	.use(parse_frontmatter)
	.use(strip_h1)
	.use(increment_headings)
	.use(validate_headings)
	.use(linkify_headings)
	.use(set_link_attributes)
	.use(highight_code_block)
	// MDAST -> HAST
	.use(rehype, {
		allowDangerousHtml: true,
		// custom handler for raw nodes so we don't lose metadata
		handlers: {
			html: function html(h, node) {
				return h.dangerous
					? h.augment(
							node,
							u("raw", { data: node.data || {} }, node.value as string)
					  )
					: null;
			},
		},
	})
	// HAST transforms
	.use(split_view)
	// HAST -> string
	.use(stringify, { allowDangerousCharacters: true, allowDangerousHtml: true });

export async function format({
	file,
	markdown,
	project,
	docs_type,
	dir,
	seen_slugs = new Map(),
	level,
	title,
	slug,
}: Format): Promise<custom_vfile> {
	const sections: section[] = [];
	const section_title = title || false;

	const section_slug =
		(slug && make_slug(slug, seen_slugs)) ||
		(title && make_slug(title, seen_slugs)) ||
		false;

	const vfile = vFile<custom_vfile>({
		contents: markdown,
		data: {
			seen_slugs,
			sections,
			section_stack: [sections],
			section_title,
			section_slug,
			dir,
			file_type: file.toLowerCase().endsWith("readme.md") ? "readme" : "other",
			docs_type,
			base_level: level,
			prev_level: level,
			slugs: [],
		},
	});

	const docs = (await process(vfile)) as custom_vfile;

	return docs;
}
