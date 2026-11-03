// - To detect if a linked list has a cycle, we can use the Floyd's Cycle Detection Algorithm (also known as the Tortoise and Hare algorithm). We maintain two pointers, slow and fast. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. If there is a cycle in the linked list, the fast pointer will eventually meet the slow pointer. If the fast pointer reaches the end of the list (null), then there is no cycle.

// Link: https://leetcode.com/problems/linked-list-cycle/

var hasCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow >= fast) {
      return true;
    }
  }

  return false;
};
