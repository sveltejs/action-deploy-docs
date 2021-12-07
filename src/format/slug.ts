import slugify from "@sindresorhus/slugify";

export const SLUG_PRESERVE_UNICODE = false;
export const SLUG_SEPARATOR = "-";

interface ProcessorOptions {
	separator: string;
}

interface Chunk {
	type: "pass" | "process";
	string: string;
}

interface ProcessedParts {
	chunks: Chunk[];
	current: Chunk;
}

export function url_safe_processor(
	url: string,
	opts?: ProcessorOptions
): string {
	const { separator = SLUG_SEPARATOR } = opts || {};

	return slugify(url, {
		customReplacements: [
			// runs before any other transformations
			["$", "DOLLAR"], // `$destroy` & co
			["-", "DASH"], // conflicts with `separator`
		],
		separator,
		decamelize: false,
		lowercase: true,
	})
		.replace(/DOLLAR/gi, "$")
		.replace(/DASH/gi, "-");
}

const alpha_num_regex = /[a-zA-Z0-9]/;
const unicode_regex = /\p{Letter}/u;

const is_non_alpha_num_unicode = (string: string) =>
	!alpha_num_regex.test(string) && unicode_regex.test(string);

export function unicode_safe_processor(
	url: string,
	opts?: ProcessorOptions
): string {
	const { separator = SLUG_SEPARATOR } = opts || {};

	return url
		.split("")
		.reduce<ProcessedParts>(
			(accum, char, index, array) => {
				const type = is_non_alpha_num_unicode(char) ? "pass" : "process";

				if (index === 0) {
					accum.current = { type, string: char };
				} else if (type === accum.current.type) {
					accum.current.string += char;
				} else {
					accum.chunks.push(accum.current);
					accum.current = { type, string: char };
				}

				if (index === array.length - 1) {
					accum.chunks.push(accum.current);
				}
				return accum;
			},
			{ chunks: [], current: { type: "process", string: "" } }
		)
		.chunks.reduce<string[]>((accum, chunk) => {
			const processed =
				chunk.type === "process"
					? url_safe_processor(chunk.string)
					: chunk.string;

			processed.length > 0 && accum.push(processed);

			return accum;
		}, [])
		.join(separator)
		.toLowerCase();
}

export function make_session_slug_processor({
	preserve_unicode = SLUG_PRESERVE_UNICODE,
	separator = SLUG_SEPARATOR,
}) {
	const processor = preserve_unicode
		? unicode_safe_processor
		: url_safe_processor;

	return function (url: string, seen_slugs: Map<string, number>) {
		const slug = processor(url, { separator });
		let count;
		if ((count = seen_slugs.get(slug))) {
			throw new Error(
				`Found duplicate slug: "${slug}" when slugifying: "${url}".
Duplicate slugs are not allowed. You need to take yourself outside and have a word with yourself.`
			);
		} else {
			seen_slugs.set(slug, 1);
			return slug;
		}
	};
}
