function BFS(maze) {
    this.maze = maze;
    this.nodes = [];
    this.mazeCells = maze.getMazeCells();
    for(let i = 0; i < this.mazeCells.length; i++) {
        this.nodes.push(new NodeBFS());
    }
}

BFS.prototype.findPath = function() {
    let isMazeSolved = false;
    let hasMoreNodesToVisit = true;
    let queueNodesToVisit = [];    
    let currNodeIndex = 0;
    this.nodes[currNodeIndex].markNodeAsVisited();
    let mazeEndCell = this.maze.getEndCell();
    let endCellIndex;  
    queueNodesToVisit.push(currNodeIndex);

    while(queueNodesToVisit.length > 0 || hasMoreNodesToVisit === true) {
        currNodeIndex = queueNodesToVisit.shift();     
        let unvisitedNeighbors = this.getUnvisitedNeighborsIndexes(currNodeIndex);
        unvisitedNeighbors.forEach(nodeIndex => {
            this.nodes[nodeIndex].markNodeAsVisited();
            this.nodes[nodeIndex].setVisitedFromIndex(currNodeIndex);
            if(this.mazeCells[nodeIndex] === mazeEndCell) {
                hasMoreNodesToVisit = false;
                isMazeSolved = true;
                endCellIndex = nodeIndex;
            } else {
                queueNodesToVisit.push(nodeIndex);
                this.maze.fillCell(this.mazeCells[nodeIndex], 'grey');
            }
          });
    }

    if(isMazeSolved) {
        let isDrawingShortestPath = true;
        let backtrackIndex = this.nodes[endCellIndex].visitedFromIndex;
        let mazeStartCell = this.maze.getStartCell(); 
        while(isDrawingShortestPath){
            if(this.mazeCells[backtrackIndex] === mazeStartCell) {
                isDrawingShortestPath = false;
            } else {
                this.maze.fillCell(this.mazeCells[backtrackIndex], 'yellow');
                backtrackIndex = this.nodes[backtrackIndex].visitedFromIndex;
            }
        }
        alert("Maze solved: yellow dots represent the shortest path. Grey dots represent visited nodes.");
    } else {
        alert("Impossible to solve maze");
    }
}

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
    if(nodeToVisitIndexInArray/numberOfColumns >= numberOfRows) {
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
function NodeBFS() {
    this.isVisited = false;
    this.visitedFromIndex;
}

NodeBFS.prototype.isVisited = function() {
    return this.isVisited;
}

NodeBFS.prototype.markNodeAsVisited = function() {
    this.isVisited = true;
}

NodeBFS.prototype.setVisitedFromIndex = function(index) {
    this.visitedFromIndex = index;
}

Node.prototype.getVisitedFromIndex = function() {
    return this.visitedFromIndex;
}