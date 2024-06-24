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

}

//function to add a department
function addDepartment() {

}

//function to add a role
function addRole() {

}

//function to add an employee
function addEmployee() {

}

//function to update an employee role
function updateEmployeeRole() {

}

//port listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});