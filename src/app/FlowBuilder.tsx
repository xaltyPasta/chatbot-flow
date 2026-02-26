import { ReactFlowProvider } from "@xyflow/react"
import FlowCanvas from "../components/canvas/FlowCanvas"
import Sidebar from "../components/common/Sidebar"

const FlowBuilder = () => {
    return (
        <ReactFlowProvider>
            <div style={{ display: "flex", width: "100%", height: "100%" }}>
                <div style={{ flex: 1 }}>
                    <FlowCanvas />
                </div>

                <div
                    style={{
                        width: 250,
                        borderLeft: "1px solid #ddd",
                    }}
                >
                    <Sidebar />
                </div>
            </div>
        </ReactFlowProvider>
    )
}

export default FlowBuilder