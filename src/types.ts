// Docs, FAQs, Migrating
export type section = { slug: string; title: string; sections: section[] };

export type BlogMeta = {
	title: string;
	slug: string;
	file: string;
	date: {
		pretty: string;
		numeric: string;
	};
};

export type Blog = BlogMeta & {
	content: string;
};

export type FaqMeta = {
	title: string;
	slug: string;
	file: string;
	order: number;
};

export type Faq = FaqMeta & {
	content: string;
};

export type DocMeta = {
	title: string;
	slug: string;
	file: string;
	sections: section[];
};

export type Doc = DocMeta & {
	content: string;
};

// file for repl
export type File = {
	name: string; // filepath
	type: string;
	content: string;
};

// Tutorials
export type TutorialMeta = {
	name: string;
	slug: string;
};
// single tutorial
export type Tutorial = TutorialMeta & {
	content: string;
	initial: File[];
	complete: File[]; // not a feature for every tutorial
};

export type TutorialCategory = {
	name: string;
	tutorials: TutorialMeta[];
};

export type tutorials = TutorialCategory[];

// Examples
export type ExampleMeta = {
	name: string;
	slug: string;
	thumbnail: string;
};

// single example
export type Example = ExampleMeta & {
	files: File[];
};

export type ExampleCategory = {
	name: string;
	examples: ExampleMeta[];
};
