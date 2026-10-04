// ==========================================
// Singly Linked List Implementation in JavaScript
// ==========================================

/**
 * Node class representing each element in the Singly Linked List.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Pointer to the next node
  }
}

/**
 * SinglyLinkedList class containing all operations.
 */
class SinglyLinkedList {
  constructor() {
    this.head = null; // Points to the first node
    this.tail = null; // Points to the last node
    this.length = 0; // Keeps track of list length
  }

  /**
   * 1. push_start(value)
   * Inserts a new node with given value at the beginning (head) of the list.
   * Time Complexity: O(1)
   * @param {*} value - Value to insert
   */
  push_start(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  /**
   * 2. push_end(value)
   * Inserts a new node with given value at the end (tail) of the list.
   * Time Complexity: O(1)
   * @param {*} value - Value to insert
   */
  push_end(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  /**
   * 3. push_middle(value, index)
   * Inserts a new node at a specific index in the list.
   * Time Complexity: O(N)
   * @param {*} value - Value to insert
   * @param {number} index - 0-based position to insert at
   */
  push_middle(value, index) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.push_start(value);
    if (index === this.length) return !!this.push_end(value);

    const newNode = new Node(value);
    let prev = this.getAt(index - 1);
    newNode.next = prev.next;
    prev.next = newNode;
    this.length++;
    return true;
  }

  /**
   * 4. pop_start()
   * Removes and returns the node from the beginning (head) of the list.
   * Time Complexity: O(1)
   */
  pop_start() {
    if (!this.head) return undefined;
    const removedNode = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    removedNode.next = null;
    return removedNode.value;
  }

  /**
   * 5. pop_end()
   * Removes and returns the node from the end (tail) of the list.
   * Time Complexity: O(N)
   */
  pop_end() {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current.value;
  }

  /**
   * 6. pop_middle(index)
   * Removes and returns the node at a specific index.
   * Time Complexity: O(N)
   * @param {number} index - 0-based position of the node to remove
   */
  pop_middle(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.pop_start();
    if (index === this.length - 1) return this.pop_end();

    let prev = this.getAt(index - 1);
    let removedNode = prev.next;
    prev.next = removedNode.next;
    this.length--;
    removedNode.next = null;
    return removedNode.value;
  }

  /**
   * 7. getAt(index)
   * Helper function to get the node object at a specific index.
   * Time Complexity: O(N)
   * @param {number} index - 0-based index
   */
  getAt(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  /**
   * 8. search(value)
   * Searches for a value in the list and returns its index, or -1 if not found.
   * Time Complexity: O(N)
   * @param {*} value - Value to search for
   */
  search(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  /**
   * 9. reverse()
   * Reverses the linked list in place.
   * Time Complexity: O(N)
   */
  reverse() {
    let prev = null;
    let current = this.head;
    let nextNode = null;

    // Swap head and tail pointers
    this.tail = this.head;

    while (current) {
      nextNode = current.next; // Store next node
      current.next = prev; // Reverse pointer
      prev = current; // Advance prev
      current = nextNode; // Advance current
    }

    this.head = prev;
    return this;
  }

  /**
   * 10. print()
   * Displays the current elements of the linked list.
   * Time Complexity: O(N)
   */
  print() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(`List (${this.length} items):`, values.join(" -> ") || "Empty");
  }

  /**
   * 11. size()
   * Returns the current total count of nodes.
   * Time Complexity: O(1)
   */
  size() {
    return this.length;
  }

  /**
   * 12. clear()
   * Empties the linked list.
   * Time Complexity: O(1)
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

// ==========================================
// Demonstration / Execution
// ==========================================
const list = new SinglyLinkedList();

console.log("--- PUSH OPERATIONS ---");
list.push_end(10); // [10]
list.push_end(20); // [10 -> 20]
list.push_start(5); // [5 -> 10 -> 20]
list.push_middle(15, 2); // [5 -> 10 -> 15 -> 20]
list.print();

console.log("\n--- SEARCH & GET OPERATIONS ---");
console.log("Index of 15:", list.search(15));
console.log("Node at index 1 value:", list.getAt(1)?.value);

console.log("\n--- POP OPERATIONS ---");
console.log("Popped start:", list.pop_start()); // removes 5
list.print();

console.log("Popped end:", list.pop_end()); // removes 20
list.print();

console.log("Popped middle (index 1):", list.pop_middle(1)); // removes 15
list.print();

console.log("\n--- REVERSE OPERATION ---");
list.push_end(30);
list.push_end(40);
console.log("Before reverse:");
list.print();

list.reverse();
console.log("After reverse:");
list.print();
console.log("Head node value in the linked list:", head.value);
