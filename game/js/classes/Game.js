function Game() {
	this.context = null;
	this.map = new Map(TILESET_FILE, this);
	this.terrain = this.openXSB(TERRAIN_TEST_2);
	this.posPlayer = this.getPosPlayer();

	var that = this;
	window.addEventListener('keydown', function(e) {
		that.handleKeyDown(e);
	});
}

Game.prototype.handleKeyDown = function(e) {
	var dx, dy;
	if(e.keyCode == KEY_LEFT) {
		dx = -1;
		dy = 0;
	} else if(e.keyCode == KEY_RIGHT) {
		dx = 1;
		dy = 0;
	} else if(e.keyCode == KEY_UP) {
		dx = 0;
		dy = -1;
	} else if(e.keyCode == KEY_DOWN) {
		dx = 0;
		dy = 1;
	} else {
		return;
	}
	this.handleMovement(dx, dy);
};

Game.prototype.handleMovement = function(dx, dy) {
	var nextCell = this.terrain[this.posPlayer.y + dy][this.posPlayer.x + dx];
	if (nextCell == "#") // wall
		return;

	var cell = this.terrain[this.posPlayer.y][this.posPlayer.x];
	if (nextCell == "$" || nextCell == "*") {
		var nextNextCell = this.terrain[this.posPlayer.y + 2 * dy][this.posPlayer.x + 2 * dx];
		if (nextNextCell == "#" || nextNextCell == "$" || nextNextCell == "*") // wall or box or box on goal or
			return;

		// handle nextNextCell state
		this.terrain[this.posPlayer.y + 2 * dy][this.posPlayer.x + 2 * dx] = (nextNextCell != ".") ? "$" : "*";
		
		// check for victory
		if (this.isWinner()) {
			console.log("win");
		}
	}
	this.terrain[this.posPlayer.y][this.posPlayer.x] = (cell != "+") ? " " : ".";
	this.terrain[this.posPlayer.y + dy][this.posPlayer.x + dx] = (nextCell != "." && nextCell != "*") ? "@" : "+";
	
	this.posPlayer.x += dx;
	this.posPlayer.y += dy;

	if ((nextCell == "$" || nextCell == "*") && this.isWinner()) {
		console.log("win");
	}
		
	// ToDo move & improve that
	this.map.drawMap(this.context);
};

Game.prototype.isWinner = function() {
	for(var i = 0; i < GRID_HEIGHT; i++) {
		for(var j = 0; j < GRID_WIDTH; j++) {
			if (this.terrain[i][j] == "$") {
				return 0;	
			}
		}
	}
	return 1;
};

Game.prototype.openXSB = function(xsbTerrain) {
	var ptrStr = 0;
	var isLineEnded = false;
	var lengthStr = xsbTerrain.length;
	var terrainTmp = new Array(GRID_HEIGHT);

	for(var i = 0; i < GRID_HEIGHT; i++) {
		terrainTmp[i] = new Array(GRID_WIDTH);
		for(var j = 0; j < GRID_WIDTH; j++) {
			if (ptrStr < lengthStr && !isLineEnded) {
				switch (xsbTerrain[ptrStr]) {
					case '#': case '@': case '+':
					case '$': case '*': case '.':
						terrainTmp[i][j] = xsbTerrain[ptrStr];
						break;
					case '|':
						terrainTmp[i][j] = "o";
						isLineEnded = true;
						break;
					default:
						terrainTmp[i][j] = " ";
						break;
				}
				ptrStr++;
			}
			else {
				terrainTmp[i][j] = "o";
			}
		}
		isLineEnded = false;
	}
	return terrainTmp;
};

Game.prototype.getPosPlayer = function() {
	for(var i = 0; i < GRID_HEIGHT; i++) {
		for(var j = 0; j < GRID_WIDTH; j++) {
			if (this.terrain[i][j] == "@" || this.terrain[i][j] == "+")
				return {x: j, y: i};
		}
	}
};