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