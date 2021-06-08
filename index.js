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
            const query = `INSERT INTO departments (dept_title) VALUES ('${data.department}')`
            db.query(query, (err, res) => {
                console.table(res);
                whatToDo();
            })
        })
}

const newRole = () => {
    const departmentQuery = `SELECT * FROM departments`
    db.query(departmentQuery, (err, res) => {
        const departmentChoices = res.map(({ id, dept_title }) => ({
            name: dept_title,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'title',
                message: 'Select role for the job?',
                choices: ['Manager', 'Supervisor', 'Sales', 'Agent',]
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
                const query = `INSERT INTO roles (role_title, salary, department_id) VALUES ('${data.title}','${data.salary}','${data.department}')`
                db.query(query, (err, res) => {
                    console.table(res);
                    whatToDo();
                })
            })
    })
}


const newEmployee = () => {
    // const roleQuery = `SELECT * FROM roles`
    // db.query(roleQuery, (err, res) => {
    //     const roleChoices = res.map(({ id, role_title }) => ({
    //         name: role_title,
    //         value: id,
    //     }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'roles',
                message: "Choose management or subordinate role setup",
                choices: ['Manager', 'Subordinate']
            },
        ])
            .then(data => {
                console.log(data.roles)
                if (data.roles === 'Manager') {
                    createManager();
                }
                else {
                    createSubordinate();
                }
            })
    // })
}

const createManager = () => {
    const depatmentQuery = `SELECT * FROM departments`
    db.query(depatmentQuery, (err, res) => {
        const departmentChoices = res.map(({ role_id, role_title, dept_id, dept_title }) => ({
            name: `${role_title, dept_title}`,
            value: `${role_id, dept_id}`
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
                name: 'department',
                message: 'Assign Manager to a department',
                choices: departmentChoices
            },
        ])
            .then(data => {
                const queryOne = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstname}','${data.lastname}', 1, NULL)`
                db.query(queryOne, (err, res) => {
                    console.table(res);
                    // whatToDo();

                    const query = `SET INTO roles (id) VALUES ('3')`
                    db.query(query, (err, res) => {
                        console.table(res);
                        whatToDo();
                    })
                })
            })
    })
}




const createSubordinate = () => {
    const roleQuery = `SELECT * FROM roles WHERE roles.role_title  != ('Manager')`
    db.query(roleQuery, (err, res) => {
        const roleChoices = res.map(({ id, role_title }) => ({
            name: role_title,
            value: id
        }))

        const managerQuery = `SELECT * FROM employees WHERE role_id = 1`
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
                    message: "Choose employee's role",
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Enter employee's manager",
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
    const newRoleQuery = `SELECT * FROM roles WHERE roles.role_title  != ('Manager')`
    db.query(newRoleQuery, (err, res) => {
        const newRoleChoices = res.map(({ id, role_title }) => ({
            name: role_title,
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
                    message: 'Select new role',
                    choices: newRoleChoices
                },
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select employee for role change',
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


    // SELECT employees.id, employees.first_name, employees.last_name, roles.id AS role_id, roles.title AS role_name, departments.id, departments.title FROM employees INNER JOIN roles ON employees.id = roles.id INNER JOIN departments ON roles.id = departments.id;

    // SELECT employees.id, employees.first_name, employees.last_name, roles.id AS role_id, roles.title AS role_name, departments.id AS dept_id, departments.title FROM employees INNER JOIN roles ON employees.id = roles.id INNER JOIN departments ON roles.id = departments.id;
