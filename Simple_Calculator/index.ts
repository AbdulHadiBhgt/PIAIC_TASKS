import inquirer from "inquirer";


const answer = await inquirer.prompt([
  { message: "Enter 1st No :", type: "number", name: "firstNo" },
  { message: "Enter 2nd No :", type: "number", name: "secNo" },
  { message: "Select Operator:", type: "list", name: "operator", choices: ["+", "-", "*" , "/"] },
]);

//console.log(answer);

let sum = eval(answer.firstNo + answer.operator + answer.secNo);
console.log("Your answer is : ", sum);
