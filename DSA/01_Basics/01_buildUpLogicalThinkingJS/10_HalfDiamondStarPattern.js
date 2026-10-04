function TringularPattern(n) {
  for (let i = 0; i < n - 1; i++) {
    let row = "";
    for (let j = 0; j < i + 1; j++) {
      row += "*";
    }
    console.log(row);
  }
  for (let m = 0; m < n; m++) {
    let row = "";
    for (let l = 0; l < n - m; l++) {
      row += "*";
    }
    console.log(row);
  }
}

TringularPattern(9);
