import chalk from "chalk";

interface Iterator<T> {
  hasMore(): boolean;
  getNext(): T | null;
}

interface Node<T> {
  data: string;
  next: T | null;
  back: T | null;
}

interface IterableCollection<T> {
  getHead(): T | null;
  getTail(): T | null;
  createIterator(): Iterator<T>;
}

class LinkedListNode implements Node<LinkedListNode> {
  data: string;
  next: LinkedListNode | null;
  back: LinkedListNode | null;

  constructor(val: string) {
    this.data = val;
    this.next = null;
    this.back = null;
  }
  setNext(next: LinkedListNode) {
    this.next = next;
    next.back = this;
  }
}

class ForwardLinkedListIterator<T extends Node<T>> implements Iterator<T> {
  collection: IterableCollection<T>;
  iterativeState: T | null;
  constructor(c: IterableCollection<T>) {
    this.collection = c;
    this.iterativeState = c.getHead();
  }
  getNext(): T | null {
    const curNode = this.iterativeState;
    if (this.iterativeState) {
      this.iterativeState = this.iterativeState.next;
    }
    return curNode;
  }
  hasMore(): boolean {
    return this.iterativeState !== null;
  }
}

class BackwardLinkedListIterator<T extends Node<T>> implements Iterator<T> {
  collection: IterableCollection<T>;
  // Right here the collection is not getting used that much, but in Array, Tree, Graph, etc.
  // you will use them, along with iterationState. Like the current state in the iteration process!
  iterativeState: T | null;
  constructor(c: IterableCollection<T>) {
    this.collection = c;
    this.iterativeState = c.getTail();
  }
  getNext(): T | null {
    // First gives current, then changes the state to next Node.
    const curNode = this.iterativeState;
    if (this.iterativeState) {
      this.iterativeState = this.iterativeState.back;
    }
    return curNode;
  }
  hasMore(): boolean {
    return this.iterativeState !== null;
  }
}

class LinkedList implements IterableCollection<LinkedListNode> {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insertNewNode(data: string) {
    const newNode = new LinkedListNode(data);
    if (!this.tail) {
      this.tail = newNode;
      this.head = newNode;
      return;
    }
    this.tail.setNext(newNode);
    this.tail = newNode;
  }
  getHead(): LinkedListNode | null {
    return this.head;
  }
  getTail(): LinkedListNode | null {
    return this.tail;
  }
  createIterator(): Iterator<LinkedListNode> {
    return new ForwardLinkedListIterator(this);
  }
  createBackwardIterator(): Iterator<LinkedListNode> {
    return new BackwardLinkedListIterator(this);
  }
}

function clientLogic() {
  // First lets create a LinkedList
  const linkedList = new LinkedList();
  const someObjects = [
    "Ice Cream",
    "Moon",
    "Sun",
    "Swimming Pool",
    "Lion",
    "Deer",
    "Tiger",
    "Car",
    "Bike",
  ];
  for (const element of someObjects) {
    linkedList.insertNewNode(element);
  }
  // Create Iterators
  const fIter = linkedList.createIterator();
  const bIter = linkedList.createBackwardIterator();
  console.log(chalk.blue("Forward: "));
  while (fIter.hasMore()) {
    console.log(chalk.red(`The Node has Value: ${fIter.getNext()?.data}`));
  }
  console.log(chalk.blue("Backward: "));
  while (bIter.hasMore()) {
    console.log(chalk.red(`The Node has Value: ${bIter.getNext()?.data}`));
  }
}

function main() {
  console.log(chalk.yellow("Iterator:"));
  clientLogic();
}

export { main };
