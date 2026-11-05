import assert from "node:assert/strict";
import test from "node:test";

import calculateAge from "../../src/adapters/age.adapter.js";
import createPerson from "../../src/factories/person.factory.js";

test("createPerson returns a person using the project adapters", () => {
  const name = "John Doe";
  const birthdate = "2000-05-15";

  const person = createPerson(name, birthdate);

  assert.deepEqual(Object.keys(person), ["id", "name", "birthdate", "age"]);
  assert.match(
    person.id,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  assert.equal(person.name, name);
  assert.equal(person.birthdate, birthdate);
  assert.equal(person.age, calculateAge(birthdate));
});
