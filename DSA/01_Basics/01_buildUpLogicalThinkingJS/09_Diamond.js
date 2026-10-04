function print_diamond(n) {
  for (let i = 0; i < n - 1; i++) {
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

print_diamond(5);
