var personName = "Abdul Hadi";
console.log(personName.toLowerCase(), personName.toUpperCase());
personName = personName.toLowerCase();
var split = personName.split(' ');
var newName = '';
split.forEach(function (element) {
    var title = element.charAt(0).toUpperCase();
    title += element.substring(1, element.length);
    newName += title + ' ';
});
console.log(personName.toLowerCase(), personName.toUpperCase(), newName);
