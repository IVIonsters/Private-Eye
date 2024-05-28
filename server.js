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