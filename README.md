# action-deploy-docs

An action to help deploy the svelte docs. This action does the following:

- Sparsely clones a single branch without much history. As light as I could make it.
- Reads the docs into memory.
- Transforms them with the svelte docs markdown formatter.

TODO:

- Transform the transformed docs into the requistive format for CF's batch key write rest API
- Push them up
