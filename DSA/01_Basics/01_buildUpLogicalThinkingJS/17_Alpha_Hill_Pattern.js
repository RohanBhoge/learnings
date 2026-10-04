function Alpha_Hill_Pattern(n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n - i; j++) {
      row += "  ";
    }
    for (let k = 0; k < i + 1; k++) {
      row += String.fromCharCode(65 + k) + " ";
    }
    for (let l = 0; l < i; l++) {
      row += String.fromCharCode(65 + i - l - 1) + " ";
    }
    console.log(row);
  }
}

Alpha_Hill_Pattern(5);
