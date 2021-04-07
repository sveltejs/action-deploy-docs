import type { Transformer } from "unified";
import type { Heading, Root } from "mdast";

import visit from "unist-util-visit";

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

export function strip_h1(): Transformer {
	return function transformer(tree, vFile) {
		//@ts-ignore
		if (vFile.data.type === "readme") {
			const first_md_node = (tree as Root).children.findIndex((node) =>
				types.includes(node.type)
			);
			if (
				(tree as Root).children[first_md_node].type === "heading" &&
				(tree as Root).children[first_md_node].depth === 1
			) {
				(tree as Root).children.splice(first_md_node, first_md_node + 1);
			}
		}
	};
}

export function increment_headings(): Transformer {
	return function transformer(tree, vFile) {
		//@ts-ignore
		if (vFile.data.type === "readme") {
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
