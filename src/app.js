import { buildPeopleReport } from "./services/person.service.js";

const main = async () => {
  try {
    const report = await buildPeopleReport();

    console.log(report);
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log("Process finished");
  }
};

main();
