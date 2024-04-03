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
                message: "What do you want to add to your Todos?",
                validate: function(input: string){
                    if(input.trim() === ""){
                        return "Please enter a valid todo item.";
                    }
                    return true;
                }
            },
            {
                name: "addMore",
                type: "confirm",
                message: "Do you want to add more?",
                default: true
            }
        ]) as { todo: string, addMore: boolean };
        if(addTask.todo.trim() !== ""){
            todos.push(addTask.todo);
        }else{
            console.log("Please enter a valid todo item.");
        }
        condition = addTask.addMore;
        console.log(todos);
    }

    // After adding todos, ask if the user wants to remove any item
    const removeItem: {remove: boolean} = await inquirer.prompt({
        name: "remove",
        type: "confirm",
        message: "Do you want to remove any item from the Todo list?",
        default: false
    });

    // If the user entered a valid index (not 0), remove the item
    if (removeItem.remove) {
        let removedIndex = await inquirer.prompt({
            name: "index",
            type: "number",
            message: "Enter the index of the item you want to remove (1-based index):",
            validate: (input: number) => input >= 1 && input <= todos.length
        });
        let removedItem = todos.splice(removedIndex.index - 1, 1);
        console.log(`Item '${removedItem[0]}' removed from the todos list.`);
    } else {
        console.log("No item was removed.");
    }
    let viewList = await inquirer.prompt({
        name: "view",
        type: "confirm",
        message: "Do you want to view your todos items?",
        default: true
    });
    if(viewList.view){
        console.log("Your todos list:");
        todos.forEach((todo, index) => {
            console.log(`${index + 1}.${todo}`);
        });
    }
}

main();
