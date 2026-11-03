// This problem is uses stack data structure to check if the given string of parentheses is valid or not. The idea is to push the opening parentheses onto the stack and pop them when we encounter a closing parentheses. If the stack is empty at the end, then the string is valid.
// leetcode: https://leetcode.com/problems/valid-parentheses/
// Time Complexity: O(n)
// Space Complexity: O(n)

var isValid = function (s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "[" || s[i] === "{") {
      stack.push(s[i]);
    } else {
      if (stack.length == 0) return false;

      if (
        (s[i] === ")" && stack[stack.length - 1] === "(") ||
        (s[i] === "]" && stack[stack.length - 1] === "[") ||
        (s[i] === "}" && stack[stack.length - 1] === "{")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length == 0;
};
