// const user = {
//   id: 42,
//   username: 'alex',
//   is_admin: true,
// };

// // Providing default values
// const { bio = 'No bio available' } = user;
// console.log(bio); // 'No bio available'

const user = {
  name: 'Alex',
  // ❌ Don't do this! 'this' will be the global object.
  greet: () => {
    console.log(`Hello, I am ${this.name}`);
  },
  // ✅ Do this instead.
  sayHi() {
    console.log(`Hi, I am ${this.name}`);
  }
};

user.greet(); // "Hello, I am undefined"
user.sayHi(); // "Hi, I am Alex"