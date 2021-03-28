import { suite } from "uvu";
import * as assert from "uvu/assert";

import { increment_headings } from "./increment_headings";

const inc = suite("increment_headings");

inc("formats the api docs", () => {
	const output = increment_headings(`# title

asdasd
asd
asd


asdasd
# hi

## hi

### hi again
`);

	assert.equal(
		output,
		`### title

asdasd
asd
asd


asdasd
### hi

#### hi

##### hi again
`
	);
});

inc.run();
