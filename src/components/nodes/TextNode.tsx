import { Handle, Position } from "@xyflow/react"
import type { NodeProps } from "@xyflow/react"
import type { TextNodeData } from "../../types/flowTypes"

const TextNode = (props: NodeProps) => {
    const data = props.data as TextNodeData

    return (
        <div
            style={{
                padding: 12,
                border: "1px solid #ccc",
                borderRadius: 8,
                background: "#fff",
                minWidth: 180,
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
        >
            <div
                style={{
                    fontWeight: 600,
                    marginBottom: 6,
                    borderBottom: "1px solid #eee",
                    paddingBottom: 4,
                }}
            >
                {data.title}
            </div>

            <div style={{ fontSize: 14 }}>
                {data.message}
            </div>

            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    )
}

export default TextNode