import { useFlowStore } from "../../store/flowStore"
import { useFlowActions } from "../../hooks/useFlowActions"

const SettingsPanel = () => {
    const { nodes, edges, selectedNodeId } = useFlowStore()
    const { updateNode, setNodes, setEdges } = useFlowActions()

    const selectedNode = nodes.find((node) => node.id === selectedNodeId)
    if (!selectedNode) return null

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNode(selectedNode.id, { title: e.target.value })
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateNode(selectedNode.id, { message: e.target.value })
    }

    const handleDelete = () => {
        const updatedNodes = nodes.filter(
            (node) => node.id !== selectedNode.id
        )

        const updatedEdges = edges.filter(
            (edge) =>
                edge.source !== selectedNode.id &&
                edge.target !== selectedNode.id
        )

        setNodes(updatedNodes)
        setEdges(updatedEdges)
    }

    return (
        <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>
                Node Settings
            </div>

            <div style={{ marginBottom: 8 }}>Title</div>
            <input
                value={(selectedNode.data as any).title}
                onChange={handleTitleChange}
                style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    marginBottom: 16,
                }}
            />

            <div style={{ marginBottom: 8 }}>Message</div>
            <textarea
                value={(selectedNode.data as any).message}
                onChange={handleMessageChange}
                rows={4}
                style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    marginBottom: 16,
                }}
            />

            <button
                onClick={handleDelete}
                style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 6,
                    border: "none",
                    background: "red",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                Delete Node
            </button>
        </div>
    )
}

export default SettingsPanel