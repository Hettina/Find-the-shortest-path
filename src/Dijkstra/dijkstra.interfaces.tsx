export interface DijkstraProps {
    start: string,
    end: string
}

export interface NodeObject {
    nodeName: string
    adjacentNodes: Array<AdjNodesObject>
}

export interface AdjNodesObject {
    nodeName: string,
    distance: number
}

export interface TableObject {
    nodeName: string,
    totalShortestDistance: number,
    previousNode: string
}
