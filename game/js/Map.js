function Map(nom) {
	this.tileset = new Tileset(nom);
	this.posPlayer = null;
	this.posBoxes = [];
	this.posTargets = [];
	this.terrain = this.convertXSB(TERRAIN_TEST_2);
}

Map.prototype.dessinerMap = function(context) {
	for(var i = 0; i < GRID_WIDTH; i++) {
		for(var j = 0; j < GRID_HEIGHT; j++) {
			this.tileset.dessinerTile(this.terrain[i][j], context, j * TILE_SIZE, i * TILE_SIZE);
		}
	}
	// targets
	this.posTargets.forEach(function(element) {
    this.tileset.dessinerTile(TILE_TARGET, context, element.x * TILE_SIZE, element.y * TILE_SIZE);
  },  this);
	// boxes
	this.posBoxes.forEach(function(element) {
    this.tileset.dessinerTile(TILE_BOX, context, element.x * TILE_SIZE, element.y * TILE_SIZE);
  },  this);
	// player
	this.tileset.dessinerTile(TILE_MAN, context, this.posPlayer.x * TILE_SIZE, this.posPlayer.y * TILE_SIZE);
};

// ToDo
Map.prototype.convertXSB = function(xsbTerrain) {
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
