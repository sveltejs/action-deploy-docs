import type { VFile } from "vfile";

export type section = { slug: string; title: string; sections: section[] };

export type custom_vfile = VFile & {
	data: {
		sections: section[];
		section_stack: section[][];
		prev_level: number;
		section_title: string;
		dir: string;
		slugs: string[];
		seen_slugs: Map<string, number>;
		docs_type: "docs" | "faq" | "migrating" | "examples" | "tutorials" | "blog";
		file_type: "readme" | "other";
	};
};
