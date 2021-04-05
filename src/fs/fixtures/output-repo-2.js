export default {
	name: "repo-2",
	is_dir: true,
	content: [
		{ name: "README.md", is_dir: false, content: "repo-2 docs\n" },
		{
			name: "package.json",
			is_dir: false,
			content: '{\n\t"name": "standard-package"\n}\n',
		},
	],
};
