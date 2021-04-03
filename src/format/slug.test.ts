import { suite } from "uvu";
import * as assert from "uvu/assert";

import { url_safe_processor, unicode_safe_processor } from "./slug";

const url_safe = suite("url_safe_processor");
const unicode_safe = suite("unicode_safe_processor");

url_safe("ascii: space separated words", () => {
	assert.equal(url_safe_processor("Text expressions"), `text-expressions`);
});

url_safe("ascii: numbered text", () => {
	assert.equal(url_safe_processor("1. export creates"), `1-export-creates`);
});

url_safe("ascii: punctuated text", () => {
	assert.equal(url_safe_processor("svelte.VERSION"), `svelte-version`);
});

url_safe("ascii: text starting with the dollar sign", () => {
	assert.equal(url_safe_processor("$destroy method"), `$destroy-method`);
});

url_safe("ascii: numbered text containing the dollar sign", () => {
	assert.equal(url_safe_processor("1. export $destroy"), `1-export-$destroy`);
});

url_safe("ascii: text containing the equal char", () => {
	assert.equal(
		url_safe_processor("script context=module"),
		`script-context-module`
	);
});

url_safe("ascii: text containing the colon char", () => {
	assert.equal(url_safe_processor("svelte:body"), `svelte-body`);
});

url_safe("ascii: text containing the slash char", () => {
	assert.equal(url_safe_processor("svelte/motion"), `svelte-motion`);
});

url_safe("ascii: text containing the comma char", () => {
	assert.equal(url_safe_processor("svelte, motion"), `svelte-motion`);
});

url_safe("unicode: should translate symbols to English", () => {
	assert.equal(url_safe_processor("Ich ♥ Deutsch"), `ich-love-deutsch`);
});

url_safe("unicode: should remove emoji", () => {
	assert.equal(url_safe_processor("Ich 😍 Deutsch"), `ich-deutsch`);
});

url_safe("cyrillic: space separated words", () => {
	assert.equal(
		url_safe_processor("Всплытие и перехват событий"),
		`vsplytie-i-perehvat-sobytij`
	);
});

url_safe("cyrillic: numbered text", () => {
	assert.equal(
		url_safe_processor("1 Всплытие и перехват событий"),
		`1-vsplytie-i-perehvat-sobytij`
	);
});

url_safe("cyrillic: punctuated text", () => {
	assert.equal(
		url_safe_processor(".Всплытие.и.перехват событий"),
		`vsplytie-i-perehvat-sobytij`
	);
});

url_safe("cyrillic: text starting with the dollar sign", () => {
	assert.equal(
		url_safe_processor("$Всплытие $ перехват событий"),
		`$vsplytie-$-perehvat-sobytij`
	);
});

url_safe("cyrillic: text containing the dollar sign", () => {
	assert.equal(url_safe_processor("Всплытие$перехват"), `vsplytie$perehvat`);
});

url_safe("cyrillic: text containing the equal char", () => {
	assert.equal(
		url_safe_processor("Всплытие = перехват=событий"),
		`vsplytie-perehvat-sobytij`
	);
});

url_safe("cyrillic: text containing the colon char", () => {
	assert.equal(
		url_safe_processor("Всплытие : перехват:событий"),
		`vsplytie-perehvat-sobytij`
	);
});

url_safe("cyrillic: text containing the slash char", () => {
	assert.equal(
		url_safe_processor("Всплытие / перехват/событий"),
		`vsplytie-perehvat-sobytij`
	);
});

url_safe("cyrillic: text containing the comma char", () => {
	assert.equal(url_safe_processor("Всплытие, перехват"), `vsplytie-perehvat`);
});

url_safe("ascii + cyrillic: space separated words", () => {
	assert.equal(
		url_safe_processor("Всплытие и export перехват событий"),
		`vsplytie-i-export-perehvat-sobytij`
	);
});

url_safe(
	"ascii + cyrillic: ascii word concatenated to a cyricllic word",
	() => {
		assert.equal(url_safe_processor("exportВсплытие"), "exportvsplytie");
	}
);

url_safe(
	"ascii + cyrillic: cyricllic word concatenated to an ascii word",
	() => {
		assert.equal(url_safe_processor("Всплытиеexport"), `vsplytieexport`);
	}
);

url_safe("ascii + cyrillic: numbered text", () => {
	assert.equal(
		url_safe_processor("1 export Всплытие и перехват событий"),
		`1-export-vsplytie-i-perehvat-sobytij`
	);
});

