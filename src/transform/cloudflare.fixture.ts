import { FormattedFile } from "../format/format_api";

const one: FormattedFile = {
	content: "test",
	title: "Introduction",
	slug: "Introduction",
	file: "00-introduction.md",
	sections: [
		{
			slug: "Before_we_begin",
			title: "Before we begin",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
		{
			slug: "What_is_SvelteKit",
			title: "What is SvelteKit?",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
		{
			slug: "Getting_started",
			title: "Getting started",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
	],
};
const two: FormattedFile = {
	content: "test2",
	title: "Introduction2",
	slug: "Introduction_2",
	file: "00-introduction-2.md",
	sections: [
		{
			slug: "Before_we_begin",
			title: "Before we begin",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
		{
			slug: "What_is_SvelteKit",
			title: "What is SvelteKit?",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
		{
			slug: "Getting_started",
			title: "Getting started",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
	],
};

export const three: FormattedFile = {
	content: "test3",
	title: "Introduction3",
	slug: "Introduction_3",
	file: "00-introduction-3.md",
	sections: [
		{
			slug: "Before_we_begin",
			title: "Before we begin",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
		{
			slug: "What_is_SvelteKit",
			title: "What is SvelteKit?",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
		{
			slug: "Getting_started",
			title: "Getting started",
			sections: [
				{
					slug: "Before_we_begin",
					title: "Before we begin",
					sections: [],
				},
				{
					slug: "What_is_SvelteKit",
					title: "What is SvelteKit?",
					sections: [],
				},
				{
					slug: "Getting_started",
					title: "Getting started",
					sections: [],
				},
			],
		},
	],
};
export const base: FormattedFile[] = [one, two, three];

type section = { slug: string; title: string; sections: section[] };

export interface ListItem {
	title: string;
	slug: string;
	file: string;
	sections: section[];
}

export const list: ListItem[] = [
	{
		title: "Introduction",
		slug: "Introduction",
		file: "00-introduction.md",
		sections: [
			{
				slug: "Before_we_begin",
				title: "Before we begin",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
			{
				slug: "What_is_SvelteKit",
				title: "What is SvelteKit?",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
			{
				slug: "Getting_started",
				title: "Getting started",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
		],
	},
	{
		title: "Introduction2",
		slug: "Introduction_2",
		file: "00-introduction-2.md",
		sections: [
			{
				slug: "Before_we_begin",
				title: "Before we begin",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
			{
				slug: "What_is_SvelteKit",
				title: "What is SvelteKit?",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
			{
				slug: "Getting_started",
				title: "Getting started",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
		],
	},
	{
		title: "Introduction3",
		slug: "Introduction_3",
		file: "00-introduction-3.md",
		sections: [
			{
				slug: "Before_we_begin",
				title: "Before we begin",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
			{
				slug: "What_is_SvelteKit",
				title: "What is SvelteKit?",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
			{
				slug: "Getting_started",
				title: "Getting started",
				sections: [
					{
						slug: "Before_we_begin",
						title: "Before we begin",
						sections: [],
					},
					{
						slug: "What_is_SvelteKit",
						title: "What is SvelteKit?",
						sections: [],
					},
					{
						slug: "Getting_started",
						title: "Getting started",
						sections: [],
					},
				],
			},
		],
	},
];

export const cf_full = {
	key: "svelte@latest:docs:content",
	value: JSON.stringify(base),
};
export const cf_list = {
	key: "svelte@latest:docs:list",
	value: JSON.stringify(list),
};

export const cf_contents_keyby_slug = [
	{ key: "svelte@latest:docs:Introduction", value: JSON.stringify(one) },
	{ key: "svelte@latest:docs:Introduction_2", value: JSON.stringify(two) },
	{ key: "svelte@latest:docs:Introduction_3", value: JSON.stringify(three) },
];

export const cf_contents_keyby_file = [
	{ key: "svelte@latest:docs:00-introduction.md", value: JSON.stringify(one) },
	{
		key: "svelte@latest:docs:00-introduction-2.md",
		value: JSON.stringify(two),
	},
	{
		key: "svelte@latest:docs:00-introduction-3.md",
		value: JSON.stringify(three),
	},
];

export const cf_full_next = {
	key: "svelte@next:docs:content",
	value: JSON.stringify(base),
};
export const cf_list_next = {
	key: "svelte@next:docs:list",
	value: JSON.stringify(list),
};

export const cf_contents_keyby_slug_next = [
	{ key: "svelte@next:docs:Introduction", value: JSON.stringify(one) },
	{ key: "svelte@next:docs:Introduction_2", value: JSON.stringify(two) },
	{ key: "svelte@next:docs:Introduction_3", value: JSON.stringify(three) },
];
