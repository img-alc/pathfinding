function BFS(maze) {
    this.maze = maze;
    this.nodes = [];
    this.mazeCells = maze.getMazeCells();
    for(let i = 0; i < this.mazeCells.length; i++) {
        this.nodes.push(new Node());
    }
}

BFS.prototype.findPath = function() {
    let isMazeSolved = false;
    let hasMoreNodesToVisit = true;
    let queue = [];    
    let currNodeIndex = 0;
    let mazeEndCell = this.maze.getEndCell();   

    while(hasMoreNodesToVisit) {
        if(this.mazeCells[currNodeIndex] === mazeEndCell) {
            isMazeSolved = true;
            hasMoreNodesToVisit = false;
        } else {
            let unvisitedNeighbors = this.getUnvisitedNeighborsIndexes(currNodeIndex);
            if(unvisitedNeighbors.length === 0 && queue.length === 0) {
                hasMoreNodesToVisit = false;
            } else {
                unvisitedNeighbors.forEach(unvisitedNeighbor => {
                    queue.push(unvisitedNeighbor);
                });                
                currNodeIndex = queue.shift();
                if(this.nodes[currNodeIndex].isVisited) {
                    this.maze.fillCell(this.mazeCells[currNodeIndex], 'grey');
                } else {
                    this.nodes[currNodeIndex].markNodeAsVisited();
                    this.maze.fillCell(this.mazeCells[currNodeIndex], 'yellow');
                }
                
            }            
        }
    }

    if(isMazeSolved) {
        alert("Maze solved: yellow dots represent the path, grey dots show nodes that were visited.");
    } else {
        alert("Impossible to solve maze");
    }
}

//TODO: Implement logic to get unvisited nodes
BFS.prototype.getUnvisitedNeighborsIndexes = function(currNodeIndex) {
    let unvisitedNeighbors = [];

    let neighborIndex = this.getUpperIndex(currNodeIndex);
    if(neighborIndex !== -1)
    {
        unvisitedNeighbors.push(neighborIndex);
    }
    
    neighborIndex = this.getRightIndex(currNodeIndex);
    if(neighborIndex !== -1)
    {
        unvisitedNeighbors.push(neighborIndex);
    }

    neighborIndex = this.getBottomIndex(currNodeIndex);
    if(neighborIndex !== -1)
    {
        unvisitedNeighbors.push(neighborIndex);
    }
    
    neighborIndex = this.getLeftIndex(currNodeIndex);
    if(neighborIndex !== -1)
    {
        unvisitedNeighbors.push(neighborIndex);
    }

    return unvisitedNeighbors;
}

BFS.prototype.getUpperIndex = function(currNodeIndex) {
    let nodeToVisitIndexInArray = currNodeIndex - this.maze.getNumberOfMazeColumns();
    if(nodeToVisitIndexInArray < 0) {
         return -1;
    }
    if(this.mazeCells[nodeToVisitIndexInArray].isBottomClosed()) {
         return -1;
    }
    if(this.nodes[nodeToVisitIndexInArray].isVisited) {
         return -1;
    }
    return nodeToVisitIndexInArray;
}

BFS.prototype.getRightIndex = function(currNodeIndex) {
    let nodeToVisitIndexInArray = currNodeIndex + 1;
    if(nodeToVisitIndexInArray >= this.mazeCells.length) {
        return -1;
    }
    let numberOfColumns = this.maze.getNumberOfMazeColumns();
    let currNodeColumn = currNodeIndex % numberOfColumns;
    let nodeToVisitColumn = nodeToVisitIndexInArray % numberOfColumns;
    if(currNodeColumn === nodeToVisitColumn) {
         return -1;
    }
    if(this.mazeCells[nodeToVisitIndexInArray].isLeftClosed()) {
         return -1;
    }
    if(this.nodes[nodeToVisitIndexInArray].isVisited) {
        return -1;
    }
    return nodeToVisitIndexInArray;
}

BFS.prototype.getBottomIndex = function(currNodeIndex) {
    let numberOfColumns = this.maze.getNumberOfMazeColumns();
    let nodeToVisitIndexInArray = currNodeIndex + numberOfColumns; 
    let numberOfRows = this.maze.getNumberOfMazeRows();
    if(nodeToVisitIndexInArray/numberOfColumns > numberOfRows) {
         return -1;
    }
    if(this.mazeCells[nodeToVisitIndexInArray].isUpperClosed()) {
         return -1;
    }
    if(this.nodes[nodeToVisitIndexInArray].isVisited) {
        return -1;
    }
    return nodeToVisitIndexInArray;
}

BFS.prototype.getLeftIndex = function(currNodeIndex) {
    let nodeToVisitIndexInArray = currNodeIndex - 1;
    if(nodeToVisitIndexInArray < 0) {
        return -1;
    }
    let numberOfColumns = this.maze.getNumberOfMazeColumns();
    let currNodeColumn = currNodeIndex % numberOfColumns;
    let nodeToVisitColumn = nodeToVisitIndexInArray % numberOfColumns;
    if(currNodeColumn === nodeToVisitColumn) {
         return -1;
    }
    if(this.mazeCells[nodeToVisitIndexInArray].isRightClosed()) {
         return -1;
    }
    if(this.nodes[nodeToVisitIndexInArray].isVisited) {
        return -1;
    }
     return nodeToVisitIndexInArray;
}



// Node object
function Node() {
    this.isVisited = false;
}

Node.prototype.isVisited = function() {
    return this.isVisited;
}

Node.prototype.markNodeAsVisited = function() {
    this.isVisited = true;
}