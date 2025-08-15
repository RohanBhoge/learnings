// Objects.

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
  relatives: () => {
    return "this is function in objects";
  },
};

console.log(typeof person.age);

for (key in person) {
  if (key == "age") {
    console.log(person[key]);
  }
}