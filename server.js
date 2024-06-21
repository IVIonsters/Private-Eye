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


//function for menu options


//function to view all departments


//function to view all roles


//function to view all employees


//function to add a department


//function to add a role


//function to add an employee


//function to update an employee role


//port listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});