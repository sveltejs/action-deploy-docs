import { suite } from "uvu";
import * as assert from "uvu/assert";

import { urlsafe_slug_processor } from "./slug";

const url_safe = suite("urlsafe_slug_processor");

url_safe("ascii: space separated words", () => {
	assert.equal(urlsafe_slug_processor("Text expressions"), `Text_expressions`);
});

url_safe("ascii: numbered text", () => {
	assert.equal(urlsafe_slug_processor("1. export creates"), `1_export_creates`);
});

url_safe("ascii: punctuated text", () => {
	assert.equal(urlsafe_slug_processor("svelte.VERSION"), `svelte_VERSION`);
});

url_safe("ascii: text starting with the dollar sign", () => {
	assert.equal(urlsafe_slug_processor("$destroy method"), `$destroy_method`);
});

url_safe("ascii: numbered text containing the dollar sign", () => {
	assert.equal(
		urlsafe_slug_processor("1. export $destroy"),
		`1_export_$destroy`
	);
});

url_safe("ascii: text containing the equal char", () => {
	assert.equal(
		urlsafe_slug_processor("script context=module"),
		`script_context_module`
	);
});

url_safe("ascii: text containing the colon char", () => {
	assert.equal(urlsafe_slug_processor("svelte:body"), `svelte_body`);
});

url_safe("ascii: text containing the slash char", () => {
	assert.equal(urlsafe_slug_processor("svelte/motion"), `svelte_motion`);
});

url_safe("ascii: text containing the comma char", () => {
	assert.equal(urlsafe_slug_processor("svelte, motion"), `svelte_motion`);
});

url_safe("unicode: should translate symbols to English", () => {
	assert.equal(urlsafe_slug_processor("Ich ♥ Deutsch"), `Ich_love_Deutsch`);
});

url_safe("unicode: should remove emoji", () => {
	assert.equal(urlsafe_slug_processor("Ich 😍 Deutsch"), `Ich_Deutsch`);
});

url_safe("cyrillic: space separated words", () => {
	assert.equal(
		urlsafe_slug_processor("Всплытие и перехват событий"),
		`Vsplytie_i_perehvat_sobytij`
	);
});

url_safe("cyrillic: numbered text", () => {
	assert.equal(
		urlsafe_slug_processor("1 Всплытие и перехват событий"),
		`1_Vsplytie_i_perehvat_sobytij`
	);
});

url_safe("cyrillic: punctuated text", () => {
	assert.equal(
		urlsafe_slug_processor(".Всплытие.и.перехват событий"),
		`Vsplytie_i_perehvat_sobytij`
	);
});

url_safe("cyrillic: text starting with the dollar sign", () => {
	assert.equal(
		urlsafe_slug_processor("$Всплытие $ перехват событий"),
		`$Vsplytie_$_perehvat_sobytij`
	);
});

url_safe("cyrillic: text containing the dollar sign", () => {
	assert.equal(
		urlsafe_slug_processor("Всплытие$перехват"),
		`Vsplytie$perehvat`
	);
});

url_safe("cyrillic: text containing the equal char", () => {
	assert.equal(
		urlsafe_slug_processor("Всплытие = перехват=событий"),
		`Vsplytie_perehvat_sobytij`
	);
});

url_safe("cyrillic: text containing the colon char", () => {
	assert.equal(
		urlsafe_slug_processor("Всплытие : перехват:событий"),
		`Vsplytie_perehvat_sobytij`
	);
});

url_safe("cyrillic: text containing the slash char", () => {
	assert.equal(
		urlsafe_slug_processor("Всплытие / перехват/событий"),
		`Vsplytie_perehvat_sobytij`
	);
});

url_safe("cyrillic: text containing the comma char", () => {
	assert.equal(
		urlsafe_slug_processor("Всплытие, перехват"),
		`Vsplytie_perehvat`
	);
});

url_safe("ascii + cyrillic: space separated words", () => {
	assert.equal(
		urlsafe_slug_processor("Всплытие и export перехват событий"),
		`Vsplytie_i_export_perehvat_sobytij`
	);
});

url_safe(
	"ascii + cyrillic: ascii word concatenated to a cyricllic word",
	() => {
		assert.equal(urlsafe_slug_processor("exportВсплытие"), "exportVsplytie");
	}
);

url_safe(
	"ascii + cyrillic: cyricllic word concatenated to an ascii word",
	() => {
		assert.equal(urlsafe_slug_processor("Всплытиеexport"), `Vsplytieexport`);
	}
);

url_safe("ascii + cyrillic: numbered text", () => {
	assert.equal(
		urlsafe_slug_processor("1 export Всплытие и перехват событий"),
		`1_export_Vsplytie_i_perehvat_sobytij`
	);
});

url_safe("ascii + cyrillic: punctuated text", () => {
	assert.equal(
		urlsafe_slug_processor(".Всплытие.export.и.перехват событий"),
		`Vsplytie_export_i_perehvat_sobytij`
	);
});

url_safe(
	"ascii + cyrillic: text starting with the dollar sign, followed by ascii char",
	() => {
		assert.equal(
			urlsafe_slug_processor("$exportВсплытие перехват событий"),
			`$exportVsplytie_perehvat_sobytij`
		);
	}
);

url_safe(
	"ascii + cyrillic: text starting with the dollar sign, followed by unicode char",
	() => {
		assert.equal(
			urlsafe_slug_processor("$Всплытие export перехват событий"),
			`$Vsplytie_export_perehvat_sobytij`
		);
	}
);

url_safe(
	"ascii + cyrillic: text containing the dollar sign, followed by ascii char",
	() => {
		assert.equal(
			urlsafe_slug_processor(
				"export $destroy a component prop Всплытие и перехват событий"
			),
			`export_$destroy_a_component_prop_Vsplytie_i_perehvat_sobytij`
		);
	}
);

url_safe(
	"ascii + cyrillic: text containing the dollar sign, followed by unicode char",
	() => {
		assert.equal(
			urlsafe_slug_processor(
				"Всплытие export $Всплытие a component prop Всплытие и перехват событий"
			),
			`Vsplytie_export_$Vsplytie_a_component_prop_Vsplytie_i_perehvat_sobytij`
		);
	}
);

url_safe("ascii + cyrillic: text containing the equal char", () => {
	assert.equal(
		urlsafe_slug_processor("script context=module Всплытие=и перехват событий"),
		`script_context_module_Vsplytie_i_perehvat_sobytij`
	);
});

url_safe("ascii + cyrillic: text containing the colon char", () => {});
assert.equal(
	urlsafe_slug_processor("svelte:body Всплытие и:перехват событий"),
	`svelte_body_Vsplytie_i_perehvat_sobytij`
);

url_safe("ascii + cyrillic: text containing the slash char", () => {
	assert.equal(
		urlsafe_slug_processor("svelte/motion Всплытие и / перехват/событий"),
		`svelte_motion_Vsplytie_i_perehvat_sobytij`
	);
});

url_safe("ascii + cyrillic: text containing the comma char", () => {
	assert.equal(urlsafe_slug_processor("Всплытие, export"), `Vsplytie_export`);
});

url_safe.run();
