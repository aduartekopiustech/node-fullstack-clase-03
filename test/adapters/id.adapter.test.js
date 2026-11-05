import assert from "node:assert/strict";
import test from "node:test";

import generateId from "../../src/adapters/id.adapter.js";

test("generateId returns a UUID v4 string", () => {
  const id = generateId();

  assert.match(
    id,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
});

test("generateId returns a different value on each call", () => {
  assert.notEqual(generateId(), generateId());
});
