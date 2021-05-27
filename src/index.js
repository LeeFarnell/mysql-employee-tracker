const {
  baseChoices,
  roleChoices,
  addNewEmployee,
  addNewRole,
} = require("./baseQuestions");
const DB = require("./db/DB");

const init = async () => {
  const db = new DB("employees_db");

  await db.start();

  let inProgress = true;

  while (inProgress) {
    const { action } = await baseChoices();

    if (action === "exit") {
      inProgress = false;
      db.end();
    } else {
      if (action === "viewAllDepartments") {
        const query = "SELECT * FROM department";
        const data = await db.query(query);
        console.table(data);
      } else if (action === "viewAllEmployees") {
        const query = "SELECT * FROM employee";
        const data = await db.query(query);
        console.table(data);
      } else if (action === "viewAllRoles") {
        const query = "SELECT * FROM role";
        const data = await db.query(query);
        console.table(data);
      } else if (action === "viewAllEmployeesByRole") {
        const { id } = await roleChoices(db);
        const query = 'SELECT * FROM ?? WHERE ??="?"';
        const data = await db.parameterisedQuery(query, [
          "employee",
          "role_id",
          id,
        ]);
        console.table(data);
      } else if (action === "addEmployee") {
        const { firstName, lastName, roleID } = await addNewEmployee(db);
        const query = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
        const data = await db.parameterisedQuery(query, [
          "employee",
          "first_name",
          "last_name",
          "role_id",
          firstName,
          lastName,
          roleID,
        ]);
        console.table(data);
      } else if (action === "addRole") {
        const { roleTitle, salary, deptID } = await addNewRole(db);
        const query = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
        const data = await db.parameterisedQuery(query, [
          "role",
          "title",
          "salary",
          "department_id",
          roleTitle,
          salary,
          deptID,
        ]);
        console.table(data);
      }
    }
  }
};

init();

// Look at Week 12, Day 02, Lesson 8 for inquirer settings.
