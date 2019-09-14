function Maze(canvasId) {
	this.canvas = document.getElementById(''+canvasId+'');
	this.ctx = this.canvas.getContext('2d');
	this.width = 500;//this.canvas.width;
	this.height = 500;//this.canvas.height;
	this.cells = [];
	this.cellWidth = 10;//Math.floor(this.width/50);
	this.cellHeight = 10;//Math.floor(this.height/50);
	this.start;
	this.end;
}

Maze.prototype.generateMaze = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
	for(let row = 0; row < this.height; row += this.cellHeight) {
		for(let col = 0; col < this.width; col += this.cellWidth) {
			let cell = new Cell(col, row, true, true, true, true);
			this.cells.push(cell);
		}
	}
	this.openWalls();
	this.drawMaze();
	this.start = this.cells[0];
	this.end = this.getEndOfMaze();
	this.fillCell(this.end, "blue");
	this.fillCell(this.start, "grey");
}

Maze.prototype.openWalls = function() {
	//start at the top cell
	let currCell = this.cells[0];
	let backtrackArray = [];
	backtrackArray.push(currCell);
	let neighboursToVisit = true;

	while(neighboursToVisit) {
		let neighboursArray = this.getUnvisitedCellNeighbours(currCell);
		if(neighboursArray.length > 0) {
			//select random neighbour
			let randomNeighbour = neighboursArray[Math.floor(Math.random() * neighboursArray.length)];
			backtrackArray.push(randomNeighbour);
			this.OpenWallBetweenCells(currCell, randomNeighbour);
			currCell = randomNeighbour;			

		} else if(backtrackArray.length > 0){
			currCell = backtrackArray.pop();
		} else {
			neighboursToVisit = false;
		}
	}
	//open maze start
	this.cells[0].isLeftWall = false;
}

Maze.prototype.getUnvisitedCellNeighbours = function(cell) {
	let neighbours = [];

	//upper
	if(cell.row-this.cellHeight >=0) {
		if(!this.cells[(cell.row-this.cellHeight)/this.cellWidth * (this.width/this.cellWidth) + (cell.col/this.cellWidth)].isOpen()) {
			neighbours.push(this.cells[(cell.row-this.cellHeight)/this.cellWidth * (this.width/this.cellWidth) + (cell.col/this.cellWidth)]);
		}
	}
	//left
	if(cell.col-this.cellWidth >=0 ) {
		if(!this.cells[(cell.row/this.cellWidth) * (this.width/this.cellWidth) + (cell.col- this.cellWidth)/this.cellWidth].isOpen()) {
			neighbours.push(this.cells[(cell.row/this.cellWidth) * (this.width/this.cellWidth) + (cell.col- this.cellWidth)/this.cellWidth]);
		}
	}
	//lower
	if(cell.row+this.cellHeight < this.height) {
		if(!this.cells[(cell.row + this.cellHeight)/this.cellWidth * (this.width/this.cellWidth) + (cell.col/this.cellWidth)].isOpen()) {
			neighbours.push(this.cells[(cell.row + this.cellHeight)/this.cellWidth * (this.width/this.cellWidth) + (cell.col/this.cellWidth)]);
		}
	}
	//rigth
	if(cell.col+this.cellWidth < this.width) {
		if(!this.cells[(cell.row/this.cellWidth) * (this.width/this.cellWidth) + (cell.col + this.cellWidth)/this.cellWidth].isOpen()) {
			neighbours.push(this.cells[(cell.row/this.cellWidth) * (this.width/this.cellWidth) + (cell.col + this.cellWidth)/this.cellWidth]);
		}
	}

	return neighbours;
}

Maze.prototype.OpenWallBetweenCells = function(currCell, selectedNeighbour) {
	if(currCell.row > selectedNeighbour.row && currCell.col == selectedNeighbour.col) {
		currCell.isTopWall = false;
		selectedNeighbour.isBottomWall = false;
	}
	if(currCell.row == selectedNeighbour.row && currCell.col < selectedNeighbour.col) {
		currCell.isRightWall = false;
		selectedNeighbour.isLeftWall = false;
	}
	if(currCell.row < selectedNeighbour.row && currCell.col == selectedNeighbour.col) {
		currCell.isBottomWall = false;
		selectedNeighbour.isTopWall = false;
	}
	if(currCell.row == selectedNeighbour.row && currCell.col > selectedNeighbour.col) {
		currCell.isLeftWall = false;
		selectedNeighbour.isRightWall = false;
	}
}

Maze.prototype.drawMaze = function() {
	this.cells.forEach(element => {
		if(element.isLeftWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col, element.row);
			this.ctx.lineTo(element.col, element.row + this.cellHeight);
			this.ctx.lineWidth = 1; 
			this.ctx.stroke();
		}

		if(element.isTopWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col, element.row);
			this.ctx.lineTo(element.col + this.cellWidth, element.row );
			this.ctx.lineWidth = 1;
			this.ctx.stroke();
		}

		if(element.isRightWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col + this.cellWidth, element.row);
			this.ctx.lineTo(element.col + this.cellWidth, element.row + this.cellHeight);
			this.ctx.lineWidth = 1;
			this.ctx.stroke();
		}

		if(element.isBottomWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col, element.row + this.cellHeight);
			this.ctx.lineTo(element.col + this.cellWidth, element.row + this.cellHeight );
			this.ctx.lineWidth = 1;
			this.ctx.stroke();
		}
	});
}

Maze.prototype.getEndOfMaze = function() {
	return this.cells[Math.floor(Math.random() * ((this.cells.length - 1) - (this.cells.length/2)) + this.cells.length/2)];
}

Maze.prototype.fillCell = function(cell, color) {	
	this.ctx.beginPath();
	this.ctx.rect(cell.row, cell.col, this.cellWidth, this.cellHeight);
	this.ctx.fillStyle = color;
	this.ctx.fill();
}


