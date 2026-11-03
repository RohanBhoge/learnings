let count = 0;
for (let i = 0; i < 5; i++) {
  let row = "";
  for (let j = 0; j < i + 1; j++) {
    count += 1;
    row += count + " ";
  }
  console.log(row);
}
