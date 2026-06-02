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
  let code = `class ${structure.replace(/_/g, '')}:\n    def __init__(self):\n`;
  if (structure.includes('STACK')) {
    code += `        self.items = [${vals.join(', ')}]\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        return self.items.pop()`;
  } else if (structure.includes('QUEUE')) {
    code += `        self.items = [${vals.join(', ')}]\n\n    def enqueue(self, item):\n        self.items.append(item)\n\n    def dequeue(self):\n        return self.items.pop(0)`;
  } else {
    code += `        self.data = [${vals.join(', ')}]\n        # Implementation for ${structure}`;
  }
  return code;
};

const generateJS = (structure: string, vals: (string | number)[]) => {
    let code = `class ${structure.replace(/_/g, '')} {\n    constructor() {\n`;
    if (structure.includes('STACK')) {
      code += `        this.items = [${vals.join(', ')}];\n    }\n\n    push(item) {\n        this.items.push(item);\n    }\n\n    pop() {\n        return this.items.pop();\n    }\n}`;
    } else if (structure.includes('QUEUE')) {
      code += `        this.items = [${vals.join(', ')}];\n    }\n\n    enqueue(item) {\n        this.items.push(item);\n    }\n\n    dequeue() {\n        return this.items.shift();\n    }\n}`;
    } else {
      code += `        this.data = [${vals.join(', ')}];\n    }\n    // Implementation for ${structure}\n}`;
    }
    return code;
};

const generateJava = (structure: string, vals: (string | number)[]) => {
    let code = `import java.util.*;\n\npublic class ${structure.replace(/_/g, '')} {\n    private List<Object> items;\n\n    public ${structure.replace(/_/g, '')}() {\n        this.items = new ArrayList<>(Arrays.asList(${vals.join(', ')}));\n    }\n`;
    if (structure.includes('STACK')) {
        code += `\n    public void push(Object item) {\n        items.add(item);\n    }\n\n    public Object pop() {\n        return items.remove(items.size() - 1);\n    }\n}`;
    } else if (structure.includes('QUEUE')) {
        code += `\n    public void enqueue(Object item) {\n        items.add(item);\n    }\n\n    public Object dequeue() {\n        return items.remove(0);\n    }\n}`;
    } else {
        code += `\n    // Implementation for ${structure}\n}`;
    }
    return code;
};

const generateCPP = (structure: string, vals: (string | number)[]) => {
    let code = `#include <vector>\n#include <iostream>\n\nclass ${structure.replace(/_/g, '')} {\nprivate:\n    std::vector<int> items;\n\npublic:\n    ${structure.replace(/_/g, '')}() : items({${vals.join(', ')}}) {}\n`;
    if (structure.includes('STACK')) {
        code += `\n    void push(int item) {\n        items.push_back(item);\n    }\n\n    int pop() {\n        int res = items.back();\n        items.pop_back();\n        return res;\n    }\n};`;
    } else if (structure.includes('QUEUE')) {
        code += `\n    void enqueue(int item) {\n        items.push_back(item);\n    }\n\n    int dequeue() {\n        int res = items.front();\n        items.erase(items.begin());\n        return res;\n    }\n};`;
    } else {
        code += `\n    // Implementation for ${structure}\n};`;
    }
    return code;
};
