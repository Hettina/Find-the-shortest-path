import {
    getInitialTableValue,
    getCurrentNode,
    getUniqueNodesWithTotalDistance,
    updateTable,
    getNextNode
} from '../dijkstra.service'


describe('Test Dijkstra Service', () => {
    describe('test getInitialTableValue when 3 nodes are supplied (A, B, C) and A is the starting node', () => {
        let nodes = [
            {nodeName: 'A', adjacentNodes: [{"nodeName": "C", "distance": 2}, {"nodeName": "B", "distance": 5}]},
            {nodeName: 'B', adjacentNodes: [{"nodeName": "C", "distance": 1}, {"nodeName": "A", "distance": 5}]},
            {nodeName: 'C', adjacentNodes: [{"nodeName": "B", "distance": 1}, {"nodeName": "A", "distance": 2}]}
        ];
        const initialTable = getInitialTableValue('A', nodes);
        it('First element should be node A and have totalShortestDistance=0 ', () => {
            expect(initialTable[0].nodeName).toEqual('A');
            expect(initialTable[0].totalShortestDistance).toEqual(0);
        });
        it('Second element should be node B and have totalShortestDistance=Infinity ', () => {
            expect(initialTable[1].nodeName).toEqual('B')
            expect(initialTable[1].totalShortestDistance).toEqual(Infinity)
        });
        it('Third element should be node C and have totalShortestDistance=Infinity ', () => {
            expect(initialTable[2].nodeName).toEqual('C');
            expect(initialTable[2].totalShortestDistance).toEqual(Infinity);
        });
    });

    describe('test getCurrentNode when 3 nodes are supplied (A, B, C)', () => {
        let nodes = [
            {nodeName: 'A', adjacentNodes: [{"nodeName": "C", "distance": 2}, {"nodeName": "B", "distance": 5}]},
            {nodeName: 'B', adjacentNodes: [{"nodeName": "C", "distance": 1}, {"nodeName": "A", "distance": 5}]},
            {nodeName: 'C', adjacentNodes: [{"nodeName": "B", "distance": 1}, {"nodeName": "A", "distance": 2}]}
        ];
        it('If current node is B should get the second object in the array ', () => {
            const currentNodeObject = getCurrentNode(nodes, 'B');
            expect(currentNodeObject).toEqual(nodes[1]);
        });
    });

    describe('test getUniqueNodesWithTotalDistance when 3 nodes are supplied (A, B, C)', () => {
        let nodes = [
            {nodeName: 'A', adjacentNodes: [{"nodeName": "C", "distance": 2}, {"nodeName": "B", "distance": 5}]},
            {nodeName: 'B', adjacentNodes: [{"nodeName": "C", "distance": 1}, {"nodeName": "A", "distance": 5}]},
            {nodeName: 'C', adjacentNodes: [{"nodeName": "B", "distance": 1}, {"nodeName": "A", "distance": 2}]}
        ];
        it('At start (if A was the starting): visitedArray=[] and shortestDistance=0 ' +
            'the first object back is expected B and to have totalDistance= ', () => {
            const nodeA = nodes[0];
            const uniqueAdjacentNodes = getUniqueNodesWithTotalDistance(nodeA.adjacentNodes, [], 0);

            expect(uniqueAdjacentNodes[0].nodeName).toEqual('C');
            expect(uniqueAdjacentNodes[0].distance).toEqual(2);
        });
        it('At start (if A was the starting): visitedArray=[] and shortestDistance=0 ' +
            'the second object back is expected B and to have totalDistance= ', () => {
            const nodeA = nodes[0];
            const uniqueAdjacentNodes = getUniqueNodesWithTotalDistance(nodeA.adjacentNodes, [], 0);

            expect(uniqueAdjacentNodes[1].nodeName).toEqual('B');
            expect(uniqueAdjacentNodes[1].distance).toEqual(5);
        });
        it('At second node which would be C (if A was the starting): visitedArray=[A] and shortestDistance=2 ' +
            'should only return one object (node B) ', () => {
            const nodeC = nodes[2];
            const uniqueAdjacentNodes = getUniqueNodesWithTotalDistance(nodeC.adjacentNodes, ['A'], 2);
            expect(uniqueAdjacentNodes.length).toEqual(1);
            expect(uniqueAdjacentNodes[0].nodeName).toEqual('B');
            expect(uniqueAdjacentNodes[0].distance).toEqual(3);
        });
    });
    describe('If Starting at A Test updateTable when 3 nodes are supplied (A, B, C)', () => {
        let nodes = [
            {nodeName: 'A', adjacentNodes: [{"nodeName": "C", "distance": 2}, {"nodeName": "B", "distance": 5}]},
            {nodeName: 'B', adjacentNodes: [{"nodeName": "C", "distance": 1}, {"nodeName": "A", "distance": 5}]},
            {nodeName: 'C', adjacentNodes: [{"nodeName": "B", "distance": 1}, {"nodeName": "A", "distance": 2}]}
        ];
        let initaltable =[
            {nodeName: 'A', totalShortestDistance: 0, previousNode: ''},
            {nodeName: 'B', totalShortestDistance: Infinity, previousNode: ''},
            {nodeName: 'C', totalShortestDistance: Infinity, previousNode: ''}
        ];
        const nodeA = nodes[0];
        const nodesWithTotalDistance= [
            {nodeName:'C', distance: 2},
            {nodeName:'B', distance: 5}
        ];

        it('The first object in the table should be A totalShortestDistance =0 and previousNode is empty ', () => {
            const table = updateTable(initaltable, nodesWithTotalDistance, nodeA.nodeName);
            expect(table[0].nodeName).toEqual('A');
            expect(table[0].totalShortestDistance).toEqual(0);
            expect(table[0].previousNode).toEqual('');
        });
        it('The second object in the table should be B totalShortestDistance =5 and previousNode=A', () => {
            const table = updateTable(initaltable, nodesWithTotalDistance, nodeA.nodeName);
            expect(table[1].nodeName).toEqual('B');
            expect(table[1].totalShortestDistance).toEqual(5);
            expect(table[1].previousNode).toEqual('A');
        });
        it('The third object in the table should be C totalShortestDistance =2 and previousNode=A', () => {
            const table = updateTable(initaltable, nodesWithTotalDistance, nodeA.nodeName);
            expect(table[2].nodeName).toEqual('C');
            expect(table[2].totalShortestDistance).toEqual(2);
            expect(table[2].previousNode).toEqual('A');
        });
    });
    describe('If Starting at A Test getNextNode when 3 nodes are supplied (A, B, C)', () => {
        let nodes = [
            {nodeName: 'A', adjacentNodes: [{"nodeName": "C", "distance": 2}, {"nodeName": "B", "distance": 5}]},
            {nodeName: 'B', adjacentNodes: [{"nodeName": "C", "distance": 1}, {"nodeName": "A", "distance": 5}]},
            {nodeName: 'C', adjacentNodes: [{"nodeName": "B", "distance": 1}, {"nodeName": "A", "distance": 2}]}
        ];
        let updatedTable =[
            {nodeName: 'A', totalShortestDistance: 0, previousNode: ''},
            {nodeName: 'B', totalShortestDistance: 5, previousNode: 'A'},
            {nodeName: 'C', totalShortestDistance: 2, previousNode: 'A'}
        ];
        const nodeA = nodes[0];

        it('Object returned should be C ', () => {
            const node = getNextNode(updatedTable,  nodeA.nodeName, []);
            expect(node.nodeName).toEqual('C');
            expect(node.totalShortestDistance).toEqual(2);
            expect(node.previousNode).toEqual('A');
        });
    });
});
