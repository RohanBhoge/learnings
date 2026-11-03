function Hollow_Rectangle_Pattern(n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === (n - 1)) {
        row += "* ";
      } else {
        if (j === 0 || j === (n - 1)) {
          row += "* ";
        } else {
          row += "  ";
        }
      }
    }
    console.log(row);
  }
}

Hollow_Rectangle_Pattern(5);
