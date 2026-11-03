// This is leetcode problem of copying a linked list with random pointer. The idea is to create a new node for each node in the original list and insert it between the original node and its next node. Then we will set the random pointer of the new node to point to the new node corresponding to the original node's random pointer. Finally, we will separate the original list and the new list.
// leetcode: https://leetcode.com/problems/copy-list-with-random-pointer/
// Time Complexity: O(n)
// Space Complexity: O(1)

var copyRandomList = function (head) {
  if (!head) return null;

  let curr = head;
  while (curr !== null) {
    let copy = new _Node(curr.val, curr.next, null);
    curr.next = copy;
    curr = copy.next;
  }

  curr = head;
  while (curr !== null) {
    if (curr.random !== null) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }

  curr = head;
  let dummyHead = new _Node(0);
  let newList = dummyHead;

  while (curr !== null) {
    let copyNode = curr.next;

    newList.next = copyNode;
    newList = copyNode;

    curr.next = copyNode.next;

    curr = copyNode.next;
  }

  return dummyHead.next;
};



// we can also solve this problem using a hash map to store the mapping of original nodes to their corresponding new nodes. This approach has a time complexity of O(n) and a space complexity of O(n).d