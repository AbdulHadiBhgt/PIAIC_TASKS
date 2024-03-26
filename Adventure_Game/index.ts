import inquirer from "inquirer";

// Enemy types and their attributes
const enemies = [
  { type: "Goblin", minHealth: 20, maxHealth: 40 },
  { type: "Skeleton", minHealth: 30, maxHealth: 50 },
  { type: "Orc", minHealth: 40, maxHealth: 60 },
  { type: "Dragon", minHealth: 50, maxHealth: 80 },
];

// Player attributes
let playerHealth = 100;
let currentEnemyHealth = 0;
let potionCount = 3;

// Function to generate a random number within a range
function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to simulate attacking an enemy
function attackEnemy(enemy: any): void {
  const damage = getRandom(5, 15);
  const dealtDamage = getRandom(5, 25);
  console.log(`You attacked the ${enemy.type} and dealt ${damage} damage.`);
  console.log(
    `The ${enemy.type} attacked you back and dealt ${dealtDamage} damage.`
  );

//   console.log(currentEnemyHealth, damage);

  playerHealth -= dealtDamage;
  currentEnemyHealth -= damage;

  if (playerHealth < 0) playerHealth = 0;
  if (currentEnemyHealth < 0) currentEnemyHealth = 0;

  console.log(
    `Your health: ${playerHealth} \n Enemy health: ${currentEnemyHealth}`
  );
}

// Function to simulate drinking a potion
function drinkPotion(): void {
  if (potionCount > 0) {
    const potionAmount = getRandom(20, 40);
    playerHealth += potionAmount;
    potionCount--;
    console.log(`You drank a potion and restored ${potionAmount} health.`);
    console.log(`Your health: ${playerHealth}`);
    console.log(`Potion count: ${potionCount}`);
  } else {
    console.log("You have no potions left.");
  }
}

// Function to simulate running from an enemy
function run(): void {
  console.log("You ran away from the enemy.");
  playerHealth = -1;
}

// Function to start the game
async function startGame(): Promise<void> {
  console.log("Welcome to the Dungeon Adventure Game!");
  while (playerHealth > 0) {
    const enemy = enemies[getRandom(0, enemies.length - 1)];
    console.log(`\nA ${enemy.type} appears!`);
    currentEnemyHealth = getRandom(enemy.minHealth, enemy.maxHealth);
    while (playerHealth != 0 && currentEnemyHealth != 0) {
        // console.log(playerHealth != 0 && currentEnemyHealth != 0, playerHealth, currentEnemyHealth);
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Choose your action:",
          choices: ["Attack", "Drink Potion", "Run"],
        },
      ]);

      switch (action) {
        case "Attack":
          attackEnemy(enemy);
          break;
        case "Drink Potion":
          drinkPotion();
          break;
        case "Run":
            run();
          break;
      }
    }

    // if(playerHealth == -1) {
    //     break;
    // }

    if (playerHealth == 0) {
      console.log("Game Over! Your health reached zero.");
      break;
    }

    const { continueGame } = await inquirer.prompt([
      {
        type: "confirm",
        name: "continueGame",
        message: "Do you want to continue playing?",
      },
    ]);

    if (!continueGame) {
      console.log("Thanks for playing! Exiting...");
      break;
    }
  }
}

// Start the game
startGame().catch((err) => console.error(err));
