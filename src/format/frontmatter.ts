import type { Transformer } from "unified";
import { YamlNode } from "remark-frontmatter";

import yaml from "js-yaml";
import Message from "vfile-message";
import visit from "unist-util-visit";

export function parse_frontmatter(): Transformer {
	return function transformer(tree, vFile) {
		visit(tree, "yaml", (node: YamlNode) => {
			try {
				const data = yaml.load(node.value) as Record<string, unknown>;
				if (data) {
					// @ts-ignore
					vFile.data.frontmatter = data;
				}
			} catch (e) {
				vFile.messages.push(new Message("YAML failed to parse", e));
			}
		});
	};
}
