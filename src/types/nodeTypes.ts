export const CustomNodeType = {
    TEXT: "textNode",
} as const

export type CustomNodeType =
    (typeof CustomNodeType)[keyof typeof CustomNodeType]