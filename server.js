//set project requirements
const inquirer = require('inquirer');
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

//set up express
const app = express();
const PORT = process.env.PORT || 3000;

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set up database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
});


//connect to database
pool.connect((error) => {
    if (error) {
        console.log('Error connecting to database', error.message);
    } else {
        console.log('Connected to database');
        menuOptions();
    }
});

//test database connection
pool.query('SELECT NOW()', (error, results) => {
    if (error) {
        console.log('Error executing query', error.message);
    } else {
        console.log('Database connected successfully....');
    }
});

//function for menu options
function menuOptions() {
    inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'How can I help you today?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ]
    })
    .then((qs) => {
        switch (qs.menu) {
            case 'View all departments':
                departmentsView();
                break;
            case 'View all roles':
                rolesView();
                break;
            case 'View all employees':
                employeesView();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
            default:
                console.log('Invalid selection');
                menuOptions();
        }
    });
}


//function to view all departments
function departmentsView() {
    pool.query('SELECT * FROM department', (error, results) => {
        if (error) {
            console.log('Error executing query', error.message);
        } else {
            console.table(results.rows);
            menuOptions();
        }
    });
}

//function to view all roles
function rolesView() {
    const query = `
        SELECT
            r.id,
            r.title,
            r.salary,
            d.name AS department
        FROM
            role r
        JOIN
            department d ON r.department_id = d.id;
            `;
    pool.query(query, (error, results) => {
        if (error) {
            console.log('Error executing query', error.message);
        } else {
            console.table(results.rows);
            menuOptions();
        }
    });
}

//function to view all employees
function employeesView() {
    const query = `
        SELECT
            e.id,
            e.first_name,
            e.last_name,
            r.title AS role,
            d.name AS department,
            e.salary,
            e.manager_id
        FROM
            employee e
        LEFT JOIN
            role r ON e.role_id = r.id
        LEFT JOIN
            department d ON r.department_id = d.id
            `;
    pool.query(query, (error, results) => {
        if (error) {
            console.log('Error executing query', error.message);
        } else {
            console.table(results.rows);
            menuOptions();
        }
    });
}

//function to add a department
function addDepartment() {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the department name:',
    })
    .then((qs) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [qs.name], (error, results) => {
            if (error) {
                console.log('Error executing query', error.message);
            } else {
                console.log('Department added successfully');
                menuOptions();
            }
            menuOptions();
        });
    });
}

//function to add a role
async function addRole() {
    const { rows } = await pool.query('SELECT * FROM department');
    const departmentChoices = rows.map((department) => ({
        name: department.name,
        value: department.id,
    }));
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the role title:',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the role salary:',
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Select the department for this role:',
            choices: departmentChoices,
        },
    ])
    .then((qs) => {
        const pstgrsQuery = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
        const values = [qs.title, qs.salary, qs.department_id];

        pool.query(pstgrsQuery, values, (error, results) => {
            if (error) {
                console.log('Error executing query', error.message);
            } else {
                console.log('Role added successfully');
            }
            menuOptions();
    });
});
}

//function to add an employee
async function addEmployee() {
    const { rows: roles } = await pool.query('SELECT * FROM role');
    const { rows: managers } = await pool.query('SELECT * FROM employee');
    const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));
    const managerChoices = managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id,
    }));
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter the employee first name:',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter the employee last name:',
        },
        {
            name: 'role',
            type: 'list',
            message: 'Select the role for this employee:',
            choices: roleChoices,
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Select the manager for this employee:',
            choices: managerChoices,
        },
    ])
    .then((qs) => {
        const pstgrsQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
        const values = [qs.firstName, qs.lastName, qs.role, qs.manager];

        pool.query(pstgrsQuery, values, (error, results) => {
            if (error) {
                console.log('Error executing query', error.message);
            } else {
                console.log(`Employee added successfully ${qs.firstName} ${qs.lastName}`);
            }
            menuOptions();
        });
    });
}

//function to update an employee role
function updateEmployeeRole() {

}

//port listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});