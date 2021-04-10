const {
    mainPrompt,
    selectFromList,
    getName,
    getSalary
} = require('./utils/prompts');
const db = require('./db');
require('console.table');
const logo = require('asciiart-logo');
const appLogo = logo({ name: "Employee Manager" }).render()

// Function for departments
function viewAllDepartments() {
    db.readAllDepartments()
        .then(res => {
            console.log('\n');
            console.table(res);
        })
        .then() => askUser()
        .catch(err => console.log(err));
}

function viewUtilizedBudgetByDpt() {
    db.readAllDepartments()
        .then(res => {
            const departments = res.map(row=> {
                value: row.id,
                name: row.department
            }));
            selectFromList('department', departments)
                .then(userPick => {
                    db.readUtilizedBudget(userPick.id)
                        .then(res => {
                            console.log('\n');
                            console.table(res);
                        })
                        .then(() => askUser())
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

function addDepartment() {
    getName("department's name")
        .then(userInput => {
            db.createDepartment(userInput.newName)
                .then(() => askuser())
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

function removeDepartment() {
    db.readAllDepartments()
        .then(res => {
            const departments = res.map(row => ({
                value: row.id;
                name: row.department
            }));
            selectFromList("department", departments)
                .then(userPick => {
                    db.deleteDepartment(userPick.id)
                        .then(() => askuser())
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));