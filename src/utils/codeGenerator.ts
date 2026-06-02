import { StructureType, StackItem, TreeState, ListState } from '../types/structures';

export const generateCode = (
  structure: StructureType,
  language: string,
  data: StackItem[],
  treeData: TreeState | null,
  listData: ListState | null
): string => {
  const vals = data.map(d => d.value);

  const getTreeVals = (node: TreeState | null): (string | number)[] => {
    if (!node) return [];
    return [node.value, ...getTreeVals(node.left || null), ...getTreeVals(node.right || null)];
  };

  const getListVals = (node: ListState | null): (string | number)[] => {
    if (!node) return [];
    const res: (string | number)[] = [];
    let curr: ListState | null = node;
    const visited = new Set();
    while (curr && !visited.has(curr.id)) {
      res.push(curr.value);
      visited.add(curr.id);
      curr = curr.next || null;
    }
    return res;
  };

  const currentVals = structure.includes('TREE') || structure === 'HEAP' || structure === 'TRIE'
    ? getTreeVals(treeData)
    : (structure.includes('LINKED_LIST') ? getListVals(listData) : vals);

  switch (language.toLowerCase()) {
    case 'python':
      return generatePython(structure, currentVals);
    case 'javascript':
      return generateJS(structure, currentVals);
    case 'java':
      return generateJava(structure, currentVals);
    case 'cpp':
      return generateCPP(structure, currentVals);
    default:
      return '';
  }
};

const generatePython = (structure: string, vals: (string | number)[]) => {
  const className = structure.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join('');
  let code = `class ${className}:\n    def __init__(self):\n`;
  if (structure.includes('STACK')) {
    code += `        self.items = [${vals.join(', ')}]\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        return self.items.pop() if self.items else None`;
  } else if (structure.includes('QUEUE')) {
    code += `        self.items = [${vals.join(', ')}]\n\n    def enqueue(self, item):\n        self.items.append(item)\n\n    def dequeue(self):\n        return self.items.pop(0) if self.items else None`;
  } else if (structure.includes('LINKED_LIST')) {
    code += `        self.head = None\n        # Current state: [${vals.join(' -> ')}]\n\n    def insert(self, val):\n        new_node = Node(val)\n        new_node.next = self.head\n        self.head = new_node`;
  } else if (structure.includes('TREE') || structure === 'HEAP') {
    code += `        self.root = None\n        # Values: ${JSON.stringify(vals)}\n\n    def insert(self, val):\n        if not self.root:\n            self.root = Node(val)\n            return\n        # Logic for ${structure} insertion`;
  } else {
    code += `        self.data = [${vals.join(', ')}]`;
  }
  return code;
};

const generateJS = (structure: string, vals: (string | number)[]) => {
    const className = structure.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join('');
    let code = `class ${className} {\n    constructor() {\n`;
    if (structure.includes('STACK')) {
      code += `        this.items = [${vals.join(', ')}];\n    }\n\n    push(item) {\n        this.items.push(item);\n    }\n\n    pop() {\n        return this.items.pop();\n    }\n}`;
    } else if (structure.includes('QUEUE')) {
      code += `        this.items = [${vals.join(', ')}];\n    }\n\n    enqueue(item) {\n        this.items.push(item);\n    }\n\n    dequeue() {\n        return this.items.shift();\n    }\n}`;
    } else if (structure.includes('LINKED_LIST')) {
      code += `        this.head = null;\n        // Current state: ${vals.join(' -> ')}\n    }\n\n    insert(val) {\n        const newNode = { value: val, next: this.head };\n        this.head = newNode;\n    }\n}`;
    } else {
      code += `        this.data = [${vals.join(', ')}];\n    }\n}`;
    }
    return code;
};

const generateJava = (structure: string, vals: (string | number)[]) => {
    const className = structure.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join('');
    let code = `import java.util.*;\n\npublic class ${className} {\n    private List<Object> items;\n\n    public ${className}() {\n        this.items = new ArrayList<>(Arrays.asList(${vals.join(', ')}));\n    }\n`;
    if (structure.includes('STACK')) {
        code += `\n    public void push(Object item) {\n        items.add(item);\n    }\n\n    public Object pop() {\n        if (items.isEmpty()) return null;\n        return items.remove(items.size() - 1);\n    }\n}`;
    } else if (structure.includes('QUEUE')) {
        code += `\n    public void enqueue(Object item) {\n        items.add(item);\n    }\n\n    public Object dequeue() {\n        if (items.isEmpty()) return null;\n        return items.remove(0);\n    }\n}`;
    } else {
        code += `\n    // Implementation for ${structure}\n    // Current values: ${vals.join(', ')}\n}`;
    }
    return code;
};

const generateCPP = (structure: string, vals: (string | number)[]) => {
    const className = structure.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join('');
    let code = `#include <vector>\n#include <iostream>\n\nclass ${className} {\nprivate:\n    std::vector<int> items;\n\npublic:\n    ${className}() : items({${vals.join(', ')}}) {}\n`;
    if (structure.includes('STACK')) {
        code += `\n    void push(int item) {\n        items.push_back(item);\n    }\n\n    int pop() {\n        if (items.empty()) return -1;\n        int res = items.back();\n        items.pop_back();\n        return res;\n    }\n};`;
    } else if (structure.includes('QUEUE')) {
        code += `\n    void enqueue(int item) {\n        items.push_back(item);\n    }\n\n    int dequeue() {\n        if (items.empty()) return -1;\n        int res = items.front();\n        items.erase(items.begin());\n        return res;\n    }\n};`;
    } else {
        code += `\n    // Implementation for ${structure}\n    // Current values: ${vals.join(', ')}\n};`;
    }
    return code;
};
