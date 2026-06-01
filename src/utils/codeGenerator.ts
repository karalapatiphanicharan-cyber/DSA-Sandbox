import { StructureType, TreeState, ListState, StackItem } from '../types/structures';

export const generateCode = (
  type: StructureType,
  lang: string,
  data: StackItem[],
  treeData: TreeState | null,
  listData: ListState | null
) => {
  switch (lang) {
    case 'Python': return generatePython(type, data, treeData, listData);
    case 'Java': return generateJava(type, data);
    case 'JavaScript': return generateJS(type, data);
    case 'C++': return generateCpp(type, data);
    default: return generatePython(type, data, treeData, listData);
  }
};

const generatePython = (type: StructureType, data: StackItem[], treeData: TreeState | null, listData: ListState | null) => {
  if (type === 'STACK') {
    return `class Stack:
    def __init__(self):
        self.items = [${data.map(d => d.value).join(', ')}]

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop() if not self.is_empty() else None

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0`;
  }

  if (type === 'QUEUE' || type === 'CIRCULAR_QUEUE') {
    return `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque([${data.map(d => d.value).join(', ')}])

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        return self.items.popleft() if not self.is_empty() else None`;
  }

  if (type.includes('LINKED_LIST')) {
      return `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    # Current State contains ${countListNodes(listData)} nodes`;
  }

  if (type.includes('TREE')) {
      return `# Binary Tree State
# Current Root: ${treeData?.value || 'None'}
# Total Nodes: ${countTreeNodes(treeData)}

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None`;
  }

  return `# Implementation for ${type} in Python\n# Current size: ${data.length || 0}`;
};

const generateJava = (type: StructureType, data: StackItem[]) => {
  if (type === 'STACK') {
    return `import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        ${data.map(d => `stack.push(${d.value});`).join('\n        ')}
    }
}`;
  }
  return `public class ${type.charAt(0) + type.slice(1).toLowerCase().replace('_', '')} {
    public static void main(String[] args) {
        System.out.println("DSA Sandbox: ${type} Implementation");
    }
}`;
};

const generateJS = (type: StructureType, data: StackItem[]) => {
  if (type === 'STACK') {
    return `class Stack {
  constructor() {
    this.items = [${data.map(d => d.value).join(', ')}];
  }
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
}`;
  }
  return `class ${type.charAt(0) + type.slice(1).toLowerCase().replace('_', '')} {
    constructor() {
        this.items = [];
    }
}`;
};

const generateCpp = (type: StructureType, data: StackItem[]) => {
  if (type === 'STACK') {
      return `#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;
    ${data.map(d => `s.push(${d.value});`).join('\n    ')}
    return 0;
}`;
  }
  return `#include <iostream>
#include <vector>

using namespace std;

int main() {
    cout << "DSA Sandbox: ${type}" << endl;
    return 0;
}`;
};

const countTreeNodes = (root: TreeState | null): number => {
    if (!root) return 0;
    return 1 + countTreeNodes(root.left || null) + countTreeNodes(root.right || null);
};

const countListNodes = (head: ListState | null): number => {
    let count = 0;
    let curr = head;
    while (curr) {
        count++;
        curr = curr.next;
    }
    return count;
};
