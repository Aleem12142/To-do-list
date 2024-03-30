#! /usr/bin/env node 

import inquirer from "inquirer";

let todos: string[] = [];
let condition: boolean = true;

async function main() {
    while (condition) {
        let addTask = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "What do you want to add to your Todos?"
            },
            {
                name: "addMore",
                type: "confirm",
                message: "Do you want to add more?",
                default: false
            }
        ]) as { todo: string, addMore: boolean };
        todos.push(addTask.todo);
        condition = addTask.addMore;
        console.log(todos);
    }

    // After adding todos, ask if the user wants to remove any item
    const removeItem = await inquirer.prompt({
        name: "removeIndex",
        type: "number",
        message: "Enter the index of the item you want to remove from the Todos list (0 to cancel):",
        validate: (input: number) => input >= 0 && input < todos.length + 1
    });

    // If the user entered a valid index (not 0), remove the item
    if (removeItem.removeIndex !== 0) {
        const removedItem = todos.splice(removeItem.removeIndex - 1, 1);
        console.log(`Item '${removedItem[0]}' removed from the Todos list.`);
        console.log(todos);
    } else {
        console.log("No item was removed.");
    }
}

main();
