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
export const docs_readme_in = [
	{
		name: "README.md",
		content: `# docs1 content
asdasdas

## hello

asdasd

### Third heading

asdasdasd`,
	},
];

export const docs_readme_full_out: Doc[] = [
	{
		title: "@sveltejs/adapter-vercel",
		slug: "adapter-vercel",
		file: "README.md",
		sections: [
			{
				slug: "hello",
				title: "hello",
				sections: [
					{
						slug: "hello-third-heading",
						title: "Third heading",
						sections: [],
					},
				],
			},
		],
		content:
			'<p>asdasdas</p>\n<h3 id="hello">hello</h3>\n<p>asdasd</p>\n<h4 id="hello-third-heading">Third heading</h4>\n<p>asdasdasd</p>',
	},
];

export const docs_readme_list_out: DocMeta[] = [
	{
		title: "@sveltejs/adapter-vercel",
		slug: "adapter-vercel",
		file: "README.md",
		sections: [
			{
				slug: "hello",
				title: "hello",
				sections: [
					{
						slug: "hello-third-heading",
						title: "Third heading",
						sections: [],
					},
				],
			},
		],
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
			'<h3 id="part-1-docs1-content">docs1 content</h3>',
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
			'<h3 id="part-2-docs2-content">docs2 content</h3>',
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
			'<h3 id="part-3-docs3-content">docs3 content</h3>',
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
