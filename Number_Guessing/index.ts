import inquirer from "inquirer";

class NumberGame {
  private level: number;
  private range: number;
  private secretNumber: number;
  private points: number;
  private answerPoints: number;

  constructor() {
    this.secretNumber = this.range = -1;
    this.level = 1;
    this.points = 0;
    this.answerPoints = 10;
    this.setRange();
    this.generateSecretNumber();
  }

  private setRange(): void {
    this.range = Math.pow(10, this.level);
  }

  private generateSecretNumber(): void {
    this.secretNumber = Math.floor(Math.random() * this.range) + 1;
  }

  private getHint(): string {
    return this.secretNumber % 2 === 0 ? 'even' : 'odd';
  }

//   private decreasePoints(): void {
//     this.points = Math.ceil(this.points / 2);
//   }

  private increasePoints(): void {
    this.points += this.answerPoints;
  }

  private async promptUser(): Promise<void> {
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
    } else if (num === this.secretNumber) {
      console.log(`Congratulations! You guessed the correct number. You earned ${this.answerPoints} points.`);
      this.increasePoints();
      this.level++;
      this.answerPoints = this.level * 10;
      this.setRange();
      this.generateSecretNumber();
      await this.promptUser();
    } else {
      console.log(`Game Over! Wrong guess. Your final score is ${this.points}.`);
    }
  }

  public async start(): Promise<void> {
    console.log('Welcome to the Number Guessing Game!');
    console.log(`Level ${this.level}: Guess a number between 1 and ${this.range}.`);
    await this.promptUser();
  }
}

const game = new NumberGame();
game.start();
