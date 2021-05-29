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

const managerChoices = async (db) => {
  const query = "SELECT * FROM employee";
  const managers = await db.query(query);

  const choices = managers.map((manager) => {
    return {
      value: manager.id,
      name: `${manager.first_name} ${manager.last_name}`,
    };
  });

  const question = {
    type: "list",
    message: "Please select a manager:",
    name: "id",
    choices,
  };

  const answers = await getAnswers(question);

  return answers;
};

const addNewEmployee = async (db) => {
  const roleQuery = "SELECT * FROM role";
  const roles = await db.query(roleQuery);

  const roleChoices = roles.map((role) => {
    return {
      value: role.id,
      name: role.title,
    };
  });

  const managerQuery = "SELECT * FROM employee";
  const managers = await db.query(managerQuery);

  const managerChoices = managers.map((manager) => {
    return {
      value: manager.id,
      name: `${manager.first_name} ${manager.last_name}`,
    };
  });

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
      choices: roleChoices,
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
      choices: managerChoices,
      when: (answers) => {
        return answers.confirm;
      },
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
      name: `${employee.first_name} ${employee.last_name}`,
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
      value: employee.id,
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

const updateEmployeeManager = async (db) => {
  const employeeQuery = "SELECT * FROM employee";
  const employees = await db.query(employeeQuery);

  const employeeChoices = employees.map((employee) => {
    return {
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    };
  });

  const managerQuery = "SELECT * FROM employee";
  const managers = await db.query(managerQuery);

  const managerChoices = managers.map((manager) => {
    return {
      value: manager.id,
      name: `${manager.first_name} ${manager.last_name}`,
    };
  });

  const question = [
    {
      type: "list",
      message: "Please select an employee to update their manager:",
      name: "id",
      choices: employeeChoices,
    },
    {
      type: "list",
      message: "Please select this employees new manager:",
      name: "manager",
      choices: managerChoices,
    },
  ];

  const answers = await getAnswers(question);

  return answers;
};

const totalBudget = async (db) => {
  const departmentQuery = "SELECT * FROM department";
  const departments = await db.query(departmentQuery);

  const choices = departments.map((department) => {
    return {
      value: department.id,
      name: department.name,
    };
  });

  const question = [
    {
      type: "list",
      message: "Please select a department to view their budget:",
      name: "id",
      choices,
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
