// In this problem, we are given an array of integers and a sliding window size k. We need to find the maximum value in each sliding window as it moves from left to right across the array.

// To solve this problem efficiently, we can use a deque (double-ended queue) to keep track of the indices of the elements in the current sliding window. The deque will help us maintain the maximum value in the window in O(1) time complexity for each operation.

// https://leetcode.com/problems/sliding-window-maximum/

var maxSlidingWindow = function (nums, k) {
  let dq = [];
  let res = [];

  for (let i = 0; i < k; i++) {
    while (dq.length > 0 && nums[dq[dq.length - 1]] <= nums[i]) {
      dq.pop();
    }

    dq.push(i);
  }

  for (let i = k; i <= nums.length - 1; i++) {
    res.push(nums[dq[0]]);

    while (dq.length > 0 && dq[0] <= i - k) {
      dq.shift();
    }

    while (dq.length > 0 && nums[dq[dq.length - 1]] <= nums[i]) {
      dq.pop();
    }

    dq.push(i);
  }

  res.push(nums[dq[0]]);

  return res;
};

let nums = [1, 3, -1, -3, 5, 3, 6, 7];
let k = 5;

console.log(maxSlidingWindow(nums, k));
