//

const findMissingAndRepeatedValues = (grid) => {
  let n = grid.length;
  let m = grid[0].length;
  let heap = {};

  let gridSum = 0;
  let repeated = -1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (heap[grid[i][j]]) {
        repeated = grid[i][j];
      } else {
        gridSum += grid[i][j];
        heap[grid[i][j]] = [i, j];
      }
    }
  }

  let totalSum = (n * m * (n * m + 1)) / 2;
  let missing = totalSum - gridSum;

  console.log(heap);

  return [repeated, missing];
};

grid = [
  [9, 1, 7],
  [8, 9, 2],
  [3, 4, 6],
];

console.log(findMissingAndRepeatedValues(grid));