import { suite } from "uvu";
import * as assert from "uvu/assert";
import recursive_output from "./fixtures/recursive_output";

import * as path from "path";

import { rc_read_file, transform_files } from "./get_content";

const repo3 = path.join(__dirname, "fixtures", "repo-3");

const recrusive_read = suite("rc_read_file");
const transform = suite("transform_files");

recrusive_read("recursively reads file and dirs", async () => {
	const content = await rc_read_file(repo3);
	assert.equal(content, recursive_output);
});

transform("transforms basic docs", () => {
	const files = {
		name: "repo",
		is_dir: true,
		content: [
			{
				name: "documentation",
				is_dir: true,
				content: [
					{
						name: "docs",
						is_dir: true,
						content: [
							{
								name: "01-boo.md",
								is_dir: true,
								content: "docs1 content",
							},
							{
								name: "02-boo.md",
								is_dir: true,
								content: "docs2 content",
							},
							{
								name: "03-boo.md",
								is_dir: true,
								content: "docs3 content",
							},
						],
					},
					{
						name: "faq",
						is_dir: true,
						content: [
							{
								name: "01-boo.md",
								is_dir: true,
								content: "faq1 content",
							},
							{
								name: "02-boo.md",
								is_dir: true,
								content: "faq2 content",
							},
							{
								name: "03-boo.md",
								is_dir: true,
								content: "faq3 content",
							},
						],
					},
					{
						name: "migrating",
						is_dir: true,
						content: [
							{
								name: "01-boo.md",
								is_dir: true,
								content: "migrating1 content",
							},
							{
								name: "02-boo.md",
								is_dir: true,
								content: "migrating2 content",
							},
							{
								name: "03-boo.md",
								is_dir: true,
								content: "migrating3 content",
							},
						],
					},
					{
						name: "blog",
						is_dir: true,
						content: [
							{
								name: "01-boo.md",
								is_dir: true,
								content: "blog1 content",
							},
							{
								name: "02-boo.md",
								is_dir: true,
								content: "blog2 content",
							},
							{
								name: "03-boo.md",
								is_dir: true,
								content: "blog3 content",
							},
						],
					},
				],
			},
		],
	};
	const output = transform_files(files, "packages", "documentation", "svelte");

	assert.equal(output, [
		[
			"svelte",
			{
				docs: [
					{ name: "01-boo.md", content: "docs1 content" },
					{ name: "02-boo.md", content: "docs2 content" },
					{ name: "03-boo.md", content: "docs3 content" },
				],

				faq: [
					{ name: "01-boo.md", content: "faq1 content" },
					{ name: "02-boo.md", content: "faq2 content" },
					{ name: "03-boo.md", content: "faq3 content" },
				],

				migrating: [
					{ name: "01-boo.md", content: "migrating1 content" },
					{ name: "02-boo.md", content: "migrating2 content" },
					{ name: "03-boo.md", content: "migrating3 content" },
				],

				blog: [
					{ name: "01-boo.md", content: "blog1 content" },
					{ name: "02-boo.md", content: "blog2 content" },
					{ name: "03-boo.md", content: "blog3 content" },
				],
			},
		],
	]);
});

transform("transforms basic docs when some are not present", () => {
	const files = {
		name: "repo",
		is_dir: true,
		content: [
			{
				name: "documentation",
				is_dir: true,
				content: [
					{
						name: "docs",
						is_dir: true,
						content: [
							{
								name: "01-boo.md",
								is_dir: true,
								content: "docs1 content",
							},
							{
								name: "02-boo.md",
								is_dir: true,
								content: "docs2 content",
							},
							{
								name: "03-boo.md",
								is_dir: true,
								content: "docs3 content",
							},
						],
					},
					{
						name: "faq",
						is_dir: true,
						content: [
							{
								name: "01-boo.md",
								is_dir: true,
								content: "faq1 content",
							},
							{
								name: "02-boo.md",
								is_dir: true,
								content: "faq2 content",
							},
							{
								name: "03-boo.md",
								is_dir: true,
								content: "faq3 content",
							},
						],
					},
					{
						name: "migrating",
						is_dir: true,
						content: [
							{
								name: "01-boo.md",
								is_dir: true,
								content: "migrating1 content",
							},
							{
								name: "02-boo.md",
								is_dir: true,
								content: "migrating2 content",
							},
							{
								name: "03-boo.md",
								is_dir: true,
								content: "migrating3 content",
							},
						],
					},
				],
			},
		],
	};
	const output = transform_files(files, "packages", "documentation", "svelte");

	assert.equal(output, [
		[
			"svelte",
			{
				docs: [
					{ name: "01-boo.md", content: "docs1 content" },
					{ name: "02-boo.md", content: "docs2 content" },
					{ name: "03-boo.md", content: "docs3 content" },
				],

				faq: [
					{ name: "01-boo.md", content: "faq1 content" },
					{ name: "02-boo.md", content: "faq2 content" },
					{ name: "03-boo.md", content: "faq3 content" },
				],

				migrating: [
					{ name: "01-boo.md", content: "migrating1 content" },
					{ name: "02-boo.md", content: "migrating2 content" },
					{ name: "03-boo.md", content: "migrating3 content" },
				],
			},
		],
	]);
});

