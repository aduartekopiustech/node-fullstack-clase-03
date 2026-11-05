import assert from "node:assert/strict";
import test from "node:test";

import peopleData from "../../src/data/people.data.js";

test("peopleData contains at least four records with name and birthdate", () => {
  assert.ok(peopleData.length >= 4);

  for (const record of peopleData) {
    assert.deepEqual(Object.keys(record), ["name", "birthdate"]);
    assert.equal(typeof record.name, "string");
    assert.match(record.birthdate, /^\d{4}-\d{2}-\d{2}$/);
  }
});
