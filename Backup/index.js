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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role',]
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



const newDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter name for new a department',
        }
    ])
        .then(data => {
            const query = `INSERT INTO departments (title) VALUES ('${data.department}')`
            db.query(query, (err, res) => {
                console.table(res);
                whatToDo();
            })
        })
}

const newRole = () => {
    const departmentQuery = `SELECT * FROM departments`
    db.query(departmentQuery, (err, res) => {
        const departmentChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Enter name for a role?',
                choices: ['Manager', 'Subordinate',]
            },
        ])
            .then(data => {
                if (data.role === 'Manager') {
                    addManager();
                } else {
                    addSubordinateRole();
                }
            })
    })
}

const addManager = () => {
    const departmentQuery = `SELECT * FROM departments`
    db.query(departmentQuery, (err, res) => {
        const departmentChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstname',
                message: 'Enter Manager first name',
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'Enter Manager last name',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Asign Manager to department?',
                choices: departmentChoices
            }
        ])
    })
}

const addSubordinateRole = () => {
    const departmentQuery = `SELECT * FROM departments`
    db.query(departmentQuery, (err, res) => {
        const departmentChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Enter name for a role?',
                choices: ['Manager', 'Supervisor', 'Agent', 'Sales', 'Reseptionist',]
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary for the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Select department for the role?',
                choices: departmentChoices
            }
        ])
            .then(data => {
                if (data.role === 'Manager') {
                    addManager();
                }
            })
            .then(data => {
                const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${data.role}','${data.salary}','${data.department}')`
                db.query(query, (err, res) => {
                    console.table(res);
                    whatToDo();
                })
            })

    })
}



const newEmployee = () => {
    const roleQuery = `SELECT * FROM roles`
    db.query(roleQuery, (err, res) => {
        const roleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
        }))

        const managerQuery = `SELECT * FROM employees WHERE manager_id IS NULL`
        db.query(managerQuery, (err, res) => {
            const managerChoices = res.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))

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
                    type: 'list',
                    name: 'role',
                    message: "Enter emplyee's role",
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Enter emplyee's manager",
                    choices: managerChoices
                }
            ])
                .then(data => {
                    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstname}','${data.lastname}','${data.role}','${data.manager}')`
                    db.query(query, (err, res) => {
                        console.table(res);
                        whatToDo();
                    })
                })
        })
    })
}

const updateEmployeeRole = () => {
    const newRoleQuery = `SELECT * FROM roles`
    db.query(newRoleQuery, (err, res) => {
        const newRoleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
        }))
        const selectEmployeeQuery = `SELECT * FROM employees WHERE manager_id IS NOT NULL`
        db.query(selectEmployeeQuery, (err, res) => {
            const employeeChoices = res.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Enter a new role id number',
                    choices: newRoleChoices
                },
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Enter employee id number to update role',
                    choices: employeeChoices
                },
            ])
                .then(data => {
                    const query = `UPDATE employees SET role_id = ${data.newRole} WHERE id = ${data.employee}`
                    db.query(query, (err, res) => {
                        console.table(res);
                        whatToDo();
                    })
                })
        })
    })
}

// Query functions to display tables
const viewAllDepartments = () => {
    console.log(`
================================================
                All Deparments!
================================================
    `
    )
    const query = "SELECT * FROM departments"
    db.query(query, (err, res) => {
        console.table(res);
        whatToDo();
    })
}

const viewAllRoles = () => {
    console.log(`
================================================
                  All Roles!
================================================
        `
    )
    const query = 'SELECT * FROM roles'
    db.query(query, (err, res) => {
        console.table(res);
        whatToDo();
    })
}

const viewAllEmployees = () => {
    console.log(`
================================================
 All Employees, Roles, Department and Managers!
================================================
        `
    )
    const query = 'SELECT * FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id'
    db.query(query, (err, res) => {
        console.table(res);
        whatToDo();
    })
}

whatToDo();