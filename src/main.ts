import core from "@actions/core";
import exec from "@actions/exec";
import fs from "fs";
import path from "path";

import { get_docs, DocFiles } from "./fs";
import { transform_cloudflare, transform_docs } from "./transform";

async function get_repo(
	target_repo: string,
	target_branch: string,
	docs_path: string,
	pkg_path: string
): Promise<void> {
	const tmp_dir_name = `__tmp_repo_path`;

	// we want to clone the necessary branch and only that branch
	// but we don't want files because we want to sparsely checkout the branch later
	// we also don't want any history, we only care about files
	// this is basically magic
	await exec.exec("git", [
		"clone",
		`https://github.com/sveltejs/${target_repo}.git`,
		"--no-checkout",
		"--branch",
		target_branch,
		"--single-branch",
		tmp_dir_name,
		"--depth",
		"1",
		"--verbose",
	]);

	process.chdir(tmp_dir_name);

	await exec.exec("git", ["sparse-checkout", "init"]);

	// we only care about the documentation folder and any package readmes + package.jsons
	fs.writeFileSync(
		path.join(process.cwd(), ".git/info/sparse-checkout"),
		`/${docs_path}/\n/${pkg_path}/*/README.md\n/${pkg_path}/*/package.json\n/README.md\n/package.json`
	);

	await exec.exec("git", ["sparse-checkout", "reapply"]);
	await exec.exec("git", ["switch", target_branch]);
}

async function run() {
	const target_repo = core.getInput("repo");
	const target_branch = core.getInput("branch");
	const cf_token = core.getInput("token");
	const docs_path = core.getInput("docs_path");
	const pkg_path = core.getInput("pkg_path");

	if (target_branch !== "main" && target_branch !== "master") {
		core.setFailed("Branch deploys are not yet supported.");
	}

	// get repo

	try {
		await get_repo(target_repo, target_branch, docs_path, pkg_path);
	} catch (e) {
		core.warning(e.message);
		core.setFailed(
			`Failed to clone repository: https://github.com/sveltejs/${target_repo}.git#${target_branch}`
		);
	}

	// read docs in
	let docs: [string, DocFiles][] | false;

	try {
		docs = await get_docs(target_repo, pkg_path, docs_path);
	} catch (e) {
		core.warning(e.message);
		core.setFailed("Failed to read documentation files.");
		throw new Error("no docs");
	}

	console.log(JSON.stringify(docs, null, 2));

	// if (docs.length) {
	// 	docs.forEach(([project, docs]) => {
	// 		for (const type in docs) {
	// 			const _docs = format_docs[type](docs[type]);
	// 		}
	// 	});
	// 	const formatted_base_docs = base_docs.docs.map(([name, content]) =>
	// 		format_api(name, content, "docs", name)
	// 	);
	// 	console.log(JSON.stringify(formatted_base_docs, null, 2));

	// transform to cf format (batch keys)

	// const docs = transform_cloudflare(formatted_base_docs, {
	// 	project: target_repo,
	// 	type: "docs",
	// 	keyby: "slug",
	// });

	// 	console.log("\n");
	// 	console.log(docs);
	// }

	// write to cloudflare
}

run();