url_safe("ascii + cyrillic: punctuated text", () => {
	assert.equal(
		url_safe_processor(".Всплытие.export.и.перехват событий"),
		`vsplytie-export-i-perehvat-sobytij`
	);
});

url_safe(
	"ascii + cyrillic: text starting with the dollar sign, followed by ascii char",
	() => {
		assert.equal(
			url_safe_processor("$exportВсплытие перехват событий"),
			`$exportvsplytie-perehvat-sobytij`
		);
	}
);

url_safe(
	"ascii + cyrillic: text starting with the dollar sign, followed by unicode char",
	() => {
		assert.equal(
			url_safe_processor("$Всплытие export перехват событий"),
			`$vsplytie-export-perehvat-sobytij`
		);
	}
);

url_safe(
	"ascii + cyrillic: text containing the dollar sign, followed by ascii char",
	() => {
		assert.equal(
			url_safe_processor(
				"export $destroy a component prop Всплытие и перехват событий"
			),
			`export-$destroy-a-component-prop-vsplytie-i-perehvat-sobytij`
		);
	}
);

url_safe(
	"ascii + cyrillic: text containing the dollar sign, followed by unicode char",
	() => {
		assert.equal(
			url_safe_processor(
				"Всплытие export $Всплытие a component prop Всплытие и перехват событий"
			),
			`vsplytie-export-$vsplytie-a-component-prop-vsplytie-i-perehvat-sobytij`
		);
	}
);

url_safe("ascii + cyrillic: text containing the equal char", () => {
	assert.equal(
		url_safe_processor("script context=module Всплытие=и перехват событий"),
		`script-context-module-vsplytie-i-perehvat-sobytij`
	);
});

url_safe("ascii + cyrillic: text containing the colon char", () => {});
assert.equal(
	url_safe_processor("svelte:body Всплытие и:перехват событий"),
	`svelte-body-vsplytie-i-perehvat-sobytij`
);

url_safe("ascii + cyrillic: text containing the slash char", () => {
	assert.equal(
		url_safe_processor("svelte/motion Всплытие и / перехват/событий"),
		`svelte-motion-vsplytie-i-perehvat-sobytij`
	);
});

url_safe("ascii + cyrillic: text containing the comma char", () => {
	assert.equal(url_safe_processor("Всплытие, export"), `vsplytie-export`);
});

unicode_safe("ascii: space separated words", () => {
	assert.equal(unicode_safe_processor("Text expressions"), `text-expressions`);
});

unicode_safe("ascii: numbered text", () => {
	assert.equal(unicode_safe_processor("1. export creates"), `1-export-creates`);
});

unicode_safe("ascii: punctuated text", () => {
	assert.equal(unicode_safe_processor("svelte.VERSION"), `svelte-version`);
});

unicode_safe("ascii: text starting with the dollar sign", () => {
	assert.equal(unicode_safe_processor("$destroy method"), `$destroy-method`);
});

unicode_safe("ascii: numbered text containing the dollar sign", () => {
	assert.equal(
		unicode_safe_processor("1. export $destroy"),
		`1-export-$destroy`
	);
});

unicode_safe("ascii: text containing the equal char", () => {
	assert.equal(
		unicode_safe_processor("script context=module"),
		`script-context-module`
	);
});

unicode_safe("ascii: text containing the colon char", () => {
	assert.equal(unicode_safe_processor("svelte:body"), `svelte-body`);
});

unicode_safe("ascii: text containing the slash char", () => {
	assert.equal(unicode_safe_processor("svelte/motion"), `svelte-motion`);
});

unicode_safe("ascii: text containing the comma char", () => {
	assert.equal(unicode_safe_processor("svelte, motion"), `svelte-motion`);
});

unicode_safe("unicode: should preserve symbols", () => {
	assert.equal(unicode_safe_processor("Ich ♥ Deutsch"), `ich-love-deutsch`);
});

unicode_safe("unicode: should remove emoji", () => {
	assert.equal(unicode_safe_processor("Ich 😍 Deutsch"), `ich-deutsch`);
});

unicode_safe("cyricllic: space separated words", () => {
	assert.equal(
		unicode_safe_processor("Всплытие и перехват событий"),
		`всплытие-и-перехват-событий`
	);
});

unicode_safe("cyricllic: numbered text", () => {
	assert.equal(
		unicode_safe_processor("1 Всплытие и перехват событий"),
		`1-всплытие-и-перехват-событий`
	);
});

unicode_safe("cyricllic: punctuated text", () => {
	assert.equal(
		unicode_safe_processor(".Всплытие.и.перехват событий"),
		`всплытие-и-перехват-событий`
	);
});

