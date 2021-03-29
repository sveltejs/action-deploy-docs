import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sucrase from "@rollup/plugin-sucrase";
import { terser } from "rollup-plugin-terser";

export default [
	{
		plugins: [
			cjs(),
			resolve(),
			sucrase({ transforms: ["typescript"] }),
			// terser(),
		],
		input: "src/main.ts",
		output: [
			{
				file: "dist/main.js",
				format: "cjs",
				sourcemap: false,
			},
		],
	},
];
