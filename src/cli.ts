// import watch from "cheap-watch";
import type { Request, Response } from "polka";
import { CF_Key } from "./transform/cloudflare";

import polka from "polka";
import send from "@polka/send";

import { get_docs, DocFiles } from "./fs";
import { transform_cloudflare, transform_docs } from "./transform";
import { get } from "httpie";

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

	type RequestDocs = Request & {
		params: { project: string; type: string };
		query: {
			version?: string;
			content?: string;
		};
	};

	type RequestDocEntry = Request & {
		params: { project: string; type: string; slug: string };
		query: {
			version?: string;
		};
	};

	console.log(ready_for_cf);

	polka()
		.get("/docs/:project/:type", async (req: RequestDocs, res: Response) => {
			const { project, type } = req.params;
			const version = req.query.version || "latest";
			const full = typeof req.query.content === "string";

			const _key = `${project}@${version}:${type}:${full ? "content" : "list"}`;

			let match: CF_Key | string = ready_for_cf.find(({ key }) => key === _key);
			console.log(req.originalUrl);

			if (!match)
				match = await (
					await get<string>(`https://api.svelte.dev/${req.originalUrl}`)
				).data;

			if (match)
				send(res, 200, typeof match === "string" ? match : match.value);
			else
				send(res, 404, {
					message: `'${project}@${version}' '${type}' entry not found.`,
				});
		})
		.get(
			"/docs/:project/:type/:slug",
			async (req: RequestDocEntry, res: Response) => {
				const { project, type, slug } = req.params;
				const version = req.query.version || "latest";

				const _key = `${project}@${version}:${type}:${slug}`;
				let match: CF_Key | string = ready_for_cf.find(
					({ key }) => key === _key
				);

				if (!match)
					match = await (
						await get<string>(`https://api.svelte.dev/${req.originalUrl}`)
					).data;

				if (match)
					send(res, 200, typeof match === "string" ? match : match.value);
				else
					send(res, 404, {
						message: `'${project}@${version}' '${type}' entry for '${slug}' not found.`,
					});
			}
		)
		.listen(3456, () => {
			console.log(`> Running on localhost:3456`);
		});
}