unicode_safe("cyricllic: text starting with the dollar sign", () => {
	assert.equal(
		unicode_safe_processor("$Всплытие $ перехват событий"),
		`$-всплытие-$-перехват-событий`
	);
});

unicode_safe("cyricllic: text containing the dollar sign", () => {
	assert.equal(
		unicode_safe_processor("Всплытие$перехват"),
		`всплытие-$-перехват`
	);
});

unicode_safe("cyricllic: text containing the equal char", () => {
	assert.equal(
		unicode_safe_processor("Всплытие = перехват=событий"),
		`всплытие-перехват-событий`
	);
});

unicode_safe("cyricllic: text containing the colon char", () => {
	assert.equal(
		unicode_safe_processor("Всплытие : перехват:событий"),
		`всплытие-перехват-событий`
	);
});

unicode_safe("cyricllic: text containing the slash char", () => {
	assert.equal(
		unicode_safe_processor("Всплытие / перехват/событий"),
		`всплытие-перехват-событий`
	);
});

unicode_safe("cyricllic: text containing the comma char", () => {
	assert.equal(
		unicode_safe_processor("Всплытие, перехват"),
		`всплытие-перехват`
	);
});

unicode_safe("ascii + cyricllic: space separated words", () => {
	assert.equal(
		unicode_safe_processor("Всплытие и export перехват событий"),
		`всплытие-и-export-перехват-событий`
	);
});

unicode_safe(
	"ascii + cyricllic: ascii word concatenated to a cyricllic word",
	() => {
		assert.equal(unicode_safe_processor("exportВсплытие"), `export-всплытие`);
	}
);

unicode_safe(
	"ascii + cyricllic: cyricllic word concatenated to an ascii word",
	() => {
		assert.equal(unicode_safe_processor("Всплытиеexport"), `всплытие-export`);
	}
);

unicode_safe("ascii + cyricllic: numbered text", () => {
	assert.equal(
		unicode_safe_processor("1 export Всплытие и перехват событий"),
		`1-export-всплытие-и-перехват-событий`
	);
});

unicode_safe("ascii + cyricllic: punctuated text", () => {
	assert.equal(
		unicode_safe_processor(".Всплытие.export.и.перехват событий"),
		`всплытие-export-и-перехват-событий`
	);
});

unicode_safe(
	"ascii + cyricllic: text starting with the dollar sign, followed by ascii char",
	() => {
		assert.equal(
			unicode_safe_processor("$exportВсплытие перехват событий"),
			`$export-всплытие-перехват-событий`
		);
	}
);

unicode_safe(
	"ascii + cyricllic: text starting with the dollar sign, followed by unicode char",
	() => {
		assert.equal(
			unicode_safe_processor("$Всплытие export перехват событий"),
			`$-всплытие-export-перехват-событий`
		);
	}
);

unicode_safe(
	"ascii + cyricllic: text containing the dollar sign, followed by ascii char",
	() => {
		assert.equal(
			unicode_safe_processor(
				"export $destroy a component prop Всплытие и перехват событий"
			),
			`export-$destroy-a-component-prop-всплытие-и-перехват-событий`
		);
	}
);

unicode_safe(
	"ascii + cyricllic: text containing the dollar sign, followed by unicode char",
	() => {
		assert.equal(
			unicode_safe_processor(
				"Всплытие export $Всплытие a component prop Всплытие и перехват событий"
			),
			`всплытие-export-$-всплытие-a-component-prop-всплытие-и-перехват-событий`
		);
	}
);

unicode_safe("ascii + cyricllic: text containing the equal char", () => {
	assert.equal(
		unicode_safe_processor("script context=module Всплытие=и перехват событий"),
		`script-context-module-всплытие-и-перехват-событий`
	);
});

unicode_safe("ascii + cyricllic: ext containing the colon char", () => {
	assert.equal(
		unicode_safe_processor("svelte:body Всплытие и:перехват событий"),
		`svelte-body-всплытие-и-перехват-событий`
	);
});

unicode_safe("ascii + cyricllic: text containing the slash char", () => {
	assert.equal(
		unicode_safe_processor("svelte/motion Всплытие и / перехват/событий"),
		`svelte-motion-всплытие-и-перехват-событий`
	);
});

unicode_safe("ascii + cyricllic: text containing the comma char", () => {
	assert.equal(unicode_safe_processor("Всплытие, export"), `всплытие-export`);
});

url_safe.run();
unicode_safe.run();
