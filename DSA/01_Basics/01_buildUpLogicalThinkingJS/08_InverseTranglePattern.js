// Online Python compiler (interpreter) to run Python online.
function TringularPattern(n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < i; j++) {
      row += " ";
    }
    for (let k = 0; k < (n - i - 1) * 2 + 1; k++) {
      row += "*";
    }
    for (let l = 0; l < i; l++) {
      row += " ";
    }
    console.log(row);
  }
}

TringularPattern(9);
