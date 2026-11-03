// - To merge two sorted linked lists, we can use a recursive approach. We compare the values of the current nodes of both lists and choose the smaller value to be the next node in the merged list. We then recursively call the function for the next node of the chosen list and the other list until we reach the end of one of the lists. Finally, we return the head of the merged list.

// Link: https://leetcode.com/problems/merge-two-sorted-lists/

var mergeTwoLists = function (list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
