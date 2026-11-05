import assert from "node:assert/strict";
import test from "node:test";

import calculateAge from "../../src/adapters/age.adapter.js";

test("calculateAge returns the completed years from a birthdate", () => {
  const birthdate = "2000-01-01";
  const expectedAge = new Date().getFullYear() - 2000;

  assert.equal(calculateAge(birthdate), expectedAge);
});
