import inquirer from 'inquirer';
class Person {
    personality;
    constructor() {
        this.personality = "mystery"; // Default personality
    }
    async setPersonality() {
        const { talkToOthers } = await inquirer.prompt([
            {
                type: 'list',
                name: 'talkToOthers',
                message: 'Do you like to talk to others?',
                choices: ['Yes', 'No']
            }
        ]);
        this.personality = talkToOthers === 'Yes' ? 'extrovert' : 'introvert';
    }
    getPersonality() {
        return this.personality;
    }
}
class Student extends Person {
    name;
    constructor(name) {
        super(); // Call the parent class constructor
        this.name = name;
    }
    // Getter for Name
    getName() {
        return this.name;
    }
    // Setter for Name
    setName(newName) {
        this.name = newName;
    }
}
async function main() {
    // Ask for the student's name
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'What is the student\'s name?',
        },
    ]);
    const student = new Student(answers.studentName);
    console.log(`Student's name: ${student.getName()}`);
    await student.setPersonality();
    console.log(`Student's personality: ${student.getPersonality()}`);
}
main().catch(err => console.error(err));
