const RE_FIRST_H1 = /(^|\n)# (.+)\n/;
const RE_HEADING = /(?:^|(?<=\n))(#{1,6} )(?=.+)/g;

// strip first h1, hope there aren't any others
// then increment all headings by 1

export function increment_headings(source: string): string {
	return source.replace(RE_FIRST_H1, "").replace(RE_HEADING, "#$1");
}
