function The_Number_Pattern(n) {
  for (let i = 0; i < n * 2 - 1; i++) {
    let row = "";
    for (let j = 0; j < n * 2 - 1; j++) {
      let top = i;
      let bottom = j;
      let right = (2 * n - 2) - j;
      let left = (2 * n - 2) - i;
      row += (n - Math.min(Math.min(top, bottom), Math.min(left, right))) + " ";
    }
    console.log(row);
  }
}

The_Number_Pattern(5);
