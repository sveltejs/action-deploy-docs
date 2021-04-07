export default {
	name: "repo-1",
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
						{ name: "01-one.md", is_dir: false, content: "file-one\n" },
						{ name: "02-two.md", is_dir: false, content: "file-two\n" },
						{ name: "03-three.md", is_dir: false, content: "file-three\n" },
						{ name: "04-four.md", is_dir: false, content: "file-four\n" },
						{ name: "badfile.boojoo", is_dir: false, content: "" },
					],
				},
			],
		},
		{
			name: "packages",
			is_dir: true,
			content: [
				{
					name: "no-package-json",
					is_dir: true,
					content: [
						{ name: "README.md", is_dir: false, content: "no-package-json\n" },
					],
				},
				{ name: "no-package-or-readme", is_dir: true, content: [] },
				{
					name: "no-readme",
					is_dir: true,
					content: [
						{
							name: "package.json",
							is_dir: false,
							content: '{\n\t"name": "no-readme"\n}\n',
						},
					],
				},
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
						{ name: "README.md", is_dir: false, content: "standard-package\n" },
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