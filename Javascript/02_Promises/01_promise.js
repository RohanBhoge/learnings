let promise = new Promise(function (reoslve, reject) {
  // alert("Hello")
  reoslve(56);
  reject(-1);
});

console.log(promise);

const f = async () => {
  console.log(await promise);
};
f();
