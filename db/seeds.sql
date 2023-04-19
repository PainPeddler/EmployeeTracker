INSERT INTO department (name)
VALUES ("Front-End"),
        ("Engineers"),
        ("Space-Team");

INSERT INTO role (title,salary,department_id)
VALUES ("Front-End Manager", 20000,1),
        ("Cashier", 15000,1),
        ("Logic Gate Manager",50000,2),
        ("Material Science Manager", 48000,2),
        ("Space Captain", 7800000,3),
        ("Space Henchmen", 400000,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Dover", 1,1),
        ("Cash","Money",2,1),

        ("Redstone","Master",3,2),
        ("Chemical","Geniusman",4,2),

        ("Clone", "Trooper",6,3),
        ("Space", "Pilotman",6,3),
        ("Mr", "Clean",6,3);