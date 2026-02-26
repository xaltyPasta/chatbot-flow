# 🧩 Chatbot Flow Builder

A mini visual flow builder built using **React + TypeScript + React Flow (@xyflow/react)** that allows users to create, connect, edit, validate, and persist conversational flows.

This project focuses on clean architecture, extensibility, and correct business rule enforcement.

---

## 🚀 Live Demo

> Add your deployed Vercel link here

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| @xyflow/react (React Flow v12) | Visual canvas & node rendering |
| Zustand | Centralized state management |
| Zustand Persist Middleware | localStorage persistence |

---

## 🧠 Features

###  Node Creation (Drag & Drop)
- Drag "Message Node" from sidebar
- Drop anywhere on canvas
- Node created at exact drop position using `screenToFlowPosition`

###  Custom Node UI
Each node contains:
- Title
- Message content
- Source handle (right side — for outgoing connections)
- Target handle (left side — for incoming connections)

###  Edge Connections
- Connect nodes visually by dragging between handles
- Only **one outgoing edge per source node** allowed
- Multiple incoming edges allowed on any node

###  Edit Node Content
- Click any node → settings panel opens in the sidebar
- Edit node title and message content live
- Updates reflect instantly on the canvas

###  Delete Functionality
- Delete selected node (also removes all connected edges)
- Delete edges by selecting and pressing the `Delete` key

###  Validation Rule (Business Logic)

On clicking **Save**, the following rule is enforced:

> If **total nodes > 1** AND **more than one node has no incoming edge** → ❌ Flow is invalid

Only **one root node** is allowed — ensuring a single entry point for the conversational flow.

###  Persistence
Flow state persists automatically using Zustand + localStorage.
Refreshing the page does **not** lose the flow.

---

## 🏗 Project Structure

```
src/
│
├── app/
│   └── FlowBuilder.tsx          # Root layout: canvas + sidebar
│
├── components/
│   ├── canvas/
│   │   └── FlowCanvas.tsx       # React Flow canvas, drag/drop, event handlers
│   ├── nodes/
│   │   └── TextNode.tsx         # Custom message node UI
│   ├── panels/
│   │   ├── Sidebar.tsx          # Conditional panel router
│   │   ├── NodesPanel.tsx       # Draggable node palette
│   │   └── SettingsPanel.tsx    # Node edit form
│   └── common/
│       └── SaveButton.tsx       # Save + validation trigger
│
├── store/
│   └── flowStore.ts             # Zustand store (nodes, edges, UI state)
│
├── registry/
│   └── nodeRegistry.ts          # Maps node type strings → React components
│
├── types/
│   ├── flowTypes.ts             # Edge, Node, store typings
│   └── nodeTypes.ts             # Node data shape definitions
│
└── utils/
    └── validation.ts            # Business rule enforcement (pure function)
```

---

## 🧠 Key Architectural Decisions

### 1. Controlled React Flow

React Flow runs in **controlled mode**:

- `nodes` and `edges` are owned by Zustand
- React Flow is responsible for UI rendering only
- All mutations (add, update, delete) go through the centralized store

This ensures predictable, debuggable state management with a single source of truth.

---

### 2. Centralized State via Zustand

All application state lives in `store/flowStore.ts`:

```ts
{
  nodes: Node[],
  edges: Edge[],
  selectedNodeId: string | null,
  panelMode: 'nodes' | 'settings',
}
```

State is:
- **Immutable** — updated via Zustand actions, never mutated directly
- **Persisted** — via `persist` middleware to localStorage
- **Globally accessible** — no prop drilling needed

---

### 3. Node Registry Pattern

Custom node types are registered in `registry/nodeRegistry.ts`:

```ts
export const nodeTypes = {
  textNode: TextNode,
};
```

**To add a new node type:**
1. Create a new node component in `components/nodes/`
2. Register it in `nodeRegistry.ts`
3. Add a drag item for it in `NodesPanel.tsx`

The FlowCanvas does **not** need to be modified.

---

### 4. Business Logic Separation

Validation logic is fully isolated in `utils/validation.ts` as a **pure function**:

```ts
validateFlow(nodes, edges): { valid: boolean; message: string }
```

Benefits:
- UI components stay clean and presentation-only
- Logic is independently unit-testable
- Responsibilities are clearly separated

---

## 🔍 Validation Logic

The validation algorithm works as follows:

1. Build a map of `nodeId → incomingEdgeCount` (all start at 0)
2. Iterate through all edges and increment the target node's count
3. Count nodes where `incomingEdgeCount === 0` (root nodes)
4. If `nodes.length > 1` AND `rootCount > 1` → **invalid flow**

This ensures a valid single-entry-point conversational flow.

---

## 🧩 Interaction Flows

### Creating a Node
1. Drag node type from sidebar palette
2. Drop on canvas
3. Canvas computes position via `screenToFlowPosition`
4. Node added to Zustand store → canvas re-renders

### Connecting Nodes
1. User drags from a source handle to a target handle
2. `onConnect` fires
3. Logic checks: does source node already have an outgoing edge?
4. If not → edge added to store

### Editing a Node
1. User clicks a node
2. `selectedNodeId` set in store → panel switches to settings mode
3. User edits title/message in the settings panel
4. Store updates node data → node re-renders live

### Saving the Flow
1. User clicks **Save**
2. `validateFlow(nodes, edges)` runs
3.  Valid → success toast/indicator shown
4. ❌ Invalid → error message shown

---

## 💾 Persistence Strategy

Zustand's `persist` middleware automatically syncs state to localStorage:

```ts
persist(flowStore, { name: 'flow-builder-storage' })
```

On page refresh:
- Zustand reads from `flow-builder-storage` in localStorage
- State is rehydrated
- Flow is restored automatically — no manual save required

---

## ▶️ Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

**Build for production:**
```bash
npm run build
```

---

## 🚀 Future Improvements

| Feature | Description |
|---|---|
| Auto layout | DAG-based automatic node positioning |
| JSON export/import | Save and load flows as files |
| Multiple flows | Support for multiple independent flows |
| Backend persistence | API-based storage replacing localStorage |
| Visual validation indicators | Highlight invalid nodes/edges before save |
| Edge labels | Named connections for conditional branches |
| Conditional branching | Nodes with multiple conditional outputs |
| Undo/Redo | History-based state management |

---

## 📌 Design Philosophy

This project was built with the following principles in mind:

- **Clean separation of concerns** — UI, state, and logic are independent layers
- **Extensibility** — new node types can be added with zero changes to core components
- **Strict TypeScript** — all data structures are fully typed
- **Business rule enforcement** — validation is explicit, not implicit
- **Predictable state management** — controlled React Flow + Zustand
- **Minimal coupling** — components communicate through the store, not each other

The goal was not just to make it work, but to structure it as a **scalable, maintainable system**.

---
