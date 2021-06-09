

# (EMS) Employee Management System

## Description
  In this command line interfacing app, you can create managers and other employee, adding their roles, and assign them to departments, you can even modify employees as promotions are made available with increased salary. For a higher resolution video demo please click <a href="https://github.com/CastroOlympias/Employee-Manager/blob/main/media/demo/Employee%20Manager%20System.mp4?raw=true">here.</a>

<img src="https://github.com/CastroOlympias/Employee-Manager/blob/main/media/demo/Employee%20Manager%20System.gif"/>

## Table of Contents
- [Story](#Story)
- [Installation](#Installation)
- [Usage](#Usage)
- [Authors](#Authors)
- [Resources](#Resources)


## Story
  My brain was created for trouble shooting, experiment and and to create useful tools

## Installation
  This application requires 'npm install inquire', ‘npm install mysql2’ and ‘npm install console.table –save’.

## Usage
  In your preferred command line utility (git bash for me) just run ‘node index.js’ to start the app, then you’ll see a prompts for user input to create departments, roles, add managers and employees, plus view employee information about their role, department, manager and salary.

## Authors
  Just myself.



## Resources
  node.js inquirer node.js, inquirer and MySQL database.

## Testing
  The app working or not was really the test.  

## Questions
  Git Hub Link: https://github.com/CastroOlympias
  <br>
  eMail address: blackcarrera@msn.com
  <br>
  Additional Information:

  ## Criteria for the app
  
  GIVEN a command-line application that accepts user input
  WHEN I start the application
  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

  WHEN I choose to view all departments
  THEN I am presented with a formatted table showing department names and department ids

  WHEN I choose to view all roles
  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

  WHEN I choose to view all employees
  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

  WHEN I choose to add a department
  THEN I am prompted to enter the name of the department and that department is added to the database

  WHEN I choose to add a role
  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

  WHEN I choose to add an employee
  THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

  WHEN I choose to update an employee role
  THEN I am prompted to select an employee to update and their new role and this information is updated in the database

  ## END Criteria.

  ## Challenges, feature some ideas:

  Not mentioned in the criteria, are there any instructions to create managers, not having any managers prevents one from selecting managers when adding employees, so this app seems to assume managers already exit, but I think pre-seeding the Managers takes away from the versatility of this app so I made so that I can create managers. I ran out of time, but in no way am I out of ideas to tweak, change or modify this, and with their domino effects of changes takes due interlinking tables a lot of forethought is necessary, which I am plentiful of.

  Having the ability to update managers, though not a require would add greater virility to the app since people do change positions and get promoted to other departments. This leaves room to change the department for a manager without having to go through the process of creating a new manager just to assign a department. (Function not built) but doable based on the function to update employee’s role.

  I was confused at first thinking of create duplicate roles when assign them to departments, eg. Create a role for department 1 and a manager for department 2, but that having a domino effect meant when selecting a role and department together, the list provided was Manager being repeated multi times, which could be a cool idea for even more diversity, such as department + role having greater verity of salary pay. I just didn’t quit have the MySQL query figured out to combine the two so it would appear like Manager of department One, in the list of options.
  Another issue is the Manger department assignment is not correct and I have ideas to tackle that, I just ran out of time for this app.
  By all means, I am not out of ideas.

