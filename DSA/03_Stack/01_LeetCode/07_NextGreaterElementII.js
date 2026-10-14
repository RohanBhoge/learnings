// In this problem, we have implimented monotonic stack to find the next greater element in a circular array. The idea is to traverse the array twice and use a stack to keep track of the indices of the elements. For each element, we pop elements from the stack until we find a greater element or the stack is empty. If the stack is empty, it means there is no greater element, so we assign -1. Otherwise, we assign the value of the next greater element from the stack.

// The problem given circular array, so we use the modulo operator to wrap around the indices when traversing the array twice. The time complexity of this solution is O(n) and the space complexity is O(n) as well, where n is the length of the input array.

// https://leetcode.com/problems/next-greater-element-ii/

var nextGreaterElements = function (nums) {
  let ans = [];
  let stack = [];

  for (let i = 2 * nums.length - 1; i >= 0; i--) {
    while (
      stack.length > 0 &&
      nums[stack[stack.length - 1]] <= nums[i % nums.length]
    ) {
      stack.pop();
    }

    ans[i % nums.length] =
      stack.length <= 0 ? -1 : nums[stack[stack.length - 1]];

    stack.push(i % nums.length);
  }

  return ans;
};
