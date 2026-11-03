function TrangularPattern(n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n - i - 1; j++) {
      row += " ";
    }
    for (let k = 0; k < 2 * i + 1; k++) {
      row += "*";
    }
    for (let l = 0; l < n - i - 1; l++) {
      row += " ";
    }
    console.log(row);
  }
}

TrangularPattern(10);
