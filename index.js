const db = require('./db/connection')
const inquirer = require('inquirer')

const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is name of your project?'
    },
    {
        type: 'input',
        name: 'projectDescription',
        message: 'Please provide a description?'
    },
    {
        type: 'input',
        name: 'projectImage',
        message: 'Would you like to add an image of your project?'
    },
    {
        type: 'input',
        name: 'userStory',
        message: 'Please tell us what inspired you or your to create the app?'
    },
    {
        type: 'input',
        name: 'installationGuide',
        message: 'Please provide guidance for installation:'
    },
    {
        type: 'input',
        name: 'usageGuide',
        message: 'How do you use the app?'
    },
    {
        type: 'input',
        name: 'authors',
        message: 'Who are the contributing authors?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please tell us under what license this is under?',
        choices: ['MIT', 'BSD3', 'APACHE2.0', 'NONE'],
    },
    {
        type: 'input',
        name: 'resources',
        message: 'Please let us know of any resources you used to aid in the project:'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please provide information regarding tests if there is a test for this app:'
    },
    {
        type: 'input',
        name: 'githubName',
        message: 'Please enter your GitHub user name:'
    },
    {
        type: 'input',
        name: 'eMailAddress',
        message: 'Please enter your email address:'
    },
    {
        type: 'input',
        name: 'questionsInfo',
        message: 'Please provide additional information about the application to guide user questions that would help development:'
    },
];

inquirer.prompt(questions)