import type { Request, Response } from "polka";
import { CF_Key } from "./transform/cloudflare";

import CheapWatch from "cheap-watch";
import polka from "polka";
import send from "@polka/send";
import * as path from "path";

import { get_docs, DocFiles } from "./fs";
import { transform_cloudflare, transform_docs } from "./transform";
import { get } from "httpie";

const cache: Record<string, CF_Key> = {};

export default async function cli() {
	console.log(`> Starting docs preview server.\n`);

	const {
		pkg = "packages",
		docs = "documentation",
		project,
	} = process.argv.slice(2).reduce<Record<string, string>>((acc, next) => {
		const [k, v] = next.split("=");
		acc[k.replace("--", "")] = v;
		return acc;
	}, {});

	let ready_for_cf: CF_Key[];
	await process_docs(
		project,
		pkg,
		docs,
		(data: CF_Key[]) => (ready_for_cf = data)
	);

	const pkg_watch = new CheapWatch({
		dir: path.join(process.cwd()),
		debounce: 40,
		filter: ({ path }: { path: string }) => {
			if (/.*\/node_modules\/.*/.test(path)) return false;
			return path.startsWith(pkg) || path.startsWith(docs);
		},
	});

	await pkg_watch.init();

	pkg_watch.on("+", ({ path, stats, isNew }) => {
		if (!/.*\.\w+/.test(path)) return;

		process_docs(project, pkg, docs, (data: CF_Key[]) => (ready_for_cf = data));
		console.log(`> Change detected: ${path}. Docs rebuilt.`);
	});

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

	polka()
		.get("/docs/:project/:type", async (req: RequestDocs, res: Response) => {
			setCors(res);
			console.log(`> GET: ${req.originalUrl}.`);
			const { project, type } = req.params;
			const version = req.query.version || "latest";
			const full = typeof req.query.content === "string";

			const _key = `${project}@${version}:${type}:${full ? "content" : "list"}`;

			let match: CF_Key | false = ready_for_cf.find(({ key }) => key === _key);

			if (!match)
				match =
					cache[req.originalUrl] || (await fetch_and_cache(req.originalUrl));

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
				setCors(res);
				console.log(`> GET: ${req.originalUrl}.`);
				const { project, type, slug } = req.params;
				const version = req.query.version || "latest";

				const _key = `${project}@${version}:${type}:${slug}`;
				let match: CF_Key | false = ready_for_cf.find(
					({ key }) => key === _key
				);

				//TODO: cache this lcoally
				if (!match)
					match =
						cache[req.originalUrl] || (await fetch_and_cache(req.originalUrl));

				if (match) send(res, 200, match.value);
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

async function fetch_and_cache(url: string): Promise<CF_Key | false> {
	try {
		const res = await (await get<string>(`https://api.svelte.dev/${url}`)).data;

		cache[url] = { key: url, value: res };
		return { key: url, value: res };
	} catch {
		return false;
	}
}

function setCors(res: Response) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, Content-Type, Accept, Range"
	);
}

async function process_docs(
	project: string,
	pkg: string,
	docs: string,
	cb: Function
) {
	let _docs: [string, DocFiles][] | false;

	try {
		_docs = await get_docs(project, pkg, docs);
	} catch (e) {
		console.error(e);
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

	cb(ready_for_cf);
}
