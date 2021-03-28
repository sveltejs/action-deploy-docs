import PrismJS from "prismjs";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-diff.js";
import "prism-svelte";

type language = keyof typeof LanguageMap;

enum LanguageMap {
	bash = "bash",
	html = "markup",
	sv = "svelte",
	js = "javascript",
	css = "css",
	diff = "diff",
	"" = "",
}

export function highlight(source: string, lang?: language): string {
	const plang = lang === "" ? "" : LanguageMap[lang];
	const highlighted = plang
		? PrismJS.highlight(source, PrismJS.languages[plang], lang)
		: source.replace(
				/[&<>]/g,
				(c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])
		  );

	return `<pre class='language-${plang}'><code>${highlighted}</code></pre>`;
}
