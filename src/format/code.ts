import type { Transformer } from "unified";
import type { Code, HTML } from "mdast";

import visit from "unist-util-visit";
import PrismJS from "prismjs";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-diff.js";
import "prismjs/components/prism-typescript.js";

import "prism-svelte";

export type language = keyof typeof LanguageMap;

enum LanguageMap {
	bash = "bash",
	env = "bash",
	html = "markup",
	sv = "svelte",
	js = "javascript",
	css = "css",
	diff = "diff",
	ts = "typescript",
	"" = "",
}

/**
 * Custom highlighting for code blocks using PrismJS.
 */
export function highlight(source: string, lang?: language): string {
	const plang = lang === "" ? "" : LanguageMap[lang];
	const highlighted = plang
		? PrismJS.highlight(source, PrismJS.languages[plang], lang)
		: source.replace(
				/[&<>]/g,
				(c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])
		  );

	return `<div class="code-block"><pre class='language-${plang}'><code>${highlighted}</code></pre></div>`;
}

/**
 * Custom highlighting for code blocks using PrismJS.
 */
export function highight_code_block(): Transformer {
	return function transformer(tree) {
		visit(tree, "code", (node: Code) => {
			node.value = highlight(node.value, node.lang as language);
			//@ts-ignore
			node.data = {};
			// data.code_block is set so we can differentiate between code blocks and other raw nodes
			// this is utilised in a rehype plugin later in the pipeline (split-view)
			// retaining this metadata requires a custom handler for raw nodes when converting MDAST -> HAST
			node.data.code_block = true;
			((node as unknown) as HTML).type = "html";
		});
	};
}
