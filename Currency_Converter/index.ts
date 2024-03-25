import inquirer from "inquirer";

const { currency1, amount, currency2 } = await inquirer.prompt([
  {
    type: "list",
    name: "currency1",
    message: "Choose your Currency:",
    choices: ["PKR", "USD", "Dirham", "Riyal", "BTC"],
  },
  {
    type: "number",
    name: "amount",
    message: "Enter Value: ",
  },
  {
    type: "list",
    name: "currency2",
    message: "Choose Currency to convert amount to:",
    choices: ["PKR", "USD", "Dirham", "Riyal", "BTC"],
  },
]);

if(currency1 == currency2) console.log(`No Conversion Needed`);

//Make a list of PKR -> Other Conversion Rate

var dict:any = {
    "USD" : 291.23,
    "Dirham" : 17.26,
    "Riyal" : 35.23,
    "BTC" : 100000000000
}
var rate1 = 1;
var rate2 = 1;
var newAmount = amount;
if (currency1 != "PKR") {
    rate1 = dict[currency1];
    newAmount = amount * rate1;
}
if (currency2 != "PKR") {
    rate2 = dict[currency2];
    newAmount = newAmount / rate2;
}

console.log(`Your Amount in ${currency2} is ${newAmount}`);


