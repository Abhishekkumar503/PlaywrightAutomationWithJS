const fruits = ["Apple","Banana","Cherry","Date"];

// Access element by index
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana

//Add an element to the end of the array
fruits.push("Elderberry");
console.log(fruits);  // [ 'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry' ]

//Remove the last element from the array
const lastFruit = fruits.pop();
console.log(lastFruit); // Elderberry
console.log(fruits); // [ 'Apple', 'Banana', 'Cherry', 'Date' ]

//Add an element to the beginning of the array
fruits.unshift("Fig");
console.log(fruits); // [ 'Fig', 'Apple', 'Banana', 'Cherry', 'Date' ]

//Remove the first element from the array
const firstFruit = fruits.shift();
console.log(firstFruit); //Fig
console.log(fruits); // [ 'Apple', 'Banana', 'Cherry', 'Date' ]

// Find the index of an element
const index = fruits.indexOf("Cherry");
console.log(index); // 2

// Remove an element by index
const removeFruit = fruits.slice(index,1);
console.log(removeFruit); //[]
console.log(fruits);  // [ 'Apple', 'Banana', 'Cherry', 'Date' ]

//Iterate over the array
fruits.forEach((fruit,index) => {
    console.log('${index} : ${fruit}');
});
/**
 * 0 : Apple
1 : Banana
2 : Date
 */
