# DSA Sandbox: Stack, Queue & Tree Visualizer

A premium, interactive learning platform designed to master data structures through real-time visualization, complexity analysis, and hands-on practice.

## 🚀 Features

- **14+ Data Structures**: Including Stacks, Queues (Circular, Priority, Deque), Linked Lists (Singly, Doubly, Circular), and Trees (BST, AVL, Red-Black, Heap, Trie).
- **Interactive Visualization**: Smooth, animated transitions using Framer Motion to visualize every push, pop, rotation, and swap.
- **Time Travel Debugging**: Complete history of operations allowing you to undo, redo, and replay your data structure's evolution.
- **Compare Mode**: Side-by-side analysis of different structures to understand their trade-offs in real-time.
- **Code Generation**: Instant code snippets in Python, JavaScript, Java, and C++ matching your current sandbox state.
- **Complexity Analyzer**: Visual breakdown of time and space complexity for every operation.
- **Interview & Challenge Mode**: Gamified learning with quizzes and timed challenges to test your knowledge.
- **Performance Lab**: Benchmark algorithms and visualize efficiency using interactive charts.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + ShadCN UI
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript

## 🎨 Design System

The application features a premium **Neumorphism + Glassmorphism** hybrid interface, inspired by modern tools like Linear and Raycast. It supports both **Light and Dark modes** with smooth transitions.

## 🏁 Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

- `src/components/visualizers`: Core visualization engines for each data structure.
- `src/utils/treeLogic.ts`: Robust, immutable implementation of tree algorithms.
- `src/store`: Unified state management for the sandbox and operation history.
- `src/components/sandbox`: Modular panels for the 3-column interactive environment.

---
Built with ❤️ for educational excellence.
