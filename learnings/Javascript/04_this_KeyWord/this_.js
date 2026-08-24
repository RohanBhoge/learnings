// 1. this in Globle

console.log(this); // global object/window object

// 2. this in Function
function myFunction() {
  //The value depends on strict / non strict mode.
  console.log(this); // strict == undefined    non-strict == global object/window object
}
myFunction();

// 3. this in strict mode (this substitution)

// If the value of this keyword is undefined or null this keyword will be replaced with globle object only in non strict mode.

// 4. 'this' keyword value is depend on how the function is called
myFunction();

// 5. 'this' inside object's methods.

const obj = {
  name: "John",
  myMethod: function () {
    console.log(this.name); // In this case, 'this' refers to the object 'obj'
  },
};

obj.myMethod(); // if we call obj.myMethod(), 'this' refers to obj

// 6. call apply bind methods (sharing methods)

const student = {
  name: "Rohan",
  printName: function () {
    console.log(this.name);
  },
};

const student2 = {
  name: "Aisha",
};

student.printName.call(student2); // 'this' refers to student2, so it will print "Aisha"

// 7. this inside arrow functions.

const student0 = {
  name: "Rohan",
  printName: () => {
    console.log(this.name);
  },
};

// 8. 'this' inside nestead arrow functions.

const studentNested = {
  name: "Rohan",
  printName: () => {
    const inner = () => {
      console.log(this.name);
    };
    inner();
  },
};

studentNested.printName(); // 'this' refers to the global object, so it will print undefined or global name if defined

// 9. 'this' inside DOM element

// it refers to the HTML element.
// const button = document.querySelector("button");
// button.addEventListener("click", function () {
//   console.log(this); // 'this' refers to(HTML element) the button element
// });

// 10. 'this' inside class
class Student {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
}

const student1 = new Student("Rohan");
student1.printName(); // 'this' refers to the instance of the class