const db = require('./db/connection')
const inquirer = require('inquirer')
require('console.table');

const whatToDo = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'firstStep',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add department', 'add roles', 'add employees', 'employee role']
        }
    ]) .then(data => {
        if (data.firstStep === 'view all departments') {
            viewAllDepartments();
        }
    })
}

const viewAllDepartments = () => {
        const query = "SELECT * FROM department"
        db.query(query, (err, res) => {
            console.table(res);
            whatToDo();
        })
}

whatToDo();