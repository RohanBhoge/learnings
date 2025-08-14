// Objects.

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
  relatives: {
    Mother: "Swati",
    Father: "Ganesh",
    Son: "Ram",
  },
};

for (key in person) {
  if (key == "relatives") {
    for (relative in person[key]) {
      console.log(relative, person[key][relative]);
    }
    break;
  } else {
    // console.log(key, person[key]);
  }
}

// console.log(person);
