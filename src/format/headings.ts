import type { Transformer } from "unified";
import type { Parent } from "unist";
import type { Heading, Root } from "mdast";
import { custom_vfile } from "./types";

import tree_to_string from "mdast-util-to-string";
import to_hast from "mdast-util-to-hast";
import visit from "unist-util-visit";

import { make_session_slug_processor } from "./slug";

export const SLUG_PRESERVE_UNICODE = false;
export const SLUG_SEPARATOR = "-";

const make_slug = make_session_slug_processor({
	preserve_unicode: SLUG_PRESERVE_UNICODE,
	separator: SLUG_SEPARATOR,
});

// TODO: This should use the `base_level` setting
/**
 * The documentation only allows heading level from 3 to 5 inclusive. This plugin
 * 				validates that rule is always followed.
 */
export function validate_headings(): Transformer {
	return function transformer(tree, { data }: custom_vfile) {
		if (data.docs_type !== "docs") return;
		visit(tree, "heading", (node: Heading) => {
			if (node.depth < 3 || node.depth > 5)
				throw new Error(
					`Only level 3, 4, and 5 headings are allowed. Got level ${node.depth} heading.`
				);
		});
	};
}

type Heading_with_hProps = Heading & {
	data: {
		hProperties?: Record<string, unknown>;
		hChildren?: unknown[];
	};
};

/**
 * Linkify headings, generate correct slugs, and collect section data.
 *
 * **linkify**: We must be able to link to headings. In order to this we need
 * 							to insert anchors with appropriate slugs. We also need to insert
 * 							link icons to allow people to copy paste links We do this by
 * 							inserting an `a` and `span` tag into every heading.
 *
 * **slugs**: slugs for heading anchors are generated based on previous headings.
 * 						This helps to prevent collisions and gives more descriptuve urls.
 * 						For example a `h3` of 'hello' will have a slug of `hello` the next
 * 						`h4` of 'world' will have a slug of `hello-world`
 *
 * **section data**: Sections of the docs are dictated by the document structure
 * 									 `h3` -> `h4` -> `h5`, etc. This plugin keeps track of the
 * 									 headings and creates a nested section structure that reflects
 * 									 the hierarchy of those sections. This structure allows us to
 * 									 create navigation structures with proper semantics, without
 * 									 transforming the sections data structure.
 *
 */

export function linkify_headings(): Transformer {
	return function (tree, { data }: custom_vfile) {
		if (data.docs_type !== "docs" && data.docs_type !== "blog" && data.docs_type !== "faq") return;

		visit(tree, "heading", (node: Heading_with_hProps) => {
			const prev_section = data.section_stack[data.section_stack.length - 1];

			// slugs are tracked independently of sections and are prefixed appropriately
			if (node.depth <= data.prev_level && data.slugs.length !== 0)
				for (let i = 0; i < data.prev_level - node.depth + 1; i++)
					data.slugs.pop();

			// innerText for MDAST nodes
			const title_text = tree_to_string(node);

			let slug: string;

			if (data.docs_type === "blog" || data.file_type === "readme") {
				slug = make_slug(
					node.depth === data.base_level
						? title_text
						: [data.slugs[data.slugs.length - 1], title_text].join(" "),
					data.seen_slugs
				);
			} else {
				slug = make_slug(
					node.depth === data.base_level
						? [data.section_title, title_text].join(" ")
						: [data.slugs[data.slugs.length - 1], title_text].join(" "),
					data.seen_slugs
				);
			}

			data.slugs.push(slug);

			// We keep a 'section_stack' to keep track of the section structure
			if (node.depth > data.prev_level) {
				// TODO: check that prev_section[prev_section.length - 1] exists
				// skipping heading levels can cause problems here
				// maybe check current level against prev_level to validate?
				if (!data.section_stack) {
					console.log(data.section_slug, node);
				}
				data.section_stack.push(
					prev_section[prev_section.length - 1].sections || []
				);
			} else if (node.depth < data.prev_level) {
				for (let i = 0; i < data.prev_level - node.depth; i++) {
					data.section_stack.pop();
				}
			}
			if (!data.section_stack) {
				console.log(data.section_slug, node);
			}
			data.section_stack[data.section_stack.length - 1].push({
				slug,
				title: title_text,
				sections: [],
			});
			data.prev_level = node.depth;

			// Create the additional markup required
			const children = (to_hast(node) as Parent).children;

			if (!node.data) node.data = {};
			if (!node.data.hProperties) node.data.hProperties = {
				id: slug
			};
			if (!node.data.hChildren) node.data.hChildren = [];

			// const span_node = {
			// 	type: "element",
			// 	tagName: "span",
			// 	properties: { id: [slug], className: ["offset-anchor"] },
			// };

			// const a_node = {
			// 	type: "element",
			// 	tagName: "a",
			// 	properties: {
			// 		href: `${data.dir}#${slug}`,
			// 		className: ["anchor"],
			// 		"aria-hidden": true,
			// 	},
			// };

			// if (node.depth > data.base_level + 1)
			// 	//@ts-ignore
			// 	span_node.properties["data-scrollignore"] = true;

			// node.data.hChildren = [span_node, a_node];

			children.forEach((v) => node.data.hChildren.push(v));
		});
	};
}

const types = [
	"paragraph",
	"heading",
	"thematicBreak",
	"blockquote",
	"list",
	"listItem",
	"html",
	"code",
	"definition",
	"text",
	"emphasis",
	"strong",
	"inlineCode",
	"break",
	"link",
	"image",
	"linkReference",
	"imageReference",
];

/**
 * *Only applies to `README.md` files*.
 *
 * Svelte docs require documents to *not* contain a main title as this is provided by
 * 				other means. However, *readme* files should be easily readable exactly as
 * 				they are (in github or in an IDE). This plugin strips the leading `h1` from
 * 				`README.md` files facilitating this difference in formatting.
 */
export function strip_h1(): Transformer {
	return function transformer(tree: Root, vFile: custom_vfile) {
		//@ts-ignore
		if (vFile.data.file_type === "readme") {
			// we only wnat to strip headings if they are the first markdown node
			// Othere thing can appear first so we need to perform a type check
			const first_md_node = tree.children.findIndex((node) =>
				types.includes(node.type)
			);
			if (
				tree.children[first_md_node].type === "heading" &&
				tree.children[first_md_node].depth === 1
			) {
				tree.children.splice(first_md_node, first_md_node + 1);
			}
		}
	};
}

/**
 * *Only applies to `README.md` files*.
 *
 * Svelte docs require headings to start at level 3 as level 1 and 2 headings are
 * 				already used for other purposes. However, *readme* files should be
 * 				easily readable exactly as they are (in github or in an IDE). This
 * 				plugin increments headings in `README.md` files facilitating this
 * 				difference in formatting.
 */

export function increment_headings(): Transformer {
	return function transformer(tree, vFile) {
		//@ts-ignore
		if (vFile.data.file_type === "readme") {
			visit(tree, "heading", (node: Heading) => {
				const new_depth = node.depth + 1;
				if (new_depth > 5) {
					throw new Error(
						`Headings above level 5 are not allowed. Readme headings are automatically incremented by 1.`
					);
				}
				node.depth = new_depth as 1 | 2 | 3 | 4 | 5 | 6;
			});
		}
	};
}
