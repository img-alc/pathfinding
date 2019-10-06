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
    let stackNodesVisited = [];
    let currNodeIndex = 0;
    this.nodes[currNodeIndex].markNodeAsVisited();
    let mazeEndCell = this.maze.getEndCell();  
    let mazeStartCell = this.maze.getStartCell(); 

    while(hasMoreNodesToVisit) {
        this.nodes[currNodeIndex].markNodeAsVisited();
        stackNodesVisited.push(currNodeIndex); 
        if(this.mazeCells[currNodeIndex] === mazeEndCell) {
            hasMoreNodesToVisit = false;
            isMazeSolved = true;
        } else {
            let unvisitedNeighbors = this.getUnvisitedNeighborsIndexes(currNodeIndex);
            if(unvisitedNeighbors.length === 0 && queueNodesToVisit.length > 0) {
                currNodeIndex = queueNodesToVisit.shift();                
            } else if(unvisitedNeighbors.length === 0 && queueNodesToVisit.length === 0) {
                hasMoreNodesToVisit = false;
            } else {
                unvisitedNeighbors.forEach(neighbor => {
                    queueNodesToVisit.push(neighbor);
                    if(this.mazeCells[neighbor] !== mazeEndCell) {
                        this.maze.fillCell(this.mazeCells[neighbor], 'grey');
                    }                    
                });
                currNodeIndex = queueNodesToVisit.shift();          
            }
        }        
    }

    if(isMazeSolved) {
        stackNodesVisited.forEach(visited => {
            if(this.mazeCells[visited] !== mazeStartCell && this.mazeCells[visited] !== mazeEndCell){
                this.maze.fillCell(this.mazeCells[visited], 'yellow');
            }            
        });
        alert("Maze solved: yellow dots represent visited nodes, grey dots show nodes that were queued for visit.");
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
}

NodeBFS.prototype.isVisited = function() {
    return this.isVisited;
}

NodeBFS.prototype.markNodeAsVisited = function() {
    this.isVisited = true;
}