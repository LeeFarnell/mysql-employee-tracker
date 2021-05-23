const mysql = require("mysql");

const dbOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
};

const connection = mysql.createConnection(dbOptions);

const onConnect = (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`connected to database`);
  }
};

connection.connect(onConnect);
