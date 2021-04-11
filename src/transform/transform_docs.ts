import type { docs_list, docs_full, tutorials, examples } from "../types";
import type { DocFiles } from "../fs";

import { format } from "../format";

type Docs = {
	name: string;
	content: string;
};

export async function transform_docs(
	docs: Docs[],
	project: string,
	dir: string,
	type: "readme" | "other"
): Promise<{ list: docs_list; full: docs_full }> {
	const slugs = new Map();
	const final_docs = (
		await Promise.all(
			docs.map((doc) => {
				return format({
					file: doc.name,
					markdown: doc.content,
					project,
					docs_type: "docs",
					dir,
					seen_slugs: slugs,
				});
			})
		)
	).map((doc, i) => ({
		title: doc.data.section_title,
		slug: doc.data.section_slug,
		file: docs[i].name,
		sections: doc.data.sections,
		content: doc.contents.toString(),
	}));

	return {
		list: final_docs.map((d) => {
			const { content, ...rest } = d;
			return rest;
		}),
		full: final_docs,
	};
}
