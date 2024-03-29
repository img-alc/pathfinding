function Cell (col, row, isLeftWall, isTopWall, isRigthWall, isBottomWall) {
    this.col = col;
    this.row = row;
    this.isLeftWall = isLeftWall;
    this.isTopWall = isTopWall;
    this.isRightWall = isRigthWall;
    this.isBottomWall = isBottomWall;
}

Cell.prototype.isOpen = function() {
    return this.isLeftWall == false || this.isTopWall == false || this.isRigthWall == false || this.isBottomWall == false;
}

Cell.prototype.isBottomClosed = function() {
    return this.isBottomWall;
}

Cell.prototype.isRightClosed = function() {
    return this.isRightWall;
}

Cell.prototype.isUpperClosed = function() {
    return this.isTopWall;
}

Cell.prototype.isLeftClosed = function() {
    return this.isLeftWall;
}