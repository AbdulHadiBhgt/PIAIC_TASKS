import inquirer from 'inquirer';

class Person {
  private personality: string;

  constructor() {
    this.personality = "mystery"; // Default personality
  }

  async setPersonality(): Promise<void> {
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

  getPersonality(): string {
    return this.personality;
  }
}

class Student extends Person {
  private name: string;

  constructor(name: string) {
    super(); // Call the parent class constructor
    this.name = name;
  }

  // Getter for Name
  getName(): string {
    return this.name;
  }

  // Setter for Name
  setName(newName: string): void {
    this.name = newName;
  }
}

async function main(): Promise<void> {
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
