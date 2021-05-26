const mysql = require("mysql");

class DB {
  constructor(database) {
    const dbOptions = {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database: "employees_db",
    };

    this.database = database;
    this.connection = mysql.createConnection(dbOptions);
  }

  start() {
    return new Promise((resolve, reject) => {
      const onConnect = (err) => {
        if (err) reject(err);
        console.info(`Connection to ${this.database} was successful.`);
        resolve();
      };

      this.connection.connect(onConnect);
    });
  }

  end(message) {
    this.connection.end();
    console.info(
      message || `The connection to ${this.database} has been closed.`
    );
  }

  query(sqlQuery) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      };

      this.connection.query(sqlQuery, handleQuery);
    });
  }

  parameterisedQuery(sqlQuery, args, info = false) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      };

      const query = this.connection.query(sqlQuery, args, handleQuery);

      if (info) {
        console.log(query.sql);
      }
    });
  }
}

module.exports = DB;
