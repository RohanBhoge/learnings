// 

let promise = new Promise(function (reoslve, reject) {
  reoslve(56);
  reject(-1);
});

console.log(promise);

const f = async () => {
  console.log(await promise);
};

setTimeout(() => {
  console.log('Timeout'); // 4 (Macrotask)
}, 0);

f().finally(() => {
  console.log("This is finally.");  
}
)

console.log('Start'); // 1


Promise.resolve().then(() => {
  console.log('Promise'); // 3 (Microtask)
});

console.log('End'); // 2
