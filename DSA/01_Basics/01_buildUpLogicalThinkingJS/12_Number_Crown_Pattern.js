function dsa(n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < 1 + i; j++) {
      row += (j + 1);
    }
    for (let k = 0; k < (n - i) * 2; k++) {
      row += " ";
    }
    for (let l = 0; l < i + 1; l++) {
      row += ((i + 1) - l);
    }
    console.log(row);
  }
}

dsa(5);
