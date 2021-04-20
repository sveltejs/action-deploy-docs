import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sucrase from "@rollup/plugin-sucrase";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default [
	{
		plugins: [
			cjs(),
			resolve(),
			json(),
			sucrase({ transforms: ["typescript"] }),
		],
		input: "src/action.ts",
		output: [
			{
				file: "dist/action.js",
				format: "cjs",
				sourcemap: false,
			},
		],
	},
	{
		plugins: [
			cjs(),
			resolve(),
			json(),
			sucrase({ transforms: ["typescript"] }),
		],
		input: "src/cli.ts",
		output: [
			{
				file: "dist/cli.js",
				format: "cjs",
				sourcemap: false,
				interop: false,
			},
		],
	},
];
