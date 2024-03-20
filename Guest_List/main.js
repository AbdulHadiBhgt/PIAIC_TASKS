var names = ["Zakir", "Mohsin", "Abdullah"];
names.forEach(function (name) {
    console.log("Hello ".concat(name, " ! You are invited to my 3rd Anniversary Party"));
});
var not_comming = names[1];
console.log("".concat(not_comming, " will not be able to make to the party :("));
var index = names.indexOf(not_comming);
names[index] = "Iftikhar";
names.forEach(function (name) {
    console.log("Hello ".concat(name, " ! You are invited to my 3rd Anniversary Party"));
});
console.log("Hurray !! we have found a bigger table");
var extra_names = ["Fahad", "Murtaza", "Bilal"];
names.splice(0, 0, extra_names[0]);
names.splice(names.length / 2, 0, extra_names[1]);
names.push(extra_names[2]);
names.forEach(function (name) {
    console.log("Hello ".concat(name, " ! You are invited to my 3rd Anniversary Party"));
});
console.log("Sorry Fellas, due to un fortunate events now i can only invite 2 people");
while (names.length > 2) {
    var name_1 = names.pop();
    console.log("Sorry ".concat(name_1, " ! Cant invite you to the dinner"));
}
names.forEach(function (name) {
    console.log("Hello ".concat(name, " ! You are still invited to my 3rd Anniversary Party"));
});
names.pop();
names.pop();
console.log(names, names.length);
