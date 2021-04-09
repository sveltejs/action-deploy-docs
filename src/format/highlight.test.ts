import { suite } from "uvu";
import * as assert from "uvu/assert";

import type { Root, Paragraph } from "mdast";
import unified from "unified";
import markdown from "remark-parse";

import { highlight, highight_code_block } from "./highlight";

const _highlight = suite("highlight");
const highlight_block = suite("highight_code_block");

const processor = unified().use(markdown).use(highight_code_block);

_highlight("does not highlight other languages", () => {
	const highlighted = highlight("cd ./somedir\ncat file.txt", "bash");
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-bash'><code><span class="token builtin class-name">cd</span> ./somedir
<span class="token function">cat</span> file.txt</code></pre></div>`
	);
});

_highlight("highlights bash", () => {
	const highlighted = highlight("cd ./somedir\ncat file.txt", "bash");
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-bash'><code><span class="token builtin class-name">cd</span> ./somedir
<span class="token function">cat</span> file.txt</code></pre></div>`
	);
});

_highlight("highlights html", () => {
	const highlighted = highlight(`<div attr="some-attr">hello</div>`, "html");
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-markup'><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">attr</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>some-attr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre></div>`
	);
});

_highlight("highlights svelte", () => {
	const highlighted = highlight(
		`{#each x as z, i (key)}<p>hi</p>{/each}`,
		"sv"
	);
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-svelte'><code><span class="token each"><span class="token punctuation">{</span><span class="token keyword">#each</span> <span class="token language-javascript">x </span><span class="token keyword">as</span> <span class="token language-javascript">z<span class="token punctuation">,</span> i </span><span class="token language-javascript"><span class="token punctuation">(</span>key<span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>hi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token each"><span class="token punctuation">{</span><span class="token keyword">/each</span><span class="token punctuation">}</span></span></code></pre></div>`
	);
});

_highlight("highlights javascript", () => {
	const highlighted = highlight(`console.log('boo')`, "js");
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-javascript'><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'boo'</span><span class="token punctuation">)</span></code></pre></div>`
	);
});

_highlight("highlights css", () => {
	const highlighted = highlight(`.thing { color: pink; }`, "css");
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-css'><code><span class="token selector">.thing</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> pink<span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre></div>`
	);
});

_highlight("highlights diff", () => {
	const highlighted = highlight(`+ doodaa\notherthing\n- thingy'n`, "diff");
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-diff'><code><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> doodaa
</span></span>otherthing
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> thingy'n</span></span></code></pre></div>`
	);
});

_highlight("does not highlight other languages", () => {
	const highlighted = highlight("heloooo$_$ boo\nbooboo", "");
	assert.snapshot(
		highlighted,
		`<div class="code-block"><pre class='language-'><code>heloooo$_$ boo
booboo</code></pre></div>`
	);
});

highlight_block("returns the correctly transformed AST", async () => {
	const src =
		"```bash\n" +
		'RUN bash -lc "rvm install ruby-2.5.1 && \\nrvm use ruby-ruby-2.5.1 --default"\n' +
		"```";

	const AST = (await processor.run(processor.parse(src))) as Root;

	assert.equal(
		AST.children[0].value,
		`<div class="code-block"><pre class='language-bash'><code>RUN <span class=\"token function\">bash</span> -lc <span class=\"token string\">\"rvm install ruby-2.5.1 &amp;&amp; <span class=\"token entity\" title=\"\\n\">\\n</span>rvm use ruby-ruby-2.5.1 --default\"</span></code></pre></div>`
	);
	assert.equal(AST.children[0].type, `html`);
});

highlight_block("inlineCode blocks should be untouched", async () => {
	const src = "`some-code`";

	const AST = (await processor.run(processor.parse(src))) as Root;

	assert.equal(AST.children[0].type, `paragraph`);
	assert.equal((AST.children[0] as Paragraph).children[0].value, `some-code`);
});

_highlight.run();
highlight_block.run();
