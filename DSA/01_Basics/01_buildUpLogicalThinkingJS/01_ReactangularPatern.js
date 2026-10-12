function printRectanglePattern(r, c) {
  if (r <= 0 || c <= 0) {
    console.log("");
    return;
  }

  for (let i = 0; i < r; i++) {
    // Loop for rows
    let row = "";

    for (let j = 0; j < c; j++) {
      // Loop for columns
      row += "* ";
    }

    console.log(row);
  }
}

printRectanglePattern(3, 5);