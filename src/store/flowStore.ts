import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FlowNode, FlowEdge, PanelMode } from "../types/flowTypes"

interface FlowState {
    nodes: FlowNode[]
    edges: FlowEdge[]
    selectedNodeId: string | null
    panelMode: PanelMode

    setNodes: (nodes: FlowNode[]) => void
    setEdges: (edges: FlowEdge[]) => void
    addNode: (node: FlowNode) => void
    updateNode: (nodeId: string, data: Partial<FlowNode["data"]>) => void
    addEdge: (edge: FlowEdge) => void
    setSelectedNode: (nodeId: string | null) => void
    resetFlow: () => void
}

export const useFlowStore = create<FlowState>()(
    persist(
        (set) => ({
            nodes: [],
            edges: [],
            selectedNodeId: null,
            panelMode: "nodes",

            setNodes: (nodes) => set({ nodes }),

            setEdges: (edges) => set({ edges }),

            addNode: (node) =>
                set((state) => ({
                    nodes: [...state.nodes, node],
                })),

            updateNode: (nodeId, data) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? { ...node, data: { ...node.data, ...data } }
                            : node
                    ),
                })),

            addEdge: (edge) =>
                set((state) => ({
                    edges: [...state.edges, edge],
                })),

            setSelectedNode: (nodeId) =>
                set({
                    selectedNodeId: nodeId,
                    panelMode: nodeId ? "settings" : "nodes",
                }),

            resetFlow: () =>
                set({
                    nodes: [],
                    edges: [],
                    selectedNodeId: null,
                    panelMode: "nodes",
                }),
        }),
        {
            name: "flow-builder-storage",
        }
    )
)