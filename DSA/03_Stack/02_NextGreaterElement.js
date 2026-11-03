// 1. Brute Force Approach: O(n^2) time complexity and O(1) space complexity

var nextGreaterElementBruteForce = function (nums) {
  let ans = [];

  for (let i = 0; i < nums.length; i++) {
    let found = -1;

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        found = nums[j];

        break;
      }
    }
    ans.push(found);
  }

  console.log(ans);
  return ans;
};

// ===========Test Case=========s==
// Test Case 1
const testCase = {
  case1: [4, 5, 2, 25],
  case2: [13, 7, 6, 12],
  case3: [4, 5],
  case4: [13],
  case5: [],
};

// -----------Calling Function-----------
// for (let i = 1; i <= Object.keys(testCase).length; i++) {
//   nextGreaterElementBruteForce(testCase[`case${i}`]);
// }

// =======================||||||=======================

// 2. Optimized Approach: O(n) time complexity and O(n) space complexity, By Shradha Khapra from lecture no.71. Using Stack.

const nextGreaterElementOptimizedLecture = (nums) => {
  let ans = [];
  let stack = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }

    if (stack.length == 0) {
      ans.push(-1);
    } else {
      ans.push(stack[stack.length - 1]);
    }

    stack.push(nums[i]);
  }

  ans.reverse();
  console.log(ans);
  return ans;
};

// -----------------------Test Cases-----------------------
const testCases = {
  case1: [4, 5, 2, 6, 1, 8, 15, 0, 3, 7, 9, 25],
  case2: [13, 7, 6, 12],
  case3: [4, 5],
  case4: [13],
  case5: [],
};

// -------------------Calling Function-----------------------
for (let i = 1; i <= Object.keys(testCases).length; i++) {
  nextGreaterElementOptimizedLecture(testCases[`case${i}`]);
}

// =======================||||||=======================

//3. Optimized Approach: O(n) time complexity and O(n) space complexity, leetcode solution of: https://leetcode.com/problems/next-greater-element-i/description/

// This is the problem which i have solved using stack and hashmap. The problem is to find the next greater element for each element in nums1 from nums2. The solution uses a stack to keep track of the elements in nums2 and a hashmap to store the next greater element for each element in nums2. Finally, we iterate through nums1 and get the next greater element from the hashmap.
var nextGreaterElement = function (nums1, nums2) {
  let heap = {};
  let stack = [];
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums2[i]) {
      stack.pop();
    }

    if (stack.length == 0) {
      heap[nums2[i]] = -1;
    } else {
      heap[nums2[i]] = stack[stack.length - 1];
    }

    stack.push(nums2[i]);
  }

  let ans = [];
  for (let i = 0; i < nums1.length; i++) {
    ans.push(heap[nums1[i]]);
  }

  return ans;
};
