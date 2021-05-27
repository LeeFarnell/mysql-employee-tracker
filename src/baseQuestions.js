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

const addNewEmployee = async () => {
  const questions = [
    {
      type: "input",
      message: "Enter the new employees first name:",
      name: "firstName",
    },
    {
      type: "input",
      message: "Enter the new employees last name:",
      name: "lastName",
    },
    {
      type: "input",
      message: "Enter the new employees role ID:",
      name: "roleID",
    },
  ];

  const answers = await getAnswers(questions);

  return answers;
};

const addNewRole = async () => {
  const questions = [
    {
      type: "input",
      message: "Enter the new role title:",
      name: "roleTitle",
    },
    {
      type: "input",
      message: "Enter the salary for the role:",
      name: "salary",
    },
    {
      type: "input",
      message: "Enter the department ID for this role:",
      name: "deptID",
    },
  ];

  const answers = await getAnswers(questions);

  return answers;
};

module.exports = { baseChoices, roleChoices, addNewEmployee, addNewRole };
