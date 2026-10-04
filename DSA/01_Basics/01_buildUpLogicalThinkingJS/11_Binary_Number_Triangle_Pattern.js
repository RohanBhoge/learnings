for (let i = 0; i < 5; i++) {
  let count;
  if (i % 2 === 0) {
    count = 1;
  } else {
    count = 0;
  }
  let row = "";
  for (let j = 0; j < i + 1; j++) {
    row += count + " ";
    count = 1 - count;
  }
  console.log(row);
}
