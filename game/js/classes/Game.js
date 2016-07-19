function Game() {
	this.map = new Map(TILESET_FILE, this);
	this.posPlayer = null;
	this.posBoxes = [];
	this.posTargets = [];
	this.terrain = this.openXSB(TERRAIN_TEST_2);
}

// ToDo
Game.prototype.openXSB = function(xsbTerrain) {
	var ptrStr = 0;
	var isLineEnded = false;
	var lengthStr = xsbTerrain.length;
	var terrainTmp = new Array(GRID_WIDTH);

	for(var i = 0; i < GRID_WIDTH; i++) {
		terrainTmp[i] = new Array(GRID_HEIGHT);
		for(var j = 0; j < GRID_HEIGHT; j++) {
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
						this.posPlayer = {x: i, y: j};
						break;
					case '$' :
						terrainTmp[i][j] = TILE_FLOOR;
						this.posBoxes.push({x: i, y: j});
						break;
					case '.' :
						terrainTmp[i][j] = TILE_FLOOR;
						this.posTargets.push({x: i, y: j});
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
