// Import the Person class from person.js
import Person from './person.js';

// Create a Student class that inherits from the Person class
class Student extends Person {
  constructor(name, age, grade) {
    // Call the constructor of the parent class (Person)
    super(name, age);
    this.grade = grade;
  }

  
study() {
  const greeting = super.greet();
  return `${greeting} ${this.name} is studying in grade ${this.grade}.`;
}
}

export default Student;  