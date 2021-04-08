import marked from "marked";

import { extract_frontmatter, link_renderer } from "./links";

import { make_session_slug_processor } from "./slug";
import { highlight } from "./highlight";

import type { language } from "./highlight";

export const SLUG_PRESERVE_UNICODE = false;
export const SLUG_SEPARATOR = "-";

const make_slug = make_session_slug_processor({
	preserve_unicode: SLUG_PRESERVE_UNICODE,
	separator: SLUG_SEPARATOR,
});

type section = { slug: string; title: string; sections: section[] };
export type FormattedFile = {
	content: string;
	title: string;
	slug: string;
	file: string;
	sections: section[];
};

let block_open = false;

function code_renderer(source: string, lang: string): string {
	source = source.replace(/^ +/gm, (match) => match.split("    ").join("\t"));

	const html = `<div class='code-block'>${highlight(
		source,
		lang as language
	)}</div>`;

	if (block_open) {
		block_open = false;
		return `</div><div class="code">${html}</div></div>`;
	}

	return html;
}

function hr_renderer(): string {
	block_open = true;

	return '<div class="side-by-side"><div class="copy">';
}

let prev_level = 3;
let sections: section[] = [];
let section_stack = [sections];
let dir = "";
let section_title = "";

function get_slug_segments(): string[] {
	return section_stack.map((section, i) => {
		if (i > 0) return "";
		return section[section.length - 1].slug;
	});
}

// function heading_renderer(
// 	text: string,
// 	level: number,
// 	rawtext: string
// ): string {
// 	if (level < 3 || level > 5)
// 		throw new Error(
// 			`Only level 3 and 4 headings are allowed. Got level ${level} heading.`
// 		);

// 	let slug = make_slug(
// 		level === 3
// 			? [section_title, rawtext].join(" ")
// 			: [...get_slug_segments(), rawtext].join(" ")
// 	);

// 	if (level === 3 || level === 4) {
// 		const title = text.replace(/<\/?code>/g, "");
// 		const prev_section = section_stack[section_stack.length - 1];

// 		if (level > prev_level) {
// 			section_stack.push(prev_section[prev_section.length - 1].sections || []);
// 		} else if (level < prev_level) {
// 			section_stack.pop();
// 		}

// 		section_stack[section_stack.length - 1].push({
// 			slug,
// 			title,
// 			sections: [],
// 		});
// 		prev_level = level;
// 	}

// 	return `
// 					<h${level}>
// 						<span id="${slug}" class="offset-anchor" ${
// 		level > 4 ? "data-scrollignore" : ""
// 	}></span>
// 						<a href="${dir}#${slug}" class="anchor" aria-hidden="true"></a>
// 						${text}
// 					</h${level}>`;
// }

const renderer = new marked.Renderer();

renderer.link = link_renderer;
renderer.code = code_renderer;
renderer.heading = heading_renderer;
renderer.hr = hr_renderer;

export function format_api(
	file: string,
	markdown: string,
	directory: string,
	name?: string
): FormattedFile {
	let content;
	let title;

	try {
		const fm = extract_frontmatter(markdown);
		content = fm.content;
		title = fm.metadata.title;
		section_title = title;
	} catch (e) {
		content = markdown;
		title = name;
		section_title = "";
	}

	const section_slug = make_slug(title);

	// reset the stateful stuff
	// dir = directory;
	// prev_level = 3;
	// sections = [];
	// section_stack = [sections];
	// block_open = false;

	const html = marked(content, { renderer });

	return {
		content: html,
		title: title,
		slug: section_slug,
		file,
		sections,
	};
}

export function format_blog(file: string, markdown: string, directory: string) {
	const match = /^(\d+-\d+-\d+)-(.+)\.md$/.exec(file);
	if (!match) throw new Error(`Invalid filename '${file}'`);

	const [, pubdate, slug] = match;

	const { content, metadata } = extract_frontmatter(markdown);
	section_title = metadata.title;

	const section_slug = make_slug(metadata.title);

	// reset the stateful stuff
	dir = directory;
	prev_level = 3;
	sections = [];
	section_stack = [sections];
	block_open = false;

	const html = marked(content, { renderer });

	return {
		content: html,
		title: metadata.title,
		slug: section_slug,
		file,
		date: {
			pubdate,
			dateString: new Date(`${pubdate} EDT`).toString(),
		},
		sections,
	};
}


