function Map(nom, game) {
	this.tileset = new Tileset(nom);
	this.game = game;
}

Map.prototype.drawMap = function(context) {
	for(var i = 0; i < GRID_WIDTH; i++) {
		for(var j = 0; j < GRID_HEIGHT; j++) {
			this.tileset.dessinerTile(this.game.terrain[i][j], context, j * TILE_SIZE, i * TILE_SIZE);
		}
	}
	// targets
	this.game.posTargets.forEach(function(element) {
    this.tileset.dessinerTile(TILE_TARGET, context, element.x * TILE_SIZE, element.y * TILE_SIZE);
  },  this);
	// boxes
	this.game.posBoxes.forEach(function(element) {
    this.tileset.dessinerTile(TILE_BOX, context, element.x * TILE_SIZE, element.y * TILE_SIZE);
  },  this);
	// player
	this.tileset.dessinerTile(TILE_MAN, context, this.game.posPlayer.x * TILE_SIZE, this.game.posPlayer.y * TILE_SIZE);
};
