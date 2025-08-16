// 

let promise = new Promise(function (reoslve, reject) {
  reoslve(56);
  reject(-1);
});

console.log(promise);

const f = async () => {
  console.log(await promise);
};
f();
