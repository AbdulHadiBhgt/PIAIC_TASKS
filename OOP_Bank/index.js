import inquirer from 'inquirer';
class Customer {
    name;
    accountNumber;
    balance;
    constructor(name, accountNumber, initialDeposit) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = initialDeposit;
    }
    // Method to credit (add money to) the account
    credit(amount) {
        this.balance += amount;
        console.log(`$${amount} has been credited to your account.`);
    }
    // Method to debit (withdraw money from) the account
    debit(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`$${amount} has been debited from your account.`);
        }
        else {
            console.log('Insufficient balance.');
        }
    }
    // Method to display the current balance
    displayBalance() {
        console.log(`Your current balance is $${this.balance}.`);
    }
}
async function main() {
    // Registering a customer account
    console.log('Welcome to the Bank App!');
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'input',
            name: 'accountNumber',
            message: 'Choose an account number:',
        },
        {
            type: 'number',
            name: 'initialDeposit',
            message: 'Initial deposit amount:',
            validate: (input) => {
                return input > 0 || 'Initial deposit should be more than 0.';
            },
        },
    ]);
    const customer = new Customer(answers.name, answers.accountNumber, answers.initialDeposit);
    // Function to display menu and handle user choices
    const displayMenu = async () => {
        const choice = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Credit', 'Debit', 'Display Balance', 'Exit'],
            },
        ]);
        switch (choice.action) {
            case 'Credit':
                const { creditAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'creditAmount',
                        message: 'Amount to credit:',
                        validate: (input) => {
                            return input > 0 || 'Amount must be greater than 0.';
                        },
                    },
                ]);
                customer.credit(creditAmount);
                break;
            case 'Debit':
                const { debitAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'debitAmount',
                        message: 'Amount to debit:',
                        validate: (input) => {
                            return input > 0 || 'Amount must be greater than 0.';
                        },
                    },
                ]);
                customer.debit(debitAmount);
                break;
            case 'Display Balance':
                customer.displayBalance();
                break;
            case 'Exit':
                console.log('Thank you for using Bank App!');
                return;
        }
        // Display menu again unless the user chooses to exit
        await displayMenu();
    };
    // Initial call to display the menu
    await displayMenu();
}
main().catch((err) => console.error(err));
