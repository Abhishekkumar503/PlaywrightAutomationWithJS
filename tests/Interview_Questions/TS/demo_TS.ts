// TypeScript code

// Variable declaration with type annotations
let message1 : string = "Hello this is tree.";
console.log(message1);

message1 = "Hello this is tree. This is a new message.";
console.log(message1);

let age1 : number = 25;
console.log(age1);

let isActive : boolean = true;
console.log(isActive);

let numberArray : number[] = [1,2,3,4,5];
console.log(numberArray);

let anyValue : any = "Hello this is tree.";
console.log(anyValue);
anyValue = 2;
console.log(anyValue);


// To execute this TypeScript code, you can use the following command in your terminal:
// tsc demo_TS.ts && node demo_TS.js

// Function declaration with type annotations
function add (a: number, b: number): number {
    return a + b;
}

console.log(add(5, 10));

// Object type declaration ( Declare the type of the object)
let user : {name : string, age : number} = {name : "John", age : 30};
console.log(user);

// in above code you cannot add any other new property to the user object because it is strictly typed. If you try to add a new property, TypeScript will throw an error. For example, if you try to do the following:
// user.address = "123 Main St"; // This will throw an error because 'address' is not defined in the type of 'user'.

// To allow additional properties, you can use an index signature:
let flexibleUser : {name : string, age : number, [key: string]: any} = {name : "Jane", age : 25};
flexibleUser.address = "456 Elm St"; // This is allowed now
console.log(flexibleUser);

