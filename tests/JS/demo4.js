const student = [{name: "Alice", score: 25},
                 {name: "Bob", score: 30},
                 {name: "Charlie", score: 35}];

const passedStudents = student.filter(student => student.score >= 30);
console.log(passedStudents); // [{name: "Bob", score: 30}, {name: "Charlie", score: 35}]

const studentNames = student.map(student => student.name.toUpperCase());
console.log(studentNames); // ["ALICE", "BOB", "CHARLIE"]

// Used for reducing the array to a single value, in this case, the total score of all students ( like SUM )
const totalScore = student.reduce((total, student) => total + student.score, 0);
console.log(totalScore); // 90

const hasPassed = student.some(student => student.score >= 30);
console.log(hasPassed); // true

const allPassed = student.every(student => student.score >= 30);
console.log(allPassed); // false