function fetchData(callback) {
    //Fetch data from server
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Data fetched from server");
        const data = "Sample data";
        resolve(data);
    }, 1000);
});
}


// resolving the promise with the fetched data
fetchData().then(function(data) {
    console.log("Processing data:", data);
}).catch(function(error) {
    console.error("Error fetching data:", error);
});

// Endgoal is to use promises instead of callbacks to handle asynchronous operations. Promises provide a cleaner and more manageable way to handle asynchronous code, allowing for better error handling and chaining of operations. In this example, the fetchData function returns a promise that resolves with the fetched data, and we can use the .then() method to process the data once it is available.
// to handle asynchronous operations in a more readable and maintainable way, we can use promises instead of callbacks. Promises allow us to chain multiple asynchronous operations together and handle errors more effectively. In this example, the fetchData function returns a promise that resolves with the fetched data, and we can use the .then() method to process the data once it is available.


// Another way to handle asynchronous operations is by using async/await syntax, which allows us to write asynchronous code in a more synchronous manner. We can define an async function and use the await keyword to wait for the promise to resolve before proceeding with the next line of code. This can make the code easier to read and understand, especially when dealing with multiple asynchronous operations.
const data = await fetchData();
console.log("Processing data:", data);

// In this example, we define an async function and use the await keyword to wait for the fetchData promise to resolve before logging the processed data. This allows us to write asynchronous code in a more synchronous manner, making it easier to read and understand. However, it's important to note that the await keyword can only be used inside an async function, so we need to wrap our code in an async function to use it.

// All these are in same family of asynchronous programming in JavaScript, and they provide different ways to handle asynchronous operations. Callbacks are the traditional way of handling asynchronous code, but they can lead to callback hell and make the code harder to read and maintain. Promises provide a cleaner and more manageable way to handle asynchronous code, allowing for better error handling and chaining of operations. Async/await syntax allows us to write asynchronous code in a more synchronous manner, making it easier to read and understand. By using these techniques, we can write more efficient and maintainable code that handles asynchronous operations effectively.