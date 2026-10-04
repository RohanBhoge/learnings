function Alpha_Triangle_Pattern(n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < i + 1; j++) {
      row += String.fromCharCode(65 + (n - i) + j - 1) + " ";
    }
    console.log(row);
  }
}

Alpha_Triangle_Pattern(5);
