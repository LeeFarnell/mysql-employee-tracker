const choices = require("./baseQuestions");
const DB = require("./db/DB");

const init = async () => {
  const db = new DB("employees_db");

  await db.start();

  let inProgress = true;

  while (inProgress) {
    const answers = await choices();

    if (answers.actions === "exit") {
      inProgress = false;
      db.end();
    }
  }
};

init();

// Look at Week 12, Day 02, Lesson 8 for inquirer settings.
