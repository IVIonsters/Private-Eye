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

}


//function to view all departments
function departmentsView() {

}

//function to view all roles
function rolesView() {

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