// - To detect a cycle in a linked list and find the starting node of the cycle, we can use Floyd's Cycle Detection Algorithm (also known as the Tortoise and Hare algorithm). We use two pointers, one moving at a slow pace (one step at a time) and the other moving at a fast pace (two steps at a time). If there is a cycle, the two pointers will eventually meet. Once they meet, we can reset one pointer to the head of the list and move both pointers one step at a time until they meet again, which will be the starting node of the cycle.

// Link: https://leetcode.com/problems/linked-list-cycle-ii/

var detectCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow == fast) {
      slow = head;

      while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
      }

      return slow;
    }
  }

  return null;
};
