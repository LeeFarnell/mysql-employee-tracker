const getAnswers = require("./getAnswers");

const baseChoices = async () => {
  const baseQuestions = [
    {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        {
          value: "viewAllEmployees",
          name: "View All Employees",
        },
        {
          value: "viewAllEmployeesByDepartment",
          name: "View All Employees By Department",
        },
        {
          value: "viewAllEmployeesByRole",
          name: "View All Employees By Role",
        },
        {
          value: "addEmployee",
          name: "Add an Employee",
        },
        {
          value: "removeEmployee",
          name: "Remove an Employee",
        },
        {
          value: "updateEmployee",
          name: "Update an Employee",
        },
        {
          value: "updateEmployeeRole",
          name: "Update Employee Role",
        },
        {
          value: "updateEmployeeManager",
          name: "Update Employee Manager",
        },
        {
          value: "viewAllRoles",
          name: "View All Roles",
        },
        {
          value: "addRole",
          name: "Add Role",
        },
        {
          value: "removeRole",
          name: "Remove Role",
        },
        {
          value: "viewAllDepartments",
          name: "View All Departments",
        },
        {
          value: "addDepartment",
          name: "Add Departments",
        },
        {
          value: "removeDepartment",
          name: "Remove Departments",
        },
        {
          value: "viewBudget",
          name: "View Utilised Budget for a Department",
        },
        {
          value: "exit",
          name: "Exit",
        },
      ],
    },
  ];

  const answers = await getAnswers(baseQuestions);

  return answers;
};

const roleChoices = async (db) => {
  const query = "SELECT * FROM role";
  const roles = await db.query(query);

  const choices = roles.map((role) => {
    return {
      value: role.id,
      name: role.title,
    };
  });

  const question = {
    type: "list",
    message: "Please pick a role:",
    name: "id",
    choices,
  };

  const answers = await getAnswers(question);

  return answers;
};

module.exports = { baseChoices, roleChoices };