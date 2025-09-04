// Objects.

// Objects are the variables for other variables.
// Objects are key value pares.
// Objects are nonpremetive.
// You can access object properties in two ways:
//      objectName.propertyName
//      objectName["propertyName"]
// Here this is access the object property using dot notation.

//Create a new JavaScript object using new Object():

// Create an Object
const person0 = new Object({
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
});


const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
  relatives: () => {
    console.log(this.firstName + " " + this.lastName);
    
    return "this is function in objects";
  },
};

console.log(typeof person.age);

for (key in person) {
  if (key == "age") {
    console.log(person[key]);
  }
}

`
In JavaScript, Objects are King.
If you Understand Objects, you Understand JavaScript.
In JavaScript, almost "everything" is an object.

Objects are objects
Maths are objects
Functions are objects
Dates are objects
Arrays are objects
Maps are objects
Sets are objects
All JavaScript values, except primitives, are objects.
`
