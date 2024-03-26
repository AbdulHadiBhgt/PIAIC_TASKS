import inquirer from 'inquirer';

function countdownTimer(seconds: number): void {
  console.log(`Starting countdown for ${seconds} seconds...\n`);
  
  const startTime = Date.now();
  const endTime = startTime + seconds * 1000;

  const interval = setInterval(() => {
    const remainingSeconds = Math.ceil((endTime - Date.now()) / 1000);
    console.clear();
    console.log(`Time remaining: ${remainingSeconds} seconds`);
    if (Date.now() >= endTime) {
      clearInterval(interval);
      console.clear();
      console.log('Time\'s up! Countdown has finished.');
    }
  }, 1000);
}

async function startCountdown(): Promise<void> {
  const { seconds } = await inquirer.prompt([
    {
      type: 'number',
      name: 'seconds',
      message: 'Enter the number of seconds for the countdown:'
    }
  ]);
  
  countdownTimer(seconds);
}

// Start the countdown
startCountdown().catch(err => console.error(err));
