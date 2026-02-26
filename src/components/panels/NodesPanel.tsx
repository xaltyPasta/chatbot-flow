import { CustomNodeType } from "../../types/nodeTypes"

const NodesPanel = () => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("application/reactflow", CustomNodeType.TEXT)
        event.dataTransfer.effectAllowed = "move"
    }

    return (
        <div style={{ padding: 16 }}>
            <div
                draggable
                onDragStart={onDragStart}
                style={{
                    padding: 10,
                    border: "1px solid #222",
                    borderRadius: 6,
                    cursor: "grab",
                    textAlign: "center",
                }}
            >
                Message Node
            </div>
        </div>
    )
}

export default NodesPanel