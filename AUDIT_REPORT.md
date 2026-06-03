# DSA Sandbox: Algorithm & Logic Audit Report

## 1. Bug Fix Report

### Circular Queue Correctness
- **Issue**: Previously behaved like a simple array with no wrap-around logic; reported full incorrectly.
- **Fix**: Implemented true circular logic using `(rear + 1) % capacity` and `(front + 1) % capacity`. Added explicit `front`, `rear`, and `size` state variables to the global store.
- **Verification**: Enqueueing 10 elements into a capacity-10 queue works perfectly. The 11th enqueue triggers an "Overflow" toast. Dequeueing and then enqueueing again correctly wraps around to index 0.

### Random Generation
- **Issue**: Random button only generated a fixed small number of elements.
- **Fix**: Updated logic to respect `maxSize`. Random generation now fills the structure to 100% capacity. Added shuffling for Tree structures to ensure better balanced BSTs and RBTs on random load.
- **Verification**: Clicking "Random" on a capacity-20 Stack now correctly pushes 20 elements.

### Red-Black Tree Stability
- **Issue**: Random insertion sequence caused "Cannot read property of undefined" crashes during balancing.
- **Fix**: Added robust null-checks for `uncle`, `parent`, and `grandparent` nodes during recoloring and rotations. Ensure root is forced to black after every operation.
- **Verification**: Stress-tested with 100 random insertions via `qa_test.ts`. Zero crashes.

### Linked List Enhancement
- **Issue**: Missing standard academic operations.
- **Fix**: Added Delete Position, Reverse (in-place logic), Sort (value-based), Find Middle, and Cycle Detection (logical check for CLL).
- **Verification**: All operations correctly update the visual list and pointers.

## 2. QA Report (Automated & Manual)

### Stress Testing (100 Operations each)
| Structure | Insertions | Deletions | Search | Result |
|-----------|------------|-----------|--------|--------|
| BST       | Pass       | Pass      | Pass   | Stable |
| AVL       | Pass       | Pass      | Pass   | Balanced |
| RBT       | Pass       | Pass      | Pass   | Valid Colors |
| Heap      | Pass       | Pass      | Pass   | Complete |
| Trie      | Pass       | Pass      | Pass   | Functional |

### Validation Checks
- **Duplicate BST Insertion**: Correctly blocked with "Value already exists" toast.
- **Linked List Out-of-Bounds**: Correctly blocked when trying to delete position 99 on a size-5 list.
- **Queue Overflow**: Enqueue on full queue correctly shows error.
- **Stack Underflow**: Pop on empty stack correctly shows error.

## 3. UI/UX Refinements
- **State Panel**: Added "Real-time State" section in the right panel showing current Size, Capacity, Height, and Balance status.
- **Visualizer Colors**: All hardcoded hex codes replaced with Tailwind-compatible CSS variables.
- **Tree Spacing**: Recursive layout now uses dynamic offsets to prevent overlap even at 4+ levels of depth.
