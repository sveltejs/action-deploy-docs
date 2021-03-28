import core from "@actions/core";

async function run() {
	const target_repo = core.getInput("repo");
	const target_branch = core.getInput("branch");
	const cf_token = core.getInput("token");

	if (target_branch !== "main" && target_branch !== "master") {
		core.setFailed("Branch deploys are not yet supported.");
	}

	// get repo
	// read docs in
	// format them
	// transform to cf format (batch keys)
	// write to cloudflare
}

run();
