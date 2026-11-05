import assert from "node:assert/strict";
import test from "node:test";

import calculateAge from "../../src/adapters/age.adapter.js";
import peopleData from "../../src/data/people.data.js";
import {
  buildPeopleReport,
  getPeopleData,
} from "../../src/services/person.service.js";

test("getPeopleData resolves with the source records", async () => {
  const data = await getPeopleData();

  assert.equal(data, peopleData);
});

test("getPeopleData rejects with an Error when there are no records", async () => {
  const originalRecords = [...peopleData];

  peopleData.length = 0;

  try {
    await assert.rejects(getPeopleData(), Error);
  } finally {
    peopleData.push(...originalRecords);
  }
});

test("buildPeopleReport returns the adults and the average age", async () => {
  const report = await buildPeopleReport();

  const expectedAdults = peopleData
    .map(({ name, birthdate }) => ({
      name,
      birthdate,
      age: calculateAge(birthdate),
    }))
    .filter(({ age }) => age >= 18);

  assert.deepEqual(Object.keys(report), [
    "generatedAt",
    "total",
    "adults",
    "averageAge",
  ]);
  assert.equal(report.total, peopleData.length);
  assert.equal(report.adults.length, expectedAdults.length);
  assert.deepEqual(
    report.adults.map(({ name, birthdate, age, isAdult }) => ({
      name,
      birthdate,
      age,
      isAdult,
    })),
    expectedAdults.map((person) => ({ ...person, isAdult: true })),
  );
  assert.equal(
    report.averageAge,
    peopleData.reduce(
      (sum, { birthdate }) => sum + calculateAge(birthdate),
      0,
    ) / peopleData.length,
  );
  assert.ok(!Number.isNaN(Date.parse(report.generatedAt)));
});

test("buildPeopleReport does not modify the source records", async () => {
  const snapshot = peopleData.map((record) => ({ ...record }));

  await buildPeopleReport();

  assert.deepEqual(peopleData, snapshot);
});
