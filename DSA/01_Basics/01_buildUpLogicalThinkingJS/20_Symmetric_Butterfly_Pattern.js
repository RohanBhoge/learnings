function Symmetric_Butterfly_Pattern(n) {
  for (let i = 0; i < n - 1; i++) {
    let row = "";
    for (let j = 0; j < i + 1; j++) {
      row += "*";
    }
    for (let k = 0; k < (2 * n - 2 * i) - 2; k++) {
      row += " ";
    }
    for (let l = 0; l < i + 1; l++) {
      row += "*";
    }
    console.log(row);
  }
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n - i; j++) {
      row += "*";
    }
    for (let k = 0; k < 2 * i; k++) {
      row += " ";
    }
    for (let l = 0; l < n - i; l++) {
      row += "*";
    }
    console.log(row);
  }
}

Symmetric_Butterfly_Pattern(5);
