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
}

module.exports = DB;
