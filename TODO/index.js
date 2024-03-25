import inquirer from 'inquirer';
let todos = [];
let nextId = 1;
async function main() {
    console.log('Welcome to Todo List!');
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Choose an action:',
                choices: [
                    'Add Todo',
                    'View Todos for Today',
                    'View Todos for Specific Date',
                    'Mark Todo as Complete',
                    'Remove Todo',
                    'Exit'
                ]
            }
        ]);
        switch (choice) {
            case 'Add Todo':
                await addTodo();
                break;
            case 'View Todos for Today':
                await viewTodosForDate(new Date().toISOString().split('T')[0]);
                break;
            case 'View Todos for Specific Date':
                await viewTodosForSpecificDate();
                break;
            case 'Mark Todo as Complete':
                await markTodoAsComplete();
                break;
            case 'Remove Todo':
                await removeTodo();
                break;
            case 'Exit':
                console.log('Exiting...');
                return;
        }
    }
}
async function addTodo() {
    const { description, date } = await inquirer.prompt([
        {
            type: 'input',
            name: 'description',
            message: 'Enter todo description:'
        },
        {
            type: 'input',
            name: 'date',
            message: 'Enter date (YYYY-MM-DD) (Press enter for today):',
            default: new Date().toISOString().split('T')[0]
        }
    ]);
    todos.push({ id: nextId++, description, date, completed: false });
    console.log('Todo added successfully.');
}
async function viewTodosForDate(date) {
    const todosForDate = todos.filter(todo => todo.date === date);
    if (todosForDate.length === 0) {
        console.log('No todos for this date.');
    }
    else {
        console.log(`Todos for ${date}:`);
        todosForDate.forEach(todo => {
            console.log(`${todo.id}. [${todo.completed ? 'x' : ' '}] ${todo.description}`);
        });
    }
}
async function viewTodosForSpecificDate() {
    const { date } = await inquirer.prompt([
        {
            type: 'input',
            name: 'date',
            message: 'Enter date (YYYY-MM-DD):'
        }
    ]);
    viewTodosForDate(date);
}
async function markTodoAsComplete() {
    const { id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter the ID of the todo to mark as complete:'
        }
    ]);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = true;
        console.log('Todo marked as complete.');
    }
    else {
        console.log('Todo not found.');
    }
}
async function removeTodo() {
    const { id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter the ID of the todo to remove:'
        }
    ]);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        console.log('Todo removed successfully.');
    }
    else {
        console.log('Todo not found.');
    }
}
main();
