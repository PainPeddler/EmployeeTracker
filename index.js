//packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//     //sql password here
//       password: process.env.DB_PASSWORD,
//       database: 'employee_db'
//     },
//     console.log(`Connected to the employee_db database.`)
//   );

//Questions to be prompted for database entry
const questions = [{
    type: 'list',
    name: 'choices',
    message: 'Hello, what would you like to do?',
    choices: ['View Departments', 'View Roles', 'View Employees',
        'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 
        ],
    },
//New Department Entry
    {
    type: 'input',
    name: 'deptName',
    message: 'Enter a name for this department:',
    when: (answers) => answers.choices === 'Add a Department',
},
//next 3 prompts all happen together if a new role is to be submitted
    {
    type: 'input',
    name: 'roleName',
    message: "Please enter a name for this role:",
    when: (answers) => answers.choices === 'Add a Role'
        },
        {
    type: 'input',
    name: "deptId",
    message: "Enter the department ID for this role:",
    when: (answers) => answers.choices === 'Add a Role'
        },
        {
    type: "input",
    name: "salary",
    message: "Enter the salary for this role(watch your 0's):",
    when: (answers) => answers.choices === 'Add a Role'
    },
//Adding a new employee
    {type: "input",
    name: "newEmpF",
    message: "What is the new employee's first name?",
    when: (answers) => answers.choices === 'Add an Employee'
    },
    {type: "input",
    name: "newEmpL",
    message: "What is the new employee's last name?",
    when: (answers) => answers.choices === 'Add an Employee'
    },
    {type: "input",
    name: "newEmpR",
    message: "What is the new employee's role id?",
    when: (answers) => answers.choices === 'Add an Employee'
    },
    {type: "input",
    name: "newEmpM",
    message: "What is the new employee's manager id?",
    when: (answers) => answers.choices === 'Add an Employee'
    },
//Update an employee
    {
    type: "input",
    name: "empUpdate",
    message: "What is the new role for the employee?",
    when: (answers) => answers.choices === 'Update an Employee Role'
    },
];
inquirer.prompt(questions);

function NewDept(){
    let sql = `INSERT INTO department (name) VALUES(${questions.deptName})`;
    return sql;
}
function NewRole(){
    let sql = `INSERT INTO role (title,salary,department_id) VALUES(${questions.roleName},${questions.salary},${questions.deptID})`;
    return sql;
}
function NewEmployee(){
    let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(${questions.roleName},${questions.salary},${questions.deptID})`;
    return sql;
}
/*
function init() {
    inquirer.prompt(questions)
};

init(); */