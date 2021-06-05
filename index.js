const db = require('./db/connection')
const inquirer = require('inquirer')
require('console.table');

const whatToDo = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'firstStep',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Employee role', 'Update an employee role', 'Exit']
        }
    ])

        .then(data => {
            if (data.firstStep === 'View all departments') {
                viewAllDepartments();
            }
            if (data.firstStep === 'View all roles') {
                viewAllRoles();
            }
            if (data.firstStep === 'View all employees') {
                viewAllEmployees();
            }
            if (data.firstStep === 'Add a department') {
                newDepartment();
            }
            if (data.firstStep === 'Add a role') {
                viewAllRoles();
            }
            if (data.firstStep === 'Add an employee') {
                viewAllEmployees();
            }
            if (data.firstStep === 'Add an employee') {
                viewAllEmployees();
            }
            if (data.firstStep === 'Update an employee role') {
                viewAllEmployees();
            }
        })
}

const newDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter name for new a department',
            // validate: departmentName => {
            //     if (departmentName) {
            //         return true;
            //     } else {
            //         console.log("Please enter a department name")
            //         return false;
            //     }
            // }
        }
    ])
        .then(data => {
            const query = `INSERT INTO departments (name) VALUES ('${data.department}')`
            db.query(query, (err, res) => {
                console.table(res);
                whatToDo();
            }) 
        })
}

// Query functions and callbacks
const viewAllDepartments = () => {
    const query = "SELECT * FROM departments"
    db.query(query, (err, res) => {
        console.table(res);
        whatToDo();
    })
}

const viewAllRoles = () => {
    const query = 'SELECT * FROM roles'
    db.query(query, (err, res) => {
        console.table(res);
        whatToDo();
    })
}

const viewAllEmployees = () => {
    const query = 'SELECT * FROM employees'
    db.query(query, (err, res) => {
        console.table(res);
        whatToDo();
    })
}

// const addDepartment = () => {
//     const query = "INSERT INTO departments (name) VALUES ('jace')"
//     db.query(query, (err, res) => {
//         console.table(res);
//         whatToDo();
//     })
// }


whatToDo();