USE tracker_db; 

INSERT INTO departments (dpt_name)
VALUES
    ('Sales'),
    ('IT'),
    ('HR'), 
    ('Accounting'), 
    ('Legal');

INSERT INTO roles (title, salary, dpt_id)
VALUES
    ("Lawyer", 150, 1),
    ("Legal Assistant", 5006, 1);
    ("Sales Manager", 100000, 2),
    ("Sales Person", 12, 2),
    ("IT Manager", 130000, 2),
    ("Software Engineer", 100520, 3),
    ("Data Engineer", 101100, 4),
    ("HR Coordinator", 6000000, 4),
    ("Accountant", 89, 5),
    ("Accounting Clerk", 20, 5),


INSERT INTO employees (first_name, last_name, role_id, mgr_id)
        VALUES
    ("Sasuke", "Uchiha", 1, null),
    ("Itachi", "Uchiha", 2, 1),
    ("Kakashi", "Hatake", 2, 1),
    ("Hinata", "Hyuga", 3, null),
    ("Naruto", "Uzumaki", 4, 4),
    ("Sakura", "Haruno", 4, 4),
    ("Ino", "Yamanaka", 5, 4),
    ("Kiba", "Inuzuka", 6, null),
    ("Hiruzen", "Sarutobi", 7, null),
    ("Rock", "Lee", 8, 9),
    ("Shino", "Aburame", 9, null),
    ("Kurenai", "Yuhi", 10, 11);