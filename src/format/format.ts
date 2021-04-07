import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";

const processor = unified().use(markdown).use(remark2rehype).use(html);

// export const format_docs = {
// 	docs: format_api,
// 	faq: format_faq,
// 	migrating: format_api,
// 	blog: format_blog,
// 	tutorials: format_tutorials,
// 	examples: format_examples,
// };

export interface Docs {
	docs?: unknown;
	faq?: unknown;
	migrating?: unknown;
	blog?: unknown;
	tutorials?: unknown;
	examples?: unknown;
}
