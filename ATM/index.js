import inquirer from 'inquirer';
const userId = '090078601';
const userPin = '787898';
let balance = Math.floor(Math.random() * 10000);
async function startATM() {
    console.log('Welcome to the ATM!');
    const { enteredUserId, enteredUserPin } = await inquirer.prompt([
        {
            type: 'input',
            name: 'enteredUserId',
            message: 'Enter your User ID:'
        },
        {
            type: 'password',
            name: 'enteredUserPin',
            message: 'Enter your PIN:'
        }
    ]);
    if (enteredUserId === userId && enteredUserPin === userPin) {
        console.log('Authentication successful!');
        await displayMenu();
    }
    else {
        console.log('Authentication failed. Exiting...');
    }
}
async function displayMenu() {
    console.log('\n1. Check Balance');
    console.log('2. Deposit');
    console.log('3. Withdraw');
    console.log('4. Exit');
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option:',
            choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit']
        }
    ]);
    switch (choice) {
        case 'Check Balance':
            console.log(`Your balance is: $${balance}`);
            break;
        case 'Deposit':
            await deposit();
            break;
        case 'Withdraw':
            await withdraw();
            break;
        case 'Exit':
            console.log('Thank you for using the ATM. Goodbye!');
            return;
    }
    await displayMenu();
}
async function deposit() {
    const { amount } = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount to deposit:'
        }
    ]);
    balance += amount;
    console.log(`$${amount} deposited successfully.`);
}
async function withdraw() {
    const { amount } = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount to withdraw:'
        }
    ]);
    if (amount > balance) {
        console.log('Insufficient funds.');
    }
    else {
        balance -= amount;
        console.log(`$${amount} withdrawn successfully.`);
    }
}
startATM();
