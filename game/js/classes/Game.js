function Game() {
	this.context = null;
	this.map = new Map(TILESET_FILE, this);
	this.posPlayer = null;
	this.posBoxes = [];
	this.posTargets = [];
	this.terrain = this.openXSB(TERRAIN_TEST_2);
	
	var that = this;
	window.addEventListener('keydown', function(e) {
		that.handleKeyDown(e);
	});
	//this.map.drawMap(this.context);
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
	} else {
		dx = 0;
		dy = 1;
	}
	var nextCell = this.terrain[this.posPlayer.y + dy][this.posPlayer.x + dx];
	if (nextCell == TILE_WALL)
		return;
	
	var stop = false;
	this.posBoxes.forEach(function(element) {
		// push a box ?
		if (this.posPlayer.x + dx == element.x && this.posPlayer.y + dy == element.y) {
			var nextNextCell = this.terrain[this.posPlayer.y + 2 * dy][this.posPlayer.x + 2 * dx];
			if(nextNextCell == TILE_WALL)
				stop = true;
			
		}
	},  this);
	if (stop)
		return;
	
	this.posPlayer.x += dx;
	this.posPlayer.y += dy;
	this.map.drawMap(this.context);
};

// ToDo
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
					case '#' :
						terrainTmp[i][j] = TILE_WALL;
						break;
					case '|' :
						terrainTmp[i][j] = TILE_OUT;
						isLineEnded = true;
						break;
					case '@' :
						terrainTmp[i][j] = TILE_FLOOR;
						this.posPlayer = {x: j, y: i};
						break;
					case '$' :
						terrainTmp[i][j] = TILE_FLOOR;
						this.posBoxes.push({x: j, y: i});
						break;
					case '.' :
						terrainTmp[i][j] = TILE_FLOOR;
						this.posTargets.push({x: j, y: i});
						break;
					default:
						terrainTmp[i][j] = TILE_FLOOR;
						break;
				}
				ptrStr++;
			}
			else {
				terrainTmp[i][j] = TILE_OUT;
			}
		}
		isLineEnded = false;
	}
	return terrainTmp;
	console.log(terrainTmp);
};
