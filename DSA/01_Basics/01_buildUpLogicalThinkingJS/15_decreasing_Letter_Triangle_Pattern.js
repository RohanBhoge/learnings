for (let i = 0; i < 5; i++) {
  let row = "";
  for (let j = 0; j < 5 - i; j++) {
    row += String.fromCharCode(65 + j) + " ";
  }
  console.log(row);
}
