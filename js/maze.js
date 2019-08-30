function Maze(canvasId) {
	this.canvas = document.getElementById(''+canvasId+'');
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.cells = [];
	this.cellWidth = Math.floor(this.width/50);
	this.cellHeight = Math.floor(this.height/50);
}

Maze.prototype.generateMaze = function() {
	for(let col = 0; col < this.width; col += this.cellWidth) {
		for(let row = 0; row < this.height; row += this.cellHeight) {
			let cell = new Cell(col, row, true, true, true, true);
			this.cells.push(cell);
		}
	}
	this.draw();
}

Maze.prototype.draw = function() {
	this.cells.forEach(element => {
		if(element.isLeftWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col, element.row);
			this.ctx.lineTo(element.col, element.row + this.cellHeight);
			this.ctx.stroke();
		}

		if(element.isTopWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col, element.row);
			this.ctx.lineTo(element.col + this.cellWidth, element.row );
			this.ctx.stroke();
		}

		if(element.isRigthWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col + this.cellWidth, element.row);
			this.ctx.lineTo(element.col + this.cellWidth, element.row + this.cellHeight);
			this.ctx.stroke();
		}

		if(element.isBottomWall) {
			this.ctx.beginPath();
			this.ctx.moveTo(element.col, element.row + this.cellHeight);
			this.ctx.lineTo(element.col + this.cellWidth, element.row + this.cellHeight );
			this.ctx.stroke();
		}
	});
}

