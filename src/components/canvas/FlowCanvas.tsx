import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    applyNodeChanges,
    applyEdgeChanges,
    useReactFlow,
} from "@xyflow/react"

import type {
    Connection,
    Edge,
    NodeChange,
    EdgeChange,
    OnConnect,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import { useCallback, useRef } from "react"
import { useFlowStore } from "../../store/flowStore"
import { useFlowActions } from "../../hooks/useFlowActions"
import { nodeTypes } from "../../registry/nodeRegistry"
import { CustomNodeType } from "../../types/nodeTypes"

const FlowCanvas = () => {
    const { nodes, edges } = useFlowStore()

    const {
        setNodes,
        setEdges,
        addEdge: addEdgeToStore,
        setSelectedNode,
        addNode,
    } = useFlowActions()

    const reactFlowWrapper = useRef<HTMLDivElement>(null)
    const { screenToFlowPosition } = useReactFlow()

    // -------------------------
    // Node updates
    // -------------------------
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            const updatedNodes = applyNodeChanges(changes, nodes) as typeof nodes
            setNodes(updatedNodes)
        },
        [nodes, setNodes]
    )

    // -------------------------
    // Edge updates
    // -------------------------
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            const updatedEdges = applyEdgeChanges(changes, edges) as typeof edges
            setEdges(updatedEdges)
        },
        [edges, setEdges]
    )

    // -------------------------
    // Edge creation restriction
    // -------------------------
    const onConnect: OnConnect = useCallback(
        (connection: Connection) => {
            if (!connection.source || !connection.target) return

            // Allow only ONE outgoing edge per source
            const alreadyHasOutgoing = edges.some(
                (edge) => edge.source === connection.source
            )

            if (alreadyHasOutgoing) return

            const newEdge: Edge = {
                ...connection,
                id: `${connection.source}-${connection.target}`,
            }

            addEdgeToStore(newEdge)
        },
        [edges, addEdgeToStore]
    )

    // -------------------------
    // Selection handling
    // -------------------------
    const onNodeClick = (_: unknown, node: any) => {
        setSelectedNode(node.id)
    }

    const onPaneClick = () => {
        setSelectedNode(null)
    }

    // -------------------------
    // Drag & Drop
    // -------------------------
    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
    }

    const onDrop = (event: React.DragEvent) => {
        event.preventDefault()

        const type = event.dataTransfer.getData("application/reactflow")
        if (!type) return

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        })

        const newNode = {
            id: crypto.randomUUID(),
            type: CustomNodeType.TEXT,
            position,
            data: {
                title: "New Node",
                message: "New Message"
            },
        }

        addNode(newNode)
    }

    return (
        <div
            ref={reactFlowWrapper}
            style={{ width: "100%", height: "100%" }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                onDragOver={onDragOver}
                onDrop={onDrop}
                edgesFocusable
                deleteKeyCode={["Delete", "Backspace"]}
                fitView
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    )
}

export default FlowCanvas