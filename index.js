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
        .then(() => askUser())
        .catch(err => console.log(err));
}

function viewUtilizedBudgetByDpt() {
    db.readAllDepartments()
        .then(res => {
            const departments = res.map(row => ({
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
                .then(() => askUser())
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

function removeDepartment() {
    db.readAllDepartments()
        .then(res => {
            const departments = res.map(row => ({
                value: row.id,
                name: row.department
            }));
            selectFromList('department', departments)
                .then(userPick => {
                    db.deleteDepartment(userPick.id)
                        .then(() => askUser())
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

//Functions for employee roles 
function viewAllRoles() {
    db.readAllRoles()
        .then(res => {
            console.log('\n');
            console.table(res);
        })
        .then(() => askUser())
        .catch(err => console.log(err));
}

function addRole() {
    let newRole = [];
    getName("job's title")
        .then(userInput => {
            // New role with "title"
            newRole.push(userInput.newName);
            getSalary()
                .then(userInput => {
                    newRole.push(userInput.salary);
                    // New role with title + salary 
                    db.readAllDepartments()
                        .then(res => {
                            const departments = res.map(row => ({
                                value: row.id,
                                name: row.department
                            }));
                            // New role with titel + salary + deparment ids 
                            selectFromList('department', departments)
                                .then(userPick => {
                                    newRole.push(userPick.id);
                                    db.createRole(newRole)
                                        .then(() => askUser())
                                        .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

function removeRole() {
    db.readAllRoles()
        .then(res => {
            const roles = res.map(row => ({
                value: row.role_id,
                name: row.title
            }));
            selectFromList('job title', roles)
                .then(userPick => {
                    db.deleteRole(userPick.id)
                        .then(() => askUser())
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

// Functions to view employees
function viewAllEmployees() {
    db.readAllEmployees()
        .then(res => {
            console.log('\n');
            console.table(res);
        })
        .then(() => askUser())
        .catch(err => console.log(err));
}

function viewEmployeesByMgr() {
    db.readAllManagers()
        .then(res => {
            const managers = res.map(row => ({
                value: row.mgr_id,
                name: row.mgr_name
            }));
            selectFromList('manager', managers)
                .then(userPick => {
                    db.readEmployeesByMgr(userPick.id)
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

function viewEmployeesByDpt() {
    db.readAllDepartments()
        .then(res => {
            const departments = res.map(row => ({
                value: row.id,
                name: row.department
            }));
            selectFromList('department', departments)
                .then(userPick => {
                    db.readEmployeesByDpt(userPick.id)
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

// Employee first names
function addEmployee() {
    let newEmployee = [];
    getName("employee's first name")
        .then(userInput => {
            newEmployee.push(userInput.newName);
            getName("employee's last name")
                .then(userInput => {

                    // Employee first + last name
                    newEmployee.push(userInput.newName);
                    db.readAllRoles()
                        .then(res => {
                            const roles = res.map(row => ({
                                value: row.role_id,
                                name: row.title
                            }));
                            
                            // Employee first + last name + roles
                            selectFromList('job title', roles)
                                .then(userPick => {
                                    newEmployee.push(userPick.id);
                                    db.readAllManagers()
                                        .then(res => {
                                            const managers = res.map(row => ({
                                                value: row.mgr_id,
                                                name: row.mgr_name
                                            }));
                                            managers.push({
                                                value: null,
                                                name: 'No manager'
                                            });

                                            // Employee first + last name + roles + managers
                                            selectFromList('manager', managers)
                                                .then(userPick => {
                                                    newEmployee.push(userPick.id);
                                                    db.createEmployee(newEmployee)
                                                        .then(() => askUser())
                                                        .catch(err => console.log(err));
                                                })
                                                .catch(err => console.log(err));
                                        })
                                        .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

// Function changing employees
function changeEmployeeRole() {
    let empRole = [];
    db.readAllEmployees()
        .then(res => {
            const employees = res.map(row => ({
                value: row.id,
                name: row.first_name + ' ' + row.last_name
            }));

            // Employee id
            selectFromList('employee', employees)
                .then(userPick => {
                    empRole.push(userPick.id);
                    db.readAllRoles()
                        .then(res => {
                            const roles = res.map(row => ({
                                value: row.role_id,
                                name: row.title
                            }));

                            // Employee id + roles
                            selectFromList('job title', roles)
                                .then(userPick => {
                                    empRole.push(userPick.id);
                                    db.updateEmployeeRole(empRole)
                                        .then(() => askUser())
                                        .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

// Changing Employees managers
function changeEmployeeMgr() {
    let empMgr = [];
    db.readAllEmployees()
        .then(res => {
            const employees = res.map(row => ({
                value: row.id,
                name: row.first_name + ' ' + row.last_name
            }));
            selectFromList('employee', employees)
                .then(userPick => {
                    empMgr.push(userPick.id);
                    db.readAllManagers()
                        .then(res => {
                            const managers = res.map(row => ({
                                value: row.mgr_id,
                                name: row.mgr_name
                            }));

                            // Manager + id
                            selectFromList('manager', managers)
                                .then(userPick => {
                                    empMgr.push(userPick.id);
                                    db.updateEmployeeMgr(empMgr)
                                        .then(() => askUser())
                                        .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

// Function for employee removal 
function removeEmployee() {
    db.readAllEmployees()
        .then(res => {
            const employees = res.map(row => ({
                value: row.id,
                name: row.first_name + ' ' + row.last_name
            }));
            selectFromList('employee', employees)
                .then(userPick => {
                    db.deleteEmployee(userPick.id)
                        .then(() => askUser())
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}
