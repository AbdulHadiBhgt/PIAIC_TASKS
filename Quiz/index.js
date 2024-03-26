import inquirer from 'inquirer';
// Define questions and answers for the quiz
const quizQuestions = [
    {
        question: 'Which team won the inaugural edition of PSL in 2016?',
        answers: ['Islamabad United', 'Quetta Gladiators', 'Karachi Kings', 'Peshawar Zalmi'],
        correctAnswer: 'Islamabad United'
    },
    {
        question: 'Who scored the most runs in the 2020 edition of PSL?',
        answers: ['Babar Azam', 'Sharjeel Khan', 'Fakhar Zaman', 'Kamran Akmal'],
        correctAnswer: 'Babar Azam'
    },
    {
        question: 'Which team has won the most titles in PSL history?',
        answers: ['Islamabad United', 'Peshawar Zalmi', 'Karachi Kings', 'Quetta Gladiators'],
        correctAnswer: 'Islamabad United'
    },
    {
        question: 'Who has taken the most wickets in PSL history?',
        answers: ['Wahab Riaz', 'Hasan Ali', 'Shaheen Afridi', 'Sohail Tanvir'],
        correctAnswer: 'Wahab Riaz'
    },
    {
        question: 'Which city hosted the most recent PSL final?',
        answers: ['Lahore', 'Karachi', 'Rawalpindi', 'Multan'],
        correctAnswer: 'Karachi'
    }
];
// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Function to start the quiz
async function startQuiz() {
    let score = 0;
    console.log('Welcome to the PSL Quiz Game!\n');
    // Shuffle the questions
    shuffleArray(quizQuestions);
    // Iterate through each question
    for (const question of quizQuestions) {
        // Shuffle the answers
        shuffleArray(question.answers);
        // Prompt the user with the question and answers
        const { answer } = await inquirer.prompt([
            {
                type: 'list',
                name: 'answer',
                message: question.question,
                choices: question.answers
            }
        ]);
        // Check if the answer is correct
        if (answer === question.correctAnswer) {
            console.log('Correct!\n');
            score += 10; // Increment score by 10 for each correct answer
        }
        else {
            console.log(`Incorrect.`);
        }
    }
    // Display final score
    console.log(`Your final score is: ${score}`);
}
// Start the quiz
startQuiz().catch(err => console.error(err));
