//packages
const inquirer = require('inquirer');
const conn = require('./lib/connection.js');

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
    name: "empUpdateID",
    message: "Which employee is having their role updated (give an ID)?",
    when: (answers) => answers.choices === 'Update an Employee Role'
    },
    {
    type: "input",
    name: "empUpdateRole",
    message: "What is the new role for the employee?",
    when: (answers) => answers.choices === 'Update an Employee Role'
    },
    
];


function NewDept(dept){
    let sql = `INSERT INTO department (name) VALUES("${dept}")`;
    return sql;
};
function NewRole(questions){
    let sql = `INSERT INTO role (title,salary,department_id) VALUES("${questions.roleName}",${questions.salary},${questions.deptId})`;
    return sql;
};
function NewEmployee(questions){
    let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${questions.newEmpF}","${questions.newEmpL}",${questions.newEmpR},${questions.newEmpM})`;
    return sql;
};
function UpdateEmployee(questions){
    let sql = `UPDATE employee SET role_id =${questions.empUpdateRole} WHERE id =${questions.empUpdateID}`;
    return sql;
}

function init() {
    inquirer.prompt(questions)
    .then(answers=>{
        console.log(answers);
        switch(answers.choices) {
        case 'View Departments':
            conn.query('SELECT * FROM department', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.table(data);
                }
        
            })
        conn.connect(function (err) {
            if (err) throw err;
        })
          break;
        case 'View Roles':
            conn.query('SELECT * FROM role', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.table(data);
                }
        
            })
        conn.connect(function (err) {
            if (err) throw err;
        })
            break;
        case 'View Employees':
            conn.query('SELECT * FROM employee', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.table(data);
                }
        
            })
        conn.connect(function (err) {
            if (err) throw err;
        })
            break;
        case 'Add a Department':
            let sql = NewDept(answers.deptName);
            conn.query(sql, function (err, result) {  
                if (err) throw err;  
                console.log("new department inserted");  
            });
            break;
        case 'Add a Role':
            let sql2 = NewRole(answers);
            conn.query(sql2, function (err, result) {  
                if (err) throw err;  
                console.log("new role inserted");  
            });
            break;
        case 'Add an Employee':
            let sql3 = NewEmployee(answers);
            conn.query(sql3, function (err, result) {  
                if (err) throw err;  
                console.log("new employee inserted");  
            });
            break;
        case 'Update an Employee Role':
            let sql4 = UpdateEmployee(answers);
            conn.query(sql4, function (err, result) {  
                if (err) throw err;  
                console.log("employee role updated successfully");  
            });
            break;
        }
return;
    });

//console.log('oh my god');
};

init();
