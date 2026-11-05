import { calculateAge, generateId } from "../adapters/index.js";

const createPerson = (name, birthdate) => ({
  id: generateId(),
  name,
  birthdate,
  age: calculateAge(birthdate),
});

export default createPerson;
