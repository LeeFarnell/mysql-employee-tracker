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
          value: "viewAllEmployeesByManager",
          name: "View All Employees By Manager",
        },
        {
          value: "addEmployee",
          name: "Add an Employee",
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
          value: "removeEmployee",
          name: "Remove an Employee",
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
          value: "viewBudget",
          name: "View Utilised Budget for a Department",
        },
        {
          value: "addDepartment",
          name: "Add Department",
        },
        {
          value: "removeDepartment",
          name: "Remove Department",
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

const generateRoleChoices = (roles) =>
  roles.map((role) => ({
    value: role.id,
    name: role.title,
  }));

const generateEmployeeChoices = (employees) =>
  employees.map((employee) => ({
    value: employee.id,
    name: `${employee.first_name} ${employee.last_name}`,
  }));

const generateDepartmentChoices = (departments) =>
  departments.map((department) => ({
    value: department.id,
    name: department.name,
  }));

const roleChoices = async (db) => {
  const query = "SELECT * FROM role";
  const roles = await db.query(query);

  const question = {
    type: "list",
    message: "Please pick a role:",
    name: "id",
    choices: generateRoleChoices(roles),
  };

  const answers = await getAnswers(question);

  return answers;
};

const managerChoices = async (db) => {
  const query = "SELECT * FROM employee";
  const managers = await db.query(query);

  const question = {
    type: "list",
    message: "Please select a manager:",
    name: "id",
    choices: generateEmployeeChoices(managers),
  };

  const answers = await getAnswers(question);

  return answers;
};

const addNewEmployee = async (db) => {
  const roleQuery = "SELECT * FROM role";
  const roles = await db.query(roleQuery);

  const managerQuery = "SELECT * FROM employee";
  const managers = await db.query(managerQuery);

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
      type: "list",
      message: "Please select the new employees role:",
      name: "role",
      choices: generateRoleChoices(roles),
    },
    {
      type: "confirm",
      message: "Does this employee have a manager?",
      name: "confirm",
    },
    {
      type: "list",
      message: "Please select the new employees manager ",
      name: "manager",
      choices: generateEmployeeChoices(managers),
      when: (answers) => {
        return answers.confirm;
      },
    },
  ];

  const answers = await getAnswers(questions);

  return answers;
};

const addNewRole = async (db) => {
  const query = "SELECT * FROM department";
  const departments = await db.query(query);

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
      type: "list",
      message: "Please select the department for this role:",
      name: "deptID",
      choices: generateDepartmentChoices(departments),
    },
  ];

  const answers = await getAnswers(questions);

  return answers;
};

const addNewDepartment = async () => {
  const questions = [
    {
      type: "input",
      message: "Enter the new department:",
      name: "deptName",
    },
  ];

  const answers = await getAnswers(questions);

  return answers;
};

const deleteEmployees = async (db) => {
  const query = "SELECT * FROM employee";
  const employees = await db.query(query);

  const question = {
    type: "list",
    message: "Please select an employee to delete:",
    name: "id",
    choices: generateEmployeeChoices(employees),
  };

  const answers = await getAnswers(question);

  return answers;
};

const deleteRoles = async (db) => {
  const query = "SELECT * FROM role";
  const roles = await db.query(query);

  const question = {
    type: "list",
    message: "Please select a role to delete:",
    name: "id",
    choices: generateRoleChoices(roles),
  };

  const answers = await getAnswers(question);

  return answers;
};

const deleteDepartments = async (db) => {
  const query = "SELECT * FROM department";
  const departments = await db.query(query);

  const question = {
    type: "list",
    message: "Please select a department to delete:",
    name: "id",
    choices: generateDepartmentChoices(departments),
  };

  const answers = await getAnswers(question);

  return answers;
};

const updateEmployeeRole = async (db) => {
  const employeeQuery = "SELECT * FROM employee";
  const employees = await db.query(employeeQuery);

  const roleQuery = "SELECT * FROM role";
  const roles = await db.query(roleQuery);

  const question = [
    {
      type: "list",
      message: "Please select an employee to update their role:",
      name: "id",
      choices: generateEmployeeChoices(employees),
    },
    {
      type: "list",
      message: "Please select the new job role:",
      name: "role",
      choices: generateRoleChoices(roles),
    },
  ];

  const answers = await getAnswers(question);

  return answers;
};

const updateEmployeeManager = async (db) => {
  const employeeQuery = "SELECT * FROM employee";
  const employees = await db.query(employeeQuery);

  const managerQuery = "SELECT * FROM employee";
  const managers = await db.query(managerQuery);

  const question = [
    {
      type: "list",
      message: "Please select an employee to update their manager:",
      name: "id",
      choices: generateEmployeeChoices(employees),
    },
    {
      type: "list",
      message: "Please select this employees new manager:",
      name: "manager",
      choices: generateEmployeeChoices(managers),
    },
  ];

  const answers = await getAnswers(question);

  return answers;
};

const totalBudget = async (db) => {
  const departmentQuery = "SELECT * FROM department";
  const departments = await db.query(departmentQuery);

  const question = [
    {
      type: "list",
      message: "Please select a department to view their budget:",
      name: "id",
      choices: generateDepartmentChoices(departments),
    },
  ];

  const answers = await getAnswers(question);

  return answers;
};

module.exports = {
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
};
