// Everything in js is objects

let obj = {
  name: "John",
  city: "New York",
  greet: function () {
    console.log(
      "Hello, my name is " + this.name + " and I live in " + this.city
    );
  },
};

let obj2 = {
  name: "Rohan",
};

// obj2 does not have a city property, but we can access it through the prototype chain
obj2.__proto__ = obj; // here we can set the prototype of obj2 to obj

console.log(obj2.__proto__.name); // John
console.log(obj2.name); // Rohan
console.log(obj2.city); // New York
