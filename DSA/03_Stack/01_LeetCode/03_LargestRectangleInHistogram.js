import { heights } from "./03_data.js";

/**
 * This is the LeetCode Code which i have solved using brute force approach.
 * At the submission time got 'Time Limit Exceeded'.
 *  - Which means the solution is not optimal and needs to be optimized.
 * @param {number[]} heights
 * @return {number}
 */

// Brute Force Approach
var largestRectangleArea = function (heights) {
  let maxArea = 0;

  for (let i = 0; i < heights.length; i++) {
    let length = 1;
    let minHeight = heights[i];

    for (let j = i; j >= 0; j--) {
      minHeight = Math.min(minHeight, heights[j]);

      if (minHeight == 0) break;

      maxArea = Math.max(maxArea, length * minHeight);
      length += 1;
    }
  }

  console.log(maxArea);
  return maxArea;
};

// largestRectangleArea(heights);

// 2. This is the problem of finding the largest rectangle in a histogram. The idea is to use a stack to keep track of the indices of the bars in the histogram. We will calculate the area for each bar as we traverse through the heights array.
// leetcode: https://leetcode.com/problems/largest-rectangle-in-histogram/
// Time Complexity: O(n)

var largestRectangleArea = function (heights) {
  let ans = 0;
  let left = [];
  let right = [];
  let stack = [];

  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    left[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];

  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    right[i] = stack.length === 0 ? heights.length : stack[stack.length - 1];
    stack.push(i);
  }

  for (let i = 0; i < heights.length; i++) {
    let width = right[i] - left[i] - 1;
    let currArea = heights[i] * width;
    ans = Math.max(ans, currArea);
  }

  return ans;
};

console.log(largestRectangleArea(heights));