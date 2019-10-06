function DFS(maze) {
    this.maze = maze;
    this.nodes = [];
    this.mazeCells = maze.getMazeCells();

    for(let i = 0; i < this.mazeCells.length; i++) {
        this.nodes.push(new NodeDFS());
    }
}

DFS.prototype.findPath = function() {
    let mazeEndCell = this.maze.getEndCell();
    let mazeStartCell = this.maze.getStartCell();   
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
        } else if(this.getUpperIndex(currIndex) !== -1 && !this.nodes[currIndex].upNodeVisited) {
            if(this.mazeCells[currIndex] !== mazeStartCell) {
                this.maze.fillCell(this.mazeCells[currIndex], "yellow");
            }            
            this.nodes[currIndex].markUpperNodeVisited();
            backtrackStack.push(this.nodes[currIndex]);
            currIndex = this.getUpperIndex(currIndex);
            this.nodes[currIndex].markBottomNodeVisited();           

        //can look by moving right
        } else if(this.getRightIndex(currIndex) !== -1 && !this.nodes[currIndex].rightNodeVisited) {
            if(this.mazeCells[currIndex] !== mazeStartCell) {
                this.maze.fillCell(this.mazeCells[currIndex], "yellow");
            }  
            this.nodes[currIndex].markRightNodeVisited();
            backtrackStack.push(this.nodes[currIndex]);
            currIndex = this.getRightIndex(currIndex);
            this.nodes[currIndex].markLeftNodeVisited();           
        
        //can look by moving bottom
        } else if(this.getBottomIndex(currIndex) !== -1 && !this.nodes[currIndex].bottomNodeVisited) {
            if(this.mazeCells[currIndex] !== mazeStartCell) {
                this.maze.fillCell(this.mazeCells[currIndex], "yellow");
            }  
            this.nodes[currIndex].markBottomNodeVisited();
            backtrackStack.push(this.nodes[currIndex]);
            currIndex = this.getBottomIndex(currIndex); 
            this.nodes[currIndex].markUpperNodeVisited();           

        //can look by moving left        
        } else if(this.getLeftIndex(currIndex) !== -1 && !this.nodes[currIndex].leftNodeVisited) {
            if(this.mazeCells[currIndex] !== mazeStartCell) {
                this.maze.fillCell(this.mazeCells[currIndex], "yellow");
            }  
            this.nodes[currIndex].markLeftNodeVisited();
            backtrackStack.push(this.nodes[currIndex]);
            currIndex = this.getLeftIndex(currIndex);
            this.nodes[currIndex].markRightNodeVisited();            

        //dead cell reached
        } else if(backtrackStack.length > 0) {
            if(this.mazeCells[currIndex] !== mazeStartCell) {
                this.maze.fillCell(this.mazeCells[currIndex], "grey");
            }  
            let backtrackNode = backtrackStack.pop();
            currIndex = this.nodes.indexOf(backtrackNode);
        
        //Unable to solve the maze
        } else {
            if(this.mazeCells[currIndex] !== mazeStartCell) {
                this.maze.fillCell(this.mazeCells[currIndex], "yellow");
            }  
            morePathsToLookup = false;
        }
    }   

    if(mazeSolved) {
        alert("Maze solved: yellow dots represent the path. Grey dots represent visited nodes.");
    } else {
        alert("Impossible to solve maze");
    }
    
}

DFS.prototype.getUpperIndex = function(currIndex) {
    let nodeToVisitIndexInArray = currIndex - this.maze.getNumberOfMazeColumns();
    if(nodeToVisitIndexInArray < 0) {
         return -1;
     }
     if(this.mazeCells[nodeToVisitIndexInArray].isBottomClosed()) {
         return -1;
     }
     return nodeToVisitIndexInArray;
}

DFS.prototype.getRightIndex = function(currIndex) {
    let nodeToVisitIndexInArray = currIndex + 1;
    if(nodeToVisitIndexInArray >= this.mazeCells.length) {
        return -1;
    }
    let numberOfColumns = this.maze.getNumberOfMazeColumns();
    let currNodeColumn = currIndex % numberOfColumns;
    let nodeToVisitColumn = nodeToVisitIndexInArray % numberOfColumns;
    if(currNodeColumn === nodeToVisitColumn) {
         return -1;
     }
     if(this.mazeCells[nodeToVisitIndexInArray].isLeftClosed()) {
         return -1;
     }
     return nodeToVisitIndexInArray;
}

DFS.prototype.getBottomIndex = function(currIndex) {
    let numberOfColumns = this.maze.getNumberOfMazeColumns();
    let nodeToVisitIndexInArray = currIndex + numberOfColumns; 
    let numberOfRows = this.maze.getNumberOfMazeRows();
    if(nodeToVisitIndexInArray/numberOfColumns >= numberOfRows) {
         return -1;
     }
     if(this.mazeCells[nodeToVisitIndexInArray].isUpperClosed()) {
         return -1;
     }
     return nodeToVisitIndexInArray;
}

DFS.prototype.getLeftIndex = function(currIndex) {
    let nodeToVisitIndexInArray = currIndex - 1;
    if(nodeToVisitIndexInArray < 0) {
        return -1;
    }
    let numberOfColumns = this.maze.getNumberOfMazeColumns();
    let currNodeColumn = currIndex % numberOfColumns;
    let nodeToVisitColumn = nodeToVisitIndexInArray % numberOfColumns;
    if(currNodeColumn === nodeToVisitColumn) {
         return -1;
     }
     if(this.mazeCells[nodeToVisitIndexInArray].isRightClosed()) {
         return -1;
     }
     return nodeToVisitIndexInArray;
}

// Node object
function NodeDFS() {
    this.upNodeVisited = false;
    this.rightNodeVisited = false;
    this.bottomNodeVisited = false;
    this.leftNodeVisited = false;
}

NodeDFS.prototype.markUpperNodeVisited = function() {
    this.upNodeVisited = true;
}

NodeDFS.prototype.markRightNodeVisited = function() {
    this.rightNodeVisited = true;
}

NodeDFS.prototype.markBottomNodeVisited = function() {
    this.bottomNodeVisited = true;
}

NodeDFS.prototype.markLeftNodeVisited = function() {
    this.leftNodeVisited = true;
}