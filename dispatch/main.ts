import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
	try {
		const token = core.getInput("token");
		const repo = core.getInput("repo");
		const branch = core.getInput("branch");
		const docs_path = core.getInput("docs_path");
		const pkg_path = core.getInput("pkg_path");

		const octokit = github.getOctokit(token);

		const dispatchResp = await octokit.rest.actions.createWorkflowDispatch({
			owner: "sveltejs",
			repo: "sites",
			workflow_id: "docs-deploy-trigger.yml",
			ref: "master",
			inputs: {
				repo,
				branch,
				docs_path,
				pkg_path,
			},
		});
		core.info(`API response status: ${dispatchResp.status} 🚀`);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
