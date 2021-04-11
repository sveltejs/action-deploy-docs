import type { VFile } from "vfile";

import { section } from "../types";

export type docs_type =
	| "docs"
	| "faq"
	| "migrating"
	| "examples"
	| "tutorials"
	| "blog";

export type custom_vfile = VFile & {
	data: {
		sections: section[];
		section_stack: section[][];
		prev_level: number;
		section_title: string;
		section_slug: string;
		dir: string;
		slugs: string[];
		seen_slugs: Map<string, number>;
		docs_type: docs_type;
		file_type: "readme" | "other";
	};
};
