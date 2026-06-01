import { TreeState } from '../types/structures';

const getHeight = (node: TreeState | null): number => node?.height || 0;

export const insertBST = (root: TreeState | null, value: number): TreeState => {
  const id = Math.random().toString(36).substr(2, 9);
  if (!root) return { id, value, left: null, right: null, height: 1 };

  if (value < (root.value as number)) {
    root.left = insertBST(root.left || null, value);
  } else {
    root.right = insertBST(root.right || null, value);
  }

  root.height = 1 + Math.max(getHeight(root.left || null), getHeight(root.right || null));
  return root;
};

export const insertAVL = (root: TreeState | null, value: number): TreeState => {
    const id = Math.random().toString(36).substr(2, 9);
    if (!root) return { id, value, left: null, right: null, height: 1 };

    if (value < (root.value as number)) {
        root.left = insertAVL(root.left || null, value);
    } else if (value > (root.value as number)) {
        root.right = insertAVL(root.right || null, value);
    } else {
        return root;
    }

    root.height = 1 + Math.max(getHeight(root.left || null), getHeight(root.right || null));
    const balance = getBalance(root);

    if (balance > 1 && value < ((root.left?.value as number) || 0)) return rightRotate(root);
    if (balance < -1 && value > ((root.right?.value as number) || 0)) return leftRotate(root);
    if (balance > 1 && value > ((root.left?.value as number) || 0)) {
        root.left = leftRotate(root.left!);
        return rightRotate(root);
    }
    if (balance < -1 && value < ((root.right?.value as number) || 0)) {
        root.right = rightRotate(root.right!);
        return leftRotate(root);
    }

    return root;
};

export const insertRBT = (root: TreeState | null, value: number): TreeState => {
    // Standard BST Insert
    const newNode: TreeState = {
        id: Math.random().toString(36).substr(2, 9),
        value,
        left: null,
        right: null,
        color: 'red'
    };

    if (!root) {
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

    insert(root, value);

    // Fix RBT Properties
    let curr = newNode;
    while (curr !== root && curr.parent?.color === 'red') {
        if (curr.parent === curr.parent.parent?.left) {
            const uncle = curr.parent.parent.right;
            if (uncle?.color === 'red') {
                curr.parent.color = 'black';
                uncle.color = 'black';
                curr.parent.parent.color = 'red';
                curr = curr.parent.parent;
            } else {
                if (curr === curr.parent.right) {
                    curr = curr.parent;
                    root = leftRotateRBT(root, curr);
                }
                curr.parent!.color = 'black';
                curr.parent!.parent!.color = 'red';
                root = rightRotateRBT(root, curr.parent!.parent!);
            }
        } else {
            const uncle = curr.parent!.parent!.left;
            if (uncle?.color === 'red') {
                curr.parent!.color = 'black';
                uncle.color = 'black';
                curr.parent!.parent!.color = 'red';
                curr = curr.parent!.parent!;
            } else {
                if (curr === curr.parent!.left) {
                    curr = curr.parent!;
                    root = rightRotateRBT(root, curr);
                }
                curr.parent!.color = 'black';
                curr.parent!.parent!.color = 'red';
                root = leftRotateRBT(root, curr.parent!.parent!);
            }
        }
    }
    root.color = 'black';
    return root;
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
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(getHeight(y.left || null), getHeight(y.right || null)) + 1;
    x.height = Math.max(getHeight(x.left || null), getHeight(x.right || null)) + 1;
    return x;
};

const leftRotate = (x: TreeState): TreeState => {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(getHeight(x.left || null), getHeight(x.right || null)) + 1;
    y.height = Math.max(getHeight(y.left || null), getHeight(y.right || null)) + 1;
    return y;
};

export const insertTrie = (root: TreeState | null, word: string): TreeState => {
    if (!root) root = { id: 'root', value: '', isEndOfWord: false, children: {} };
    let curr = root;
    for (const char of word) {
        if (!curr.children) curr.children = {};
        if (!curr.children[char]) {
            curr.children[char] = { id: Math.random().toString(36).substr(2, 9), value: char, isEndOfWord: false, children: {} };
        }
        curr = curr.children[char];
    }
    curr.isEndOfWord = true;
    return root;
};
