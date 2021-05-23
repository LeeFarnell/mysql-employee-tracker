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
("HR Advisor", "30000", "1");
("HR Manager", "40000", "1");
("HR Director", "50000", "1");
("IT Service Desk Advisor", "25000", "2");
("IT Engineer", "35000", "2");
("IT Manager", "40000", "2");
("Sales Administrator", "20000", "3");
("Sales Supervisor", "25000", "3");
("Sales Manager", "40000", "3");
("Finance Support Officer", "25000", "4");
("Finance Manager", "40000", "4");
("Estates Administrator", "20000", "5");
("Estates Manager", "40000", "5");

-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Whole lotta love", "Led Zepplin", "Rock");
