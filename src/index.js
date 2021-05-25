const DB = require("./db/DB");

const init = async () => {
  const db = new DB("employees_db");

  await db.start();
};

init();
