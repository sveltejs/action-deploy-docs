import type { Doc, DocMeta } from "../../types";
export const docs_in = [
	{
		name: "01-boo.md",
		content: `---
title: part 1
---

### docs1 content`,
	},
	{
		name: "02-boo.md",
		content: `---
title: part 2
---

### docs2 content`,
	},
	{
		name: "03-boo.md",
		content: `---
title: part 3
---

### docs3 content`,
	},
];

export const docs_full_out: Doc[] = [
	{
		title: "part 1",
		slug: "part-1",
		file: "01-boo.md",
		sections: [
			{
				slug: "part-1-docs1-content",
				title: "docs1 content",
				sections: [],
			},
		],
		content:
			'<h3><span id="part-1-docs1-content" class="offset-anchor"></span><a href="docs#part-1-docs1-content" class="anchor" aria-hidden></a>docs1 content</h3>',
	},
	{
		title: "part 2",
		slug: "part-2",
		file: "02-boo.md",
		sections: [
			{
				slug: "part-2-docs2-content",
				title: "docs2 content",
				sections: [],
			},
		],
		content:
			'<h3><span id="part-2-docs2-content" class="offset-anchor"></span><a href="docs#part-2-docs2-content" class="anchor" aria-hidden></a>docs2 content</h3>',
	},
	{
		title: "part 3",
		slug: "part-3",
		file: "03-boo.md",
		sections: [
			{
				slug: "part-3-docs3-content",
				title: "docs3 content",
				sections: [],
			},
		],
		content:
			'<h3><span id="part-3-docs3-content" class="offset-anchor"></span><a href="docs#part-3-docs3-content" class="anchor" aria-hidden></a>docs3 content</h3>',
	},
];

export const docs_list_out: DocMeta[] = [
	{
		title: "part 1",
		slug: "part-1",
		file: "01-boo.md",
		sections: [
			{
				slug: "part-1-docs1-content",
				title: "docs1 content",
				sections: [],
			},
		],
	},
	{
		title: "part 2",
		slug: "part-2",
		file: "02-boo.md",
		sections: [
			{
				slug: "part-2-docs2-content",
				title: "docs2 content",
				sections: [],
			},
		],
	},
	{
		title: "part 3",
		slug: "part-3",
		file: "03-boo.md",
		sections: [
			{
				slug: "part-3-docs3-content",
				title: "docs3 content",
				sections: [],
			},
		],
	},
];

