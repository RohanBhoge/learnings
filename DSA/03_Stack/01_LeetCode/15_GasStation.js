// In this problem, we are given two arrays, gas and cost, representing the amount of gas at each station and the cost to travel to the next station, respectively. We need to determine if there is a starting gas station from which we can complete a circuit around all the stations. If such a station exists, we return its index; otherwise, we return -1.

// The solution involves calculating the total gas and total cost to determine if a circuit is possible. If the total gas is less than the total cost, it is impossible to complete the circuit, and we return -1. Otherwise, we iterate through the stations, keeping track of the current gas balance. If at any point the current gas balance becomes negative, we reset the starting station to the next station and reset the current gas balance to zero. Finally, we return the index of the starting station if a circuit is possible.

// https://leetcode.com/problems/gas-station/

var canCompleteCircuit = function (gas, cost) {
  let totalGas = 0;
  let totalCost = 0;

  let start = 0;
  let currGas = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];

    currGas += gas[i] - cost[i];

    if (currGas < 0) {
      start = i + 1;
      currGas = 0;
    }
  }

  return totalGas < totalCost ? -1 : start;
};

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