transform("transforms examples", () => {
	const files = {
		name: "repo",
		is_dir: true,
		content: [
			{
				name: "documentation",
				is_dir: true,
				content: [
					{
						name: "examples",
						is_dir: true,
						content: [
							{
								name: "00-introduction",
								is_dir: true,
								content: [
									{
										name: "00-hello-world",
										is_dir: true,
										content: [
											{
												name: "App.svelte",
												is_dir: false,
												content: "app content",
											},
											{
												name: "meta.json",
												is_dir: false,
												content: '{\n\t"title": "Hello world"\n}',
											},
										],
									},
									{
										name: "01-dynamic-attributes",
										is_dir: true,
										content: [
											{
												name: "App.svelte",
												is_dir: false,
												content: "app2 content",
											},
											{
												name: "meta.json",
												is_dir: false,
												content: '{\n\t"title": "Dynamic attributes"\n}',
											},
										],
									},
									{
										name: "meta.json",
										is_dir: false,
										content: '{\n\t"title": "Introduction"\n}',
									},
								],
							},
							{
								name: "01-reactivity",
								is_dir: true,
								content: [
									{
										name: "00-reactive-assignments",
										is_dir: true,
										content: [
											{
												name: "App.svelte",
												is_dir: false,
												content: "app3 content",
											},
											{
												name: "meta.json",
												is_dir: false,
												content: '{\n\t"title": "Reactive assignments"\n}',
											},
										],
									},
									{
										name: "01-reactive-declarations",
										is_dir: true,
										content: [
											{
												name: "App.svelte",
												is_dir: false,
												content: "app4 content",
											},
											{
												name: "meta.json",
												is_dir: false,
												content: '{\n\t"title": "Reactive declarations"\n}',
											},
										],
									},
									{
										name: "meta.json",
										is_dir: false,
										content: '{\n\t"title": "Reactivity"\n}',
									},
								],
							},
						],
					},
				],
			},
		],
	};
	const output = transform_files(files, "packages", "documentation", "svelte");

	assert.equal(output, [
		[
			"svelte",
			{
				examples: [
					{
						name: "00-introduction",
						content: [
							{
								name: "00-hello-world",
								content: [
									{
										name: "App.svelte",
										content: "app content",
									},
									{
										name: "meta.json",
										content: '{\n\t"title": "Hello world"\n}',
									},
								],
							},
							{
								name: "01-dynamic-attributes",
								content: [
									{
										name: "App.svelte",
										content: "app2 content",
									},
									{
										name: "meta.json",
										content: '{\n\t"title": "Dynamic attributes"\n}',
									},
								],
							},
							{
								name: "meta.json",
								content: '{\n\t"title": "Introduction"\n}',
							},
						],
					},
					{
						name: "01-reactivity",
						content: [
							{
								name: "00-reactive-assignments",
								content: [
									{
										name: "App.svelte",
										content: "app3 content",
									},
									{
										name: "meta.json",
										content: '{\n\t"title": "Reactive assignments"\n}',
									},
								],
							},
							{
								name: "01-reactive-declarations",
								content: [
									{
										name: "App.svelte",
										content: "app4 content",
									},
									{
										name: "meta.json",
										content: '{\n\t"title": "Reactive declarations"\n}',
									},
								],
							},
							{
								name: "meta.json",
								content: '{\n\t"title": "Reactivity"\n}',
							},
						],
					},
				],
			},
		],
	]);
});

transform("transforms package readmes", () => {
	const files = {
		name: "repo-3",
		is_dir: true,
		content: [
			{
				name: "packages",
				is_dir: true,
				content: [
					{
						name: "random-extra-files",
						is_dir: true,
						content: [
							{
								name: "README.md",
								is_dir: false,
								content: "random-extra-files\n",
							},
							{ name: "bipbopboom.whatever", is_dir: false, content: "" },
							{
								name: "package.json",
								is_dir: false,
								content: '{\n\t"name": "random-extra-files"\n}\n',
							},
							{
								name: "src",
								is_dir: true,
								content: [{ name: "hello.bopbop", is_dir: false, content: "" }],
							},
						],
					},
					{
						name: "standard-package",
						is_dir: true,
						content: [
							{
								name: "README.md",
								is_dir: false,
								content: "standard-package\n",
							},
							{
								name: "package.json",
								is_dir: false,
								content: '{\n\t"name": "standard-package"\n}\n',
							},
						],
					},
				],
			},
		],
	};
	const output = transform_files(files, "packages", "documentation", "svelte");
	assert.equal(output, [
		[
			"random-extra-files",
			{
				docs: [
					{
						name: "README.md",
						content: "random-extra-files\n",
					},
					{ name: "bipbopboom.whatever", content: "" },
					{
						name: "package.json",
						content: '{\n\t"name": "random-extra-files"\n}\n',
					},
					{
						name: "src",
						content: [{ name: "hello.bopbop", content: "" }],
					},
				],
			},
		],
		[
			"standard-package",
			{
				docs: [
					{
						name: "README.md",
						content: "standard-package\n",
					},
					{
						name: "package.json",
						content: '{\n\t"name": "standard-package"\n}\n',
					},
				],
			},
		],
	]);
});

transform("get docs from root readme when no documentation folder", () => {
	const files = {
		name: "repo-3",
		is_dir: true,
		content: [
			{ name: "README.md", is_dir: false, content: "standard-package\n" },
			{
				name: "package.json",
				is_dir: false,
				content: '{\n\t"name": "standard-package"\n}\n',
			},
		],
	};

	const output = transform_files(files, "", "", "some-package");

	assert.equal(output, [
		[
			"some-package",
			{
				docs: [{ name: "README.md", content: "standard-package\n" }],
			},
		],
	]);
});

recrusive_read.run();
transform.run();
