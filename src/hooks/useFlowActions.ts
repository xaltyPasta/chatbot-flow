import { useFlowStore } from "../store/flowStore"

export const useFlowActions = () => {
    const {
        addNode,
        updateNode,
        addEdge,
        setSelectedNode,
        setNodes,
        setEdges,
    } = useFlowStore()

    return {
        addNode,
        updateNode,
        addEdge,
        setSelectedNode,
        setNodes,
        setEdges,
    }
}