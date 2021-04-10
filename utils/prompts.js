const inquirer = require('inquirer'); 

// Prompts for main list
const mainPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'add department',
                'remove department',
                'view all roles',
                'add role',
                'remove role',
                'view all employees',
                'view all employees by department',
                'add employee',
                'update employee role',
                'remove employee',
                'view utilized budget by department',
                'exit'
            ]
        }
    ]);
};

// List selection
const selectFromList = (topic, selectionList) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: `Which ${topic} would you like to select?`,
            choices: selectionList
        }
    ]);
};

// Name
const getName = (nameWanted) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'newName',
            message: `What is the ${nameWanted}?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return `Please enter the ${nameWanteed}.`,
                }                
            }
        }
    ]);
};

// Salary
const getSalary = () => {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary?',
            validate: nInput => {
                if (!isNaN(parseFloat(nbInput)) && parseFloat(nbInput) >= 0) {
                    return true;
                } else {
                    return 'Please enter a positive number.',                    
                }
            }
        }
    ]);
};

module.exports = {
    mainprompt,
    selectfromList,
    getname,
    getSsalary
}