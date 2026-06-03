import { TreeState } from '../types/structures';

const getHeight = (node: TreeState | null): number => node?.height || 0;

const createNode = (value: number | string, color?: 'red' | 'black'): TreeState => ({
  id: Math.random().toString(36).substr(2, 9),
  value,
  left: null,
  right: null,
  height: 1,
  color
});

export const insertBST = (root: TreeState | null, value: number): TreeState => {
  if (!root) return createNode(value);

  const newNode = { ...root };
  if (value < (root.value as number)) {
    newNode.left = insertBST(root.left || null, value);
  } else {
    newNode.right = insertBST(root.right || null, value);
  }

  newNode.height = 1 + Math.max(getHeight(newNode.left || null), getHeight(newNode.right || null));
  return newNode;
};

export const insertAVL = (root: TreeState | null, value: number): TreeState => {
    if (!root) return createNode(value);

    const newNode = { ...root };
    if (value < (root.value as number)) {
        newNode.left = insertAVL(root.left || null, value);
    } else if (value > (root.value as number)) {
        newNode.right = insertAVL(root.right || null, value);
    } else {
        return root;
    }

    newNode.height = 1 + Math.max(getHeight(newNode.left || null), getHeight(newNode.right || null));
    const balance = getBalance(newNode);

    if (balance > 1 && value < ((newNode.left?.value as number) || 0)) return rightRotate(newNode);
    if (balance < -1 && value > ((newNode.right?.value as number) || 0)) return leftRotate(newNode);
    if (balance > 1 && value > ((newNode.left?.value as number) || 0)) {
        newNode.left = leftRotate(newNode.left!);
        return rightRotate(newNode);
    }
    if (balance < -1 && value < ((newNode.right?.value as number) || 0)) {
        newNode.right = rightRotate(newNode.right!);
        return leftRotate(newNode);
    }

    return newNode;
};

export const insertRBT = (root: TreeState | null, value: number): TreeState => {
    const rootClone = root ? JSON.parse(JSON.stringify(root)) : null;

    const newNode: TreeState = {
        id: Math.random().toString(36).substr(2, 9),
        value,
        left: null,
        right: null,
        color: 'red'
    };

    if (!rootClone) {
        newNode.color = 'black';
        return newNode;
    }

    const insert = (node: TreeState, val: number): TreeState => {
        if (val < (node.value as number)) {
            if (!node.left) {
                node.left = newNode;
                newNode.parent = node;
            } else {
                insert(node.left, val);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
                newNode.parent = node;
            } else {
                insert(node.right, val);
            }
        }
        return node;
    };

    let newRoot = insert(rootClone, value);

    // Fix RBT Properties
    let curr = newNode;
    while (curr !== newRoot && curr.parent?.color === 'red') {
        if (curr.parent === curr.parent.parent?.left) {
            const uncle = curr.parent.parent?.right;
            if (uncle?.color === 'red') {
                curr.parent.color = 'black';
                uncle.color = 'black';
                curr.parent.parent.color = 'red';
                curr = curr.parent.parent;
            } else {
                if (curr === curr.parent.right) {
                    curr = curr.parent;
                    newRoot = leftRotateRBT(newRoot, curr);
                }
                curr.parent!.color = 'black';
                curr.parent!.parent!.color = 'red';
                newRoot = rightRotateRBT(newRoot, curr.parent!.parent!);
            }
        } else {
            const uncle = curr.parent!.parent?.left;
            if (uncle?.color === 'red') {
                curr.parent!.color = 'black';
                uncle.color = 'black';
                curr.parent!.parent!.color = 'red';
                curr = curr.parent!.parent!;
            } else {
                if (curr === curr.parent?.left) {
                    curr = curr.parent;
                    newRoot = rightRotateRBT(newRoot, curr);
                }
                if (curr.parent) curr.parent.color = 'black';
                if (curr.parent?.parent) curr.parent.parent.color = 'red';
                if (curr.parent?.parent) newRoot = leftRotateRBT(newRoot, curr.parent.parent);
            }
        }
    }
    newRoot.color = 'black';
    const removeParents = (node: TreeState | null) => {
        if (!node) return;
        delete node.parent;
        removeParents(node.left || null);
        removeParents(node.right || null);
    };
    removeParents(newRoot);
    return newRoot;
};

const leftRotateRBT = (root: TreeState, x: TreeState): TreeState => {
    const y = x.right!;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
    return root;
};

const rightRotateRBT = (root: TreeState, y: TreeState): TreeState => {
    const x = y.left!;
    y.left = x.right;
    if (x.right) x.right.parent = y;
    x.parent = y.parent;
    if (!y.parent) root = x;
    else if (y === y.parent.left) y.parent.left = x;
    else y.parent.right = x;
    x.right = y;
    y.parent = x;
    return root;
};

const getBalance = (node: TreeState | null): number => {
    return node ? getHeight(node.left || null) - getHeight(node.right || null) : 0;
};

const rightRotate = (y: TreeState): TreeState => {
    const x = { ...y.left! };
    const T2 = x.right;
    const newY = { ...y, left: T2 };
    x.right = newY;
    newY.height = Math.max(getHeight(newY.left || null), getHeight(newY.right || null)) + 1;
    x.height = Math.max(getHeight(x.left || null), getHeight(x.right || null)) + 1;
    return x;
};

const leftRotate = (x: TreeState): TreeState => {
    const y = { ...x.right! };
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(getHeight(x.left || null), getHeight(x.right || null)) + 1;
    y.height = Math.max(getHeight(y.left || null), getHeight(y.right || null)) + 1;
    return y;
};

export const insertTrie = (root: TreeState | null, word: string): TreeState => {
    const newRoot = root ? JSON.parse(JSON.stringify(root)) : { id: 'root', value: '', isEndOfWord: false, children: {} };
    let curr = newRoot;
    for (const char of word) {
        if (!curr.children) curr.children = {};
        if (!curr.children[char]) {
            curr.children[char] = { id: Math.random().toString(36).substr(2, 9), value: char, isEndOfWord: false, children: {} };
        }
        curr = curr.children[char];
    }
    curr.isEndOfWord = true;
    return newRoot;
};

export const insertHeap = (root: TreeState | null, value: number): TreeState => {
    const nodes: TreeState[] = [];
    const traverse = (node: TreeState | null) => {
        if (!node) return;
        nodes.push(node);
        traverse(node.left || null);
        traverse(node.right || null);
    };
    traverse(root);

    const allValues = [...nodes.map(n => n.value as number), value];
    allValues.sort((a, b) => b - a); // Max Heap

    const buildComplete = (index: number): TreeState | null => {
        if (index >= allValues.length) return null;
        const node = createNode(allValues[index]);
        node.left = buildComplete(2 * index + 1);
        node.right = buildComplete(2 * index + 2);
        return node;
    };

    return buildComplete(0)!;
};
