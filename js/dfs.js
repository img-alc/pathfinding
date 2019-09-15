function DFS(maze) {
    this.maze = maze;
    this.nodes = [];
    this.mazeCells = maze.getMazeCells();
    for(let i = 0; i < mazeCells.length; i++) {
        this.nodes.push(new Node());
    }
}

DFS.prototype.findPath = function() {
    let mazeStartCell = this.maze.getStartCell();
    let mazeEndCell = this.getEndCell(); 
  
    let mazeSolved = false;
    let morePathsToLookup = true;
    let currIndex = 0;
    let backtrackStack = [];

    while(morePathsToLookup) {
        //found end of maze
        if(this.mazeCells[currIndex] === mazeEndCell) {
            mazeSolved = true;
            morePathsToLookup = false;
        //can look by moving up
        } else if(this.canLookupUp(currIndex, maze.getNumberOfMazeColumns())) {
            this.nodes[currIndex].markUpperNodeVisited();
            backtrackStack.push(this.nodes[currIndex]);
            currIndex = this.getArrayNeighbourIndex(currIndex, "up");

        //can look by moving right
        } else if(this.canLookupRight()) {
            this.nodes[currIndex].markRightNodeVisited();
            backtrackStack.push(this.nodes[currIndex]);
            currIndex = this.getArrayNeighbourIndex(currIndex, "right");
        //can look by moving bottom
        } else if(this.canLookupBottom()) {
        //can look by moving left        
        } else if(this.canLookupLeft()) {
        //dead cell reached
        } else if(backtrackStack.length > 0) {
        //Unable to solve the maze
        } else {
            morePathsToLookup = false
        }
    }
}

DFS.prototype.canLookupUp = function(currIndex, numberOfMazeColumns) {
    let nodeToVisitIndexInArray = getArrayNeighbourIndex(currIndex, up); 
    if(nodeToVisitIndexInArray < 0) {
         return false;
     }
     if(this.mazeCells[nodeToVisitIndexInArray].upperCell.isBottomClosed()) {
         return false;
     }
     return true;
}

//TODO
DFS.prototype.canLookupRight = function(currIndex, numberOfMazeColumns) {
    let nodeToVisitIndexInArray = getArrayNeighbourIndex(currIndex, up); 
    if(nodeToVisitIndexInArray < 0) {
         return false;
     }
     if(this.mazeCells[nodeToVisitIndexInArray].upperCell.isBottomClosed()) {
         return false;
     }
     return true;
}

DFS.prototype.getArrayNeighbourIndex = function(currIndex, neighbourPosition) {
    let index;
    switch(neighbourPosition) {
        case "up":
            index = currIndex - this.maze.getNumberOfMazeColumns();
            break;
        //TODO
        case "right":
            index = 0;
            break;
        default:
            index = -1;
            break;
    }
    return index;
}

function Node() {
    this.upNodeVisited = false;
    this.rightNodeVisited = false;
    this.bottomNodeVisited = false;
    this.leftNodeVisited = false;
}

Node.prototype.markUpperNodeVisited = function() {
    this.upNodeVisited = true;
}

Node.prototype.markRightNodeVisited = function() {
    this.rightNodeVisited = true;
}