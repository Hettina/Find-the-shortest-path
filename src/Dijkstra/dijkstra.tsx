import React from 'react';
import {
    getInitialTableValue,
    getCurrentNode,
    getUniqueNodesWithTotalDistance,
    updateTable,
    getNextNode
} from './dijkstra.service'
import './dikstra.css';

import {NodeObject, DijkstraProps} from './dijkstra.interfaces'
let nodes = require( './data.json');

const updateUnvisitedArray = (unvisitedArray: Array<string>, currentNodeName:string) => unvisitedArray.filter(item => item !== currentNodeName);

const Dijkstra: React.FC <DijkstraProps> = (props) => {

    const findShortestPath = (start: string, end: string, nodes: Array<NodeObject>): number => {
        if(start!=='' && end!== '') {
            // setup Initial
            let currentNodeName = start;
            let totalShortestDistance = 0;
            let visitedArray = [];
            let unvisitedArray = nodes.map((node: NodeObject) => node.nodeName);
            let table = getInitialTableValue(start, nodes);

            //loop through all the nodes
            if(unvisitedArray.includes(start)) {
                while (unvisitedArray.length > 0) {
                    let adjacentNodes = getCurrentNode(nodes, currentNodeName).adjacentNodes;
                    let nodesWithTotalDistance = getUniqueNodesWithTotalDistance(adjacentNodes, visitedArray, totalShortestDistance);
                    table = updateTable(table, nodesWithTotalDistance, currentNodeName);


                    // find next node to move to
                    let nextNode = getNextNode(table, currentNodeName, visitedArray);
                    if (nextNode) {
                        totalShortestDistance = nextNode.totalShortestDistance;
                        visitedArray.push(currentNodeName);
                        unvisitedArray = updateUnvisitedArray(unvisitedArray, currentNodeName);
                        currentNodeName = nextNode.nodeName;
                    } else {
                        unvisitedArray = updateUnvisitedArray(unvisitedArray, currentNodeName);
                    }
                }


                let endNode = table.find(row => row.nodeName === end);
                return endNode ? endNode.totalShortestDistance : 0;
            }
        }
            return 0;
    };

    return (
        <p className="resultParagraph">
            <span> The shortest path is: </span>
            <span className="answer">{findShortestPath(props.start, props.end, nodes.data)}</span>
        </p>
    );
};


export default Dijkstra;
