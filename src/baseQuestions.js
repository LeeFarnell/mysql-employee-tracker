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
          name: "Add Department",
        },
        {
          value: "removeDepartment",
          name: "Remove Department",
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

  const choices = employees.map((employee) => {
    return {
      value: employee.id,
      name: employee.first_name,
    };
  });

  const question = {
    type: "list",
    message: "Please select an employee to delete:",
    name: "id",
    choices,
  };

  const answers = await getAnswers(question);

  return answers;
};

const deleteRoles = async (db) => {
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
    message: "Please select a role to delete:",
    name: "id",
    choices,
  };

  const answers = await getAnswers(question);

  return answers;
};

const deleteDepartments = async (db) => {
  const query = "SELECT * FROM department";
  const departments = await db.query(query);

  const choices = departments.map((department) => {
    return {
      value: department.id,
      name: department.name,
    };
  });

  const question = {
    type: "list",
    message: "Please select a department to delete:",
    name: "id",
    choices,
  };

  const answers = await getAnswers(question);

  return answers;
};

const updateEmployeeRole = async (db) => {
  const employeeQuery = "SELECT * FROM employee";
  const employees = await db.query(employeeQuery);

  const employeeChoices = employees.map((employee) => {
    return {
      value: employee.role_id,
      name: `${employee.first_name} ${employee.last_name}`,
    };
  });

  const roleQuery = "SELECT * FROM role";
  const roles = await db.query(roleQuery);

  const roleChoices = roles.map((role) => {
    return {
      value: role.id,
      name: role.title,
    };
  });

  const question = [
    {
      type: "list",
      message: "Please select an employee to update their role:",
      name: "id",
      choices: employeeChoices,
    },
    {
      type: "list",
      message: "Please select the new job role:",
      name: "role",
      choices: roleChoices,
    },
  ];

  const answers = await getAnswers(question);

  return answers;
};

module.exports = {
  baseChoices,
  roleChoices,
  addNewEmployee,
  addNewRole,
  addNewDepartment,
  deleteEmployees,
  deleteRoles,
  deleteDepartments,
  updateEmployeeRole,
};
