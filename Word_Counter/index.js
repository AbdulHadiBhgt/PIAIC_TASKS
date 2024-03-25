import inquirer from 'inquirer';
console.log('Welcome to Word Counter!');
const { paragraph } = await inquirer.prompt([
    {
        type: 'input',
        name: 'paragraph',
        message: 'Enter paragraph:'
    }
]);
var wordsCount = 0;
var charCount = 0;
paragraph.split(' ').forEach((word) => {
    wordsCount++;
    charCount += word.length;
});
console.log(`Words Count : ${wordsCount}`);
console.log(`Chars Count : ${charCount}`);
