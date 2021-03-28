import core from "@actions/core";
import exec from "@actions/exec";
import fs from "fs";
import path from "path";

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
		`/${docs_path}/\n/${pkg_path}/*/README.md\n/packages/*/package.json"`
	);

	await exec.exec("git", ["sparse-checkout", "reapply"]);
	await exec.exec("git", ["switch", target_branch]);
}

async function run() {
	const target_repo = core.getInput("repo");
	const target_branch = core.getInput("branch");
	const cf_token = core.getInput("token");

	const docs_path = "documentation";
	const pkg_path = "packages";

	if (target_branch !== "main" && target_branch !== "master") {
		core.setFailed("Branch deploys are not yet supported.");
	}

	// get repo

	try {
		await get_repo(target_repo, target_branch, docs_path, pkg_path);
	} catch (e) {
		core.setFailed(
			`Failed to clone repository: https://github.com/sveltejs/${target_repo}.git#${target_branch}`
		);
	}

	// read docs in
	// format them
	// transform to cf format (batch keys)
	// write to cloudflare
}

run();
