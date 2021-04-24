import type { Transformer } from "unified";
import type { Node } from "unist";
import type { Link, HTML, Parent } from "mdast";

import visit from "unist-util-visit";

interface Element extends Node {
	properties: {
		href?: string;
		target?: string;
		rel?: string;
	};
}
/**
 * All links must have `rel="noopener noreferrer"` and external attributes
 * 				must open in a new window.
 */
export function set_link_attributes(): Transformer {
	return function transformer(tree) {
		visit<Element>(tree, "element", (node) => {
			// console.log(node);
			if (node.tagName === "a") {
				if (node.properties.href && node.properties.href.startsWith("http")) {
					node.properties.target = "_blank";
				}

				node.properties.rel = "noopener noreferrer";
			}
		});
	};
}
