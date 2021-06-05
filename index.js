const db = require('./db/connection')
const inquirer = require('inquirer')
require('console.table');


const whatToDo = () => {
console.log(`
================================================
   Welcome to the Employee Management System!
================================================
    `
)
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
                newRole();
            }
            if (data.firstStep === 'Add an employee') {
                newEmployee();
            }
            if (data.firstStep === 'Update an employee role') {
                updateEmployeeRole();
            }
        })
}

// Query functions to display tables
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

const newDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter name for new a department',
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


const newRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter title for new a role',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary for the new role',
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter manager for new a role',
        }
    ])
        .then(data => {
            const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${data.title}','${data.salary}','${data.department}')`
            db.query(query, (err, res) => {
                console.table(res);
                whatToDo();
            })
        })
}



const newEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Enter employee first name',
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter employee last name',
        },
        {
            type: 'input',
            name: 'role',
            message: "Enter emplyee's role",
        },
        {
            type: 'input',
            name: 'manager',
            message: "Enter emplyee's manager"
        }
    ])
        .then(data => {
            const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstname}','${data.lastname}','${data.role}','${data.manager}')`
            db.query(query, (err, res) => {
                console.table(res);
                whatToDo();
            })
        })
}

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter a new role id number',
        },
        {
            type: 'input',
            name: 'employee',
            message: 'Enter employee id number to update role',
        },
    ])
        .then(data => {
            const query = `UPDATE employees SET role_id = ${data.newRole} WHERE id = ${data.employee}`
            db.query(query, (err, res) => {
                console.table(res);
                whatToDo();
            })
        })
}



whatToDo();