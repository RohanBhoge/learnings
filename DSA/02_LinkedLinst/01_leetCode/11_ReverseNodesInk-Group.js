// - In this problem, we are given a linked list and an integer k. We need to reverse the nodes of the linked list k at a time and return its modified list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is. You may not alter the values in the list's nodes, only nodes themselves may be changed.
// - This is LinkedList In-place Reversal pattern problem. The idea is to reverse the first k nodes of the linked list and then recursively call the function for the next k nodes. Finally, we will connect the reversed part with the next part of the linked list.
// Used three pointers to reverse the linked list in place. Prev, Curr, Next.

// leetcode: https://leetcode.com/problems/reverse-nodes-in-k-group/
// Time Complexity: O(n)
// Space Complexity: O(n/k) for recursion stack

var reverseKGroup = function (head, k) {
  let curr = head;
  let cnt = 0;

  while (cnt < k) {
    if (curr == null) return head;
    curr = curr.next;
    cnt++;
  }

  let prevNode = reverseKGroup(curr, k);

  curr = head;
  cnt = 0;

  while (cnt < k) {
    let next = curr.next;
    curr.next = prevNode;
    prevNode = curr;
    curr = next;
    cnt++;
  }

  return prevNode;
};
