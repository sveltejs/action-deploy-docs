import marked from "marked";

import { extract_frontmatter, link_renderer } from "./markdown";

import { make_session_slug_processor } from "./slug";
import { highlight } from "./highlight";

import type { language } from "./highlight";

export const SLUG_PRESERVE_UNICODE = false;
export const SLUG_SEPARATOR = "_";

const make_slug = make_session_slug_processor({
	preserve_unicode: SLUG_PRESERVE_UNICODE,
	separator: SLUG_SEPARATOR,
});

type section = { slug: string; title: string; sections: section[] };
interface FormattedFile {
	content: string;
	title: string;
	slug: string;
	file: string;
	sections: section[];
}

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

function heading_renderer(
	text: string,
	level: number,
	rawtext: string
): string {
	let slug;

	const match = /<a href="([^"]+)"[^>]*>(.+)<\/a>/.exec(text);

	if (match) {
		slug = match[1];
		text = match[2];
	} else {
		slug = make_slug(rawtext);
	}

	if (level === 3 || level === 4) {
		const title = text.replace(/<\/?code>/g, "");
		const prev_section = section_stack[section_stack.length - 1];
		console.log(`${title}$--{level}`);
		console.log(`prev_sections: ${prev_section}`);
		console.log(`section_stack: ${section_stack}`);
		console.log("\n");
		if (level > prev_level) {
			section_stack.push(prev_section[prev_section.length - 1].sections || []);
		} else if (level < prev_level) {
			section_stack.pop();
		}

		section_stack[section_stack.length - 1].push({
			slug,
			title,
			sections: [],
		});
		prev_level = level;
	}

	return `
					<h${level}>
						<span id="${slug}" class="offset-anchor" ${
		level > 4 ? "data-scrollignore" : ""
	}></span>
						<a href="docs#${slug}" class="anchor" aria-hidden="true"></a>
						${text}
					</h${level}>`;
}

const renderer = new marked.Renderer();

renderer.link = link_renderer;
renderer.code = code_renderer;
renderer.heading = heading_renderer;
renderer.hr = hr_renderer;

export function format_api(file: string, markdown: string): FormattedFile {
	const { content, metadata } = extract_frontmatter(markdown);
	const section_slug = make_slug(metadata.title);

	// reset the stateful stuff
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
		sections,
	};
}
