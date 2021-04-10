import type { Transformer } from "unified";
import type { Link, HTML } from "mdast";

import visit from "unist-util-visit";

/**
 * All links must have `rel="noopener noreferrer"` and external attributes
 * 				must open in a new window.
 */
export function set_link_attributes(): Transformer {
	return function transformer(tree) {
		visit(tree, "link", (node: Link) => {
			let target_attr = "";
			let title_attr = "";

			if (node.url.startsWith("http")) {
				target_attr = ' target="_blank"';
			}

			if (node.title !== null) {
				title_attr = ` title="${node.title}"`;
			}

			((node as unknown) as HTML).type = "html";
			((node as unknown) as HTML).value = `<a href="${node.url}"${target_attr}${title_attr} rel="noopener noreferrer">${node.children[0].value}</a>`;
		});
	};
}
