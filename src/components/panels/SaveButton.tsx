import { useState } from "react"
import { useFlowStore } from "../../store/flowStore"
import { validateFlow } from "../../utils/validation"

const SaveButton = () => {
    const { nodes, edges } = useFlowStore()
    const [message, setMessage] = useState<string | null>(null)

    const handleSave = () => {
        const result = validateFlow(nodes, edges)

        if (!result.isValid) {
            setMessage(result.error || "Invalid flow")
            return
        }

        setMessage("Flow saved successfully ✅")

        console.log("FLOW JSON:", {
            nodes,
            edges,
        })
    }

    return (
        <div style={{ padding: 16 }}>
            <button
                onClick={handleSave}
                style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 6,
                    border: "none",
                    background: "#222",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                Save Flow
            </button>

            {message && (
                <div
                    style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: message.includes("successfully") ? "green" : "red",
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    )
}

export default SaveButton