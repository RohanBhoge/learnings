/**
 * Node class representing each element in the Singly Linked List.
 */

// - To find the middle node of a linked list, we can use the two-pointer technique. We maintain two pointers, slow and fast. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. When the fast pointer reaches the end of the list, the slow pointer will be at the middle node. If there are two middle nodes, we return the second one.

// Link: https://leetcode.com/problems/middle-of-the-linked-list/

class Node {
  constructor(value) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let slow = head;
  let fast = slow;

  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};
