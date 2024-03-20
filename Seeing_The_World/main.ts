const places = ["Makkah", "Medina", "Great Wall of China", "Baku", "Austria"];

console.log(places);

var newarray = places.slice(0,places.length);
newarray.sort();

console.log(places, newarray);

newarray.sort((a,b) => (a > b ? -1 : 1))

console.log(newarray, places);

console.log(places.reverse());

console.log(places.reverse());

console.log(places.sort());

console.log(places.sort((a,b) => (a > b ? -1 : 1)));


