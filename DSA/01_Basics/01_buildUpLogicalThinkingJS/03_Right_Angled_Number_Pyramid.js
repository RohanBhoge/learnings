// Right-Angled Number Pyramid

for (let i = 0; i < 5; i++) {
  let row = "";
  for (let j = 0; j < i + 1; j++) {
    row += (j + 1);
  }
  console.log(row);
}
