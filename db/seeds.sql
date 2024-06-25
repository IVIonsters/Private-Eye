\ c mydatabase 

-- Insert departments
INSERT INTO department (name)
VALUES ('Service'),
    ('Sales'),
    ('HR'),
    ('IT');

-- Insert roles
INSERT INTO role(title, salary, department_id)
VALUES ('Manager', 65000, 1),
    ('Service Advisor', 50000, 1),
    ('Sales Manager', 68000, 2),
    ('Customer Representative', 45000, 2),
    ('HR Manager', 105000, 3),
    ('Employee Aid', 55000, 3),
    ('Senior Developer', 205000, 4),
    ('Junior Developer', 95000, 4),

-- Insert employees
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Brown', 1, NULL),
    ('Jane', 'Red', 1, 1),
    ('Kenny', 'Hope', 2, NULL),
    ('Jill', 'Novak', 2, 3),
    ('Alex', 'Smith', 3, NULL),
    ('Mark', 'Coast', 3, 5),
    ('Brandon', 'silver', 4, NULL),
    ('Brock', 'Beechum', 4, 7);