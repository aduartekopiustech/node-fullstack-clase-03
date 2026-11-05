import peopleData from "../data/people.data.js";
import createPerson from "../factories/person.factory.js";

const getPeopleData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (peopleData.length === 0) {
        reject(new Error("No people data available"));
        return;
      }

      resolve(peopleData);
    }, 1000);
  });
};

const buildPeopleReport = async () => {
  const records = await getPeopleData();

  const people = records.map(({ name, birthdate }) => {
    const person = createPerson(name, birthdate);

    return { ...person, isAdult: person.age >= 18 };
  });

  const adults = people.filter(({ isAdult }) => isAdult);
  const totalAge = people.reduce((sum, { age }) => sum + age, 0);

  return {
    generatedAt: new Date().toISOString(),
    total: people.length,
    adults,
    averageAge: totalAge / people.length,
  };
};

export { buildPeopleReport, getPeopleData };
