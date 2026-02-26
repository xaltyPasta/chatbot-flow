import type { Node, Edge } from "@xyflow/react"

export type PanelMode = "nodes" | "settings"

export interface TextNodeData extends Record<string, unknown> {
    title: string
    message: string
}

export type FlowNode = Node<TextNodeData>
export type FlowEdge = Edge