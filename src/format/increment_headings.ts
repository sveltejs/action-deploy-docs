const RE_HEADING = /(?:^|(?<=\n))(#{1,6})(?=\s+\w+)/g;

export function increment_headings(source: string): string {
	return source.replace(RE_HEADING, "##$1");
}
