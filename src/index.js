const {
  baseChoices,
  roleChoices,
  managerChoices,
  addNewEmployee,
  addNewRole,
  addNewDepartment,
  deleteEmployees,
  deleteRoles,
  deleteDepartments,
  updateEmployeeRole,
  updateEmployeeManager,
  totalBudget,
} = require("./tableFunctions");

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
      } else if (action === "viewAllEmployeesByManager") {
        const { id } = await managerChoices(db);
        const query = 'SELECT * FROM ?? WHERE ??="?"';
        const data = await db.parameterisedQuery(query, [
          "employee",
          "manager_id",
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
      } else if (action === "addDepartment") {
        const { deptName } = await addNewDepartment(db);
        const query = "INSERT INTO ?? (??) VALUES (?)";
        const data = await db.parameterisedQuery(query, [
          "department",
          "name",
          deptName,
        ]);
        console.table(data);
      } else if (action === "removeEmployee") {
        const { id } = await deleteEmployees(db);
        const query = 'DELETE FROM ?? WHERE ??="?"';
        const data = await db.parameterisedQuery(query, ["employee", "id", id]);
        console.table(data);
      } else if (action === "removeRole") {
        const { id } = await deleteRoles(db);
        const query = 'DELETE FROM ?? WHERE ??="?"';
        const data = await db.parameterisedQuery(query, ["role", "id", id]);
        console.table(data);
      } else if (action === "removeDepartment") {
        const { id } = await deleteDepartments(db);
        const query = 'DELETE FROM ?? WHERE ??="?"';
        const data = await db.parameterisedQuery(query, [
          "department",
          "id",
          id,
        ]);
        console.table(data);
      } else if (action === "updateEmployeeRole") {
        const { role, id } = await updateEmployeeRole(db);
        const query = "UPDATE ?? SET ??=? WHERE ??=?";
        const data = await db.parameterisedQuery(query, [
          "employee",
          "role_id",
          role,
          "id",
          id,
        ]);
        console.table(data);
      } else if (action === "updateEmployeeManager") {
        const { manager, id } = await updateEmployeeManager(db);
        const query = "UPDATE ?? SET ??=? WHERE ??=?";
        const data = await db.parameterisedQuery(query, [
          "employee",
          "manager_id",
          manager,
          "id",
          id,
        ]);
        console.table(data);
      } else if (action === "viewBudget") {
        const { id } = await totalBudget(db);
        const query = "SELECT SUM(??) FROM ?? WHERE ??=?";
        const data = await db.parameterisedQuery(query, [
          "salary",
          "role",
          "department_id",
          id,
        ]);
        console.table(data);
      }
    }
  }
};
init();
