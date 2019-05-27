import {AdjNodesObject, NodeObject, TableObject} from './dijkstra.interfaces'

export const getInitialTableValue = (start: string, nodes: Array<NodeObject>): Array<TableObject> => {
    return nodes.map( (node:NodeObject) => {
        const distance = start === node.nodeName ? 0 : Infinity;
        return {
            nodeName: node.nodeName,
            totalShortestDistance: distance,
            previousNode: ''
        }
    });
};

export const getCurrentNode = (nodes: Array<NodeObject>, currentNodeName: string) => nodes.filter((node: NodeObject) => node.nodeName === currentNodeName)[0];

export const getUniqueNodesWithTotalDistance = (adjacentNodes : Array<AdjNodesObject>, visitedArray: Array<string>, shortestDistance: number) => {
    let uniqueAdjacentNodes: any =[];

    adjacentNodes.forEach((adjacentNode: AdjNodesObject) => {
        if(!visitedArray.includes(adjacentNode.nodeName)) {
            uniqueAdjacentNodes.push({
                nodeName: adjacentNode.nodeName,
                distance: shortestDistance + adjacentNode.distance
            });
        }
    });
    return uniqueAdjacentNodes;
};

export const updateTable = (table: Array<TableObject>, nodesWithTotalDistance: Array<AdjNodesObject>, currentNodeName: string ) => {
    let newTable = table;
    nodesWithTotalDistance.forEach((element:AdjNodesObject) => {
        let row = newTable.filter((row:any) => row.nodeName === element.nodeName)[0];
        if (row && (row.totalShortestDistance ===Infinity || element.distance < row.totalShortestDistance )) {
            row.totalShortestDistance = element.distance;
            row.previousNode = currentNodeName;
        }
    });
    return newTable;
};

export const getNextNode= (table:Array<TableObject>, currentNodeName: string, visitedArray: Array<string>) => {
    let tempTable = table.filter((row:any) => {
        return (!visitedArray.includes(row.nodeName) && row.nodeName!==currentNodeName) && !(row.totalShortestDistance === 0 || row.totalShortestDistance === Infinity)
    });
    tempTable.sort((a:any, b:any) => a.totalShortestDistance - b.totalShortestDistance);

    return tempTable[0];
};

