import type { FlowNode, FlowEdge } from "../types/flowTypes"

export interface ValidationResult {
    isValid: boolean
    error?: string
}

export const validateFlow = (
    nodes: FlowNode[],
    edges: FlowEdge[]
): ValidationResult => {
    if (nodes.length <= 1) {
        return { isValid: true }
    }

    const incomingCount: Record<string, number> = {}

    nodes.forEach((node) => {
        incomingCount[node.id] = 0
    })

    edges.forEach((edge) => {
        if (edge.target) {
            incomingCount[edge.target] += 1
        }
    })

    const rootNodes = Object.values(incomingCount).filter(
        (count) => count === 0
    )

    if (rootNodes.length > 1) {
        return {
            isValid: false,
            error: "Flow must have exactly one root node.",
        }
    }

    return { isValid: true }
}