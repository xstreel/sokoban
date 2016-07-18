function Map(nom) {

	this.tileset = new Tileset(nom);
	//var testTerrain = "#####|#@$.#|#####";
	var testTerrain = "#######|#.@ # #|#$* $ #|#   $ #|# ..  #|#  *  #|#######";
	this.terrain = convertXSB(testTerrain);

	Map.prototype.dessinerMap = function(context) {
		for(var i = 0; i < GRID_WIDTH; i++) {
			for(var j = 0; j < GRID_HEIGHT; j++) {
				this.tileset.dessinerTile(this.terrain[i][j], context, j * 32, i * 32);
			}
		}
	};
	
	// ToDo
	function convertXSB(xsbTerrain) {
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
							terrainTmp[i][j] = 367;
							break;
						case '|' :
							terrainTmp[i][j] = 1;
							isLineEnded = true;
							break;
							/*
						case '@' :
							terrainTmp[i][j] = 0;
							break;
						case '$' :
							terrainTmp[i][j] = 0;
							break;
						case '.' :
							terrainTmp[i][j] = 0;
							break;
							*/
							default:
								terrainTmp[i][j] = 42;
							break;
					}
					ptrStr++;
				}
				else {
					terrainTmp[i][j] = 1;
				}
			}
			isLineEnded = false;
		}
		return terrainTmp;
		console.log(terrainTmp);
	};
}

