import slugify from "@sindresorhus/slugify";

export const SLUG_SEPARATOR = "_";

interface ProcessorOptions {
	separator: string;
}

export const urlsafe_slug_processor = (
	url: string,
	opts?: ProcessorOptions
): string => {
	const { separator = SLUG_SEPARATOR } = opts || {};

	return slugify(url, {
		customReplacements: [
			// runs before any other transformations
			["$", "DOLLAR"], // `$destroy` & co
			["-", "DASH"], // conflicts with `separator`
		],
		separator,
		decamelize: false,
		lowercase: false,
	})
		.replace(/DOLLAR/g, "$")
		.replace(/DASH/g, "-");
};
