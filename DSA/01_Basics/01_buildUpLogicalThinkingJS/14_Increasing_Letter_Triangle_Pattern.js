for (let i = 0; i < 5; i++) {
  let row = "";
  for (let j = 0; j < i + 1; j++) {
    row += String.fromCharCode(j + 65) + " ";
  }
  console.log(row);
}
