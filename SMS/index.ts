import inquirer from 'inquirer';

// Course class
class Course {
  constructor(public name: string, public code: string, public credits: number, public fee: number) {}
}

// Student class
class Student {
  static nextStudentId = 10000; // Initial value for student ID generation

  constructor(public name: string, public courses: Course[] = [], public balance: number = 0) {
    this.id = Student.generateStudentId();
  }

  readonly id: number;

  // Generates a unique 5-digit student ID
  private static generateStudentId(): number {
    return Student.nextStudentId++;
  }

  // Enroll a student in a course
  enroll(course: Course): void {
    this.courses.push(course);
    this.balance += course.fee; // Add course fee to student balance
  }

  // View student balance
  viewBalance(): void {
    console.log(`Student ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Balance: $${this.balance}`);
  }

  // Pay tuition fees
  async payTuition(): Promise<void> {
    const { amount } = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: `Enter amount to pay for student ${this.name}:`
      }
    ]);

    if (amount > this.balance) {
      console.log('Invalid payment amount. Please enter a valid amount.');
    } else {
      this.balance -= amount;
      console.log(`$${amount} paid successfully.`);
    }
  }

  // Show student status
  showStatus(): void {
    console.log(`Student ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log('Courses Enrolled:');
    this.courses.forEach(course => {
      console.log(`- ${course.name} (${course.code})`);
    });
    console.log(`Balance: $${this.balance}`);
  }
}

// Sample courses
const courses: Course[] = [
  new Course('Mathematics', 'MATH101', 3, 300),
  new Course('English', 'ENG101', 3, 300),
  new Course('Physics', 'PHY101', 4, 400)
];

// Function to enroll student in courses
async function enrollStudent(student: Student): Promise<void> {
  console.log('Available Courses:');
  courses.forEach(course => {
    console.log(`${course.name} (${course.code}) - Credits: ${course.credits} Fee: $${course.fee}`);
  });

  const { courseCode } = await inquirer.prompt([
    {
      type: 'input',
      name: 'courseCode',
      message: 'Enter the course code to enroll in (or type "done" to finish):'
    }
  ]);

  if (courseCode.toLowerCase() === 'done') {
    return;
  }

  const course = courses.find(course => course.code === courseCode);
  if (course) {
    student.enroll(course);
    console.log(`Enrolled in ${course.name} successfully.`);
  } else {
    console.log('Invalid course code. Please enter a valid course code.');
  }

  await enrollStudent(student); // Recursive call for enrolling in more courses
}

// Main function
async function main(): Promise<void> {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter student name:'
    }
  ]);

  const student = new Student(name);

  console.log(`Student ${student.id} created successfully.`);
  console.log('Enrolling in courses...');
  await enrollStudent(student);

  console.log('\nStudent Enrollment Completed.');

  while (true) {
    const { operation } = await inquirer.prompt([
      {
        type: 'list',
        name: 'operation',
        message: 'Select operation:',
        choices: ['View Balance', 'Pay Tuition', 'Show Status', 'Exit']
      }
    ]);

    switch (operation) {
      case 'View Balance':
        student.viewBalance();
        break;
      case 'Pay Tuition':
        await student.payTuition();
        break;
      case 'Show Status':
        student.showStatus();
        break;
      case 'Exit':
        console.log('Exiting...');
        return;
    }
  }
}

// Run the main function
main().catch(err => console.error(err));
