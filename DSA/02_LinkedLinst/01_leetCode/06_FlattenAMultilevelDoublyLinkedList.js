// - To flatten a multilevel doubly linked list, we can use a depth-first search (DFS) approach. We traverse the list and whenever we encounter a node with a child, we recursively flatten the child list and connect it to the current node. We also keep track of the tail of the flattened child list to connect it to the next node in the original list. Finally, we return the head of the flattened list.

// Link: https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/

var flatten = function (head) {
  if (!head) return head;

  flattenDFS(head);

  return head;
};

function flattenDFS(node) {
  let curr = node;
  let tail = node;

  while (curr !== null) {
    let next = curr.next;

    if (curr.child !== null) {
      let childTail = flattenDFS(curr.child);

      curr.next = curr.child;
      curr.child.prev = curr;

      if (next !== null) {
        childTail.next = next;
        next.prev = childTail;
      }

      curr.child = null;

      tail = childTail;
    } else {
      tail = curr;
    }

    curr = next;
  }

  return tail;
}
