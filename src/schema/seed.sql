USE employees_db;

INSERT INTO department (name)
VALUES 
("Human Resources"),
("IT"),
("Sales"),
("Finance"),
("Estates"),

INSERT INTO role (title, salary, department_id)
VALUES 
("HR Advisor", "30000", "1"),
("HR Manager", "40000", "1"),
("HR Director", "50000", "1"),
("IT Service Desk Advisor", "25000", "2"),
("IT Engineer", "35000", "2"),
("IT Manager", "40000", "2"),
("Sales Administrator", "20000", "3"),
("Sales Supervisor", "25000", "3"),
("Sales Manager", "40000", "3"),
("Finance Support Officer", "25000", "4"),
("Finance Manager", "40000", "4"),
("Estates Administrator", "20000", "5"),
("Estates Manager", "40000", "5"),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Bob", "Smith", "1", "2"),
("Alice", "Jones", "2", "3"),
("Sarah", "Pope", "3", ""),
("David", "Williams", "4", "6"),
("Laura", "Kane", "5", "6"),
("John", "Adams", "6", ""),
("Amy", "Tennant", "7", "8"),
("Melody", "Pond", "8", "9"),
("Linda", "Belcher", "9", ""),
("Terry", "Linn", "10", "11"),
("Matthew", "Mason", "11", ""),
("Louis", "Green", "12", "13"),
("Elizabeth", "McDonald", "13", ""),

