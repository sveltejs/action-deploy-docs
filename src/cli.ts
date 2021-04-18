// import watch from "cheap-watch";

import polka from "polka";
import * as path from "path";

import { get_docs, DocFiles } from "./fs";
import { transform_cloudflare, transform_docs } from "./transform";

export default async function cli() {
	const {
		pkg = "packages",
		docs = "documentation",
		project,
	} = process.argv.slice(2).reduce<Record<string, string>>((acc, next) => {
		const [k, v] = next.split("=");
		acc[k.replace("--", "")] = v;
		return acc;
	}, {});

	// new CheapWatch({ dir, filter, watch = true, debounce = 10 });

	console.log(pkg, docs, project);

	let _docs: [string, DocFiles][] | false;

	try {
		_docs = await get_docs(project, pkg, docs);
	} catch (e) {
		console.log(e);
		throw new Error("no docs");
	}

	const transformed_docs = await Promise.all(
		_docs.map(([project, docs]) =>
			// @ts-ignore
			transform_docs(docs, project)
		)
	);

	const ready_for_cf = transformed_docs
		.map((d) =>
			d.map(({ content, project, type }) =>
				//@ts-ignore
				transform_cloudflare(content, { project, type, keyby: "slug" })
			)
		)
		.flat(2);

	console.log(JSON.stringify(ready_for_cf, null, 2));

	const is_valid = ready_for_cf.every(
		({ value, key }) => typeof value === "string" && typeof key === "string"
	);

	console.log(is_valid ? "\nEVERYTHING IS VALID\n" : "\nTHIS IS NOT VALID\n");

	polka()
		.get("/docs/:project/:type", (req, res) => {
			console.log(`~> Hello, ${req.hello}`);
			res.end(`User: ${req.params.id}`);
		})
		.listen(3456, (err) => {
			if (err) throw err;
			console.log(`> Running on localhost:3456`);
		});
}
