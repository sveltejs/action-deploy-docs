import type { Transformer } from "unified";
import type { Parent } from "unist";
import { custom_vfile } from "./types";
import visit from "unist-util-visit";

/**
 * The svelte docs have a special two-column display for code examples. This
 * 				allows arbitrary content to appear alongside a highlighted code example.
 *
 * This formatting starts at `***` (a `hr`) and ends with the next fenced code block. All
 * 				of this content is wrappeed in `<div class="side-by-side" />`. then there
 * 				are two nested divs `<div class="copy" />` which contains the arbirtary
 * 				content *up to* the code block and `<div class="code" />` which contains
 * 				the code block itself.
 */
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

				// starting from the current node, we iterate the children of the parent
				// when we find the next code block (which is a `raw` node at this point)
				// we stop, as we have all of the content
				for (let index = i + 1; index < parent.children.length; index++) {
					const _node = parent.children[index];

					if (!_node) break;

					// data.code_block is set as meta data when highlight code blocks in another transform
					if (_node.data && _node.data.code_block) {
						const parts = parent.children.splice(i + 1, index - i);

						left.children = parts;
						right.children.push(parts.pop());
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
