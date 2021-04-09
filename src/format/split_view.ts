import type { Transformer } from "unified";
import type { Parent } from "unist";
import { custom_vfile } from "./types";
import visit from "unist-util-visit";

export function split_view(): Transformer {
	return function (tree, vFile: custom_vfile) {
		if (vFile.data.docs_type !== "docs") return;

		visit(tree, "element", (node, i, parent) => {
			if (node.tagName === "hr") {
				const left: Parent = {
					type: "element",
					tagName: "div",
					properties: { className: "copy" },
					children: [],
				};

				const right: Parent = {
					type: "element",
					tagName: "div",
					properties: { className: "code" },
					children: [],
				};

				for (let index = i + 1; index < parent.children.length; index++) {
					const _node = parent.children[index];

					if (!_node) break;

					if (_node.data && _node.data.code_block) {
						const parts = parent.children.splice(i + 1, index - i);
						parts.pop();
						left.children = parts;
						right.children.push(_node);
						break;
					}
				}

				node.tagName = "div";
				node.properties = { className: "side-by-side" };
				node.children = [left, right];
			}
		});
	};
}
