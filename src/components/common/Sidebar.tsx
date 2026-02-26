import { useFlowStore } from "../../store/flowStore"
import NodesPanel from "../panels/NodesPanel"
import SettingsPanel from "../panels/SettingsPanel"
import SaveButton from "../panels/SaveButton"

const Sidebar = () => {
    const { selectedNodeId } = useFlowStore()

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                <NodesPanel />
            </div>

            {selectedNodeId && (
                <div style={{ flex: 1, overflowY: "auto" }}>
                    <SettingsPanel />
                </div>
            )}

            <SaveButton />
        </div>
    )
}

export default Sidebar