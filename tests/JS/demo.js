function fetchData(callback) {
    //Fetch data from server
    setTimeout(() => {
        console.log("Data fetched from server");
        const data = "Sample data";
        callback(data);
    }, 1000);
}

function processData(data) {
    console.log("Processing data:", data);
}

function modifyData(data){
    console.log("Modifying data:", data);
}

fetchData(processData);
fetchData(modifyData);

// JS is Asynchronous, so the fetchData function will return before the data is fetched from the server. The callback functions (processData and modifyData) will be executed after the data is fetched, but the return value of fetchData will be undefined because it returns before the data is available.
// With the help of callbacks, we can ensure that the data is processed or modified only after it has been fetched from the server. This is a common pattern in JavaScript for handling asynchronous operations.

/**
 * O/P
 * abhishekkumar~$node tests/demo
Data fetched from server
Processing data: Sample data
Data fetched from server
Modifying data: Sample data
abhishekkumar~$
 */