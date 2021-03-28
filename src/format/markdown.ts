interface Frontmatter {
	metadata: Record<string, string>;
	content: string;
}

export const RE_FRONTMATTER = /---\r?\n([\s\S]+?)\r?\n---/;

export function extract_frontmatter(markdown: string): Frontmatter {
	const match = RE_FRONTMATTER.exec(markdown);
	const frontMatter = match[1];
	const content = markdown.slice(match[0].length);

	const metadata: Record<string, string> = {};
	frontMatter.split("\n").forEach((pair) => {
		const colonIndex = pair.indexOf(":");
		metadata[pair.slice(0, colonIndex).trim()] = pair
			.slice(colonIndex + 1)
			.trim();
	});

	// reset regex
	RE_FRONTMATTER.lastIndex = 0;

	return { metadata, content };
}

export function link_renderer(
	href: string,
	title: string,
	text: string
): string {
	let target_attr = "";
	let title_attr = "";

	if (href.startsWith("http")) {
		target_attr = ' target="_blank"';
	}

	if (title !== null) {
		title_attr = ` title="${title}"`;
	}

	return `<a href="${href}"${target_attr}${title_attr} rel="noopener noreferrer">${text}</a>`;
}
