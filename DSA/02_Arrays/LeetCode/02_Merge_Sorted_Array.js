// in this problem, we have implemented a two-pointer approach to merge two sorted arrays. The idea is to start from the end of both arrays and compare the elements. We place the larger element at the end of the first array (nums1) and move the pointers accordingly. This way, we avoid overwriting elements in nums1 that haven't been processed yet.

// The time complexity of this solution is O(m + n), where m and n are the lengths of the two input arrays. The space complexity is O(1) since we are modifying nums1 in place without using any additional data structures.

// https://leetcode.com/problems/merge-sorted-array/

const merge = (nums1, m, nums2, n) => {
  let i = m - 1;
  let j = n - 1;
  let indx = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      nums1[indx] = nums1[i];
      i--;
      indx--;
    } else {
      nums1[indx] = nums2[j];
      j--;
      indx--;
    }
  }

  while (j >= 0) {
    nums1[indx] = nums2[j];
    j--;
    indx--;
  }

  return nums1;
};

console.log(merge([8, 9, 10, 0, 0, 0], 3, [2, 5, 6], 3));