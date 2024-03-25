import inquirer from "inquirer";
class NumberGame {
    level;
    range;
    secretNumber;
    points;
    answerPoints;
    constructor() {
        this.secretNumber = this.range = -1;
        this.level = 1;
        this.points = 0;
        this.answerPoints = 10;
        this.setRange();
        this.generateSecretNumber();
    }
    setRange() {
        this.range = Math.pow(10, this.level);
    }
    generateSecretNumber() {
        this.secretNumber = Math.floor(Math.random() * this.range) + 1;
    }
    getHint() {
        return this.secretNumber % 2 === 0 ? 'even' : 'odd';
    }
    //   private decreasePoints(): void {
    //     this.points = Math.ceil(this.points / 2);
    //   }
    increasePoints() {
        this.points += this.answerPoints;
    }
    async promptUser() {
        const { answer } = await inquirer.prompt([
            {
                type: 'input',
                name: 'answer',
                message: `Guess a number between 1 and ${this.range} (-1 for hint):`
            }
        ]);
        const num = parseInt(answer);
        if (num === -1) {
            const hint = this.getHint();
            console.log(`Hint: The secret number is ${hint}.`);
            this.answerPoints /= 2;
            //   this.decreasePoints();
            await this.promptUser();
        }
        else if (num === this.secretNumber) {
            console.log(`Congratulations! You guessed the correct number. You earned ${this.answerPoints} points.`);
            this.increasePoints();
            this.level++;
            this.answerPoints = this.level * 10;
            this.setRange();
            this.generateSecretNumber();
            await this.promptUser();
        }
        else {
            console.log(`Game Over! Wrong guess. Your final score is ${this.points}.`);
        }
    }
    async start() {
        console.log('Welcome to the Number Guessing Game!');
        console.log(`Level ${this.level}: Guess a number between 1 and ${this.range}.`);
        await this.promptUser();
    }
}
const game = new NumberGame();
game.start();
