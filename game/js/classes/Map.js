function Map(nom, game) {
	this.tileset = new Tileset(nom);
	this.game = game;
}

Map.prototype.drawMap = function() {

	// background
	var tileConvert = {};
	tileConvert["#"] = TILE_WALL;
	tileConvert["@"] = TILE_FLOOR;
	tileConvert["+"] = TILE_FLOOR;
	tileConvert["$"] = TILE_FLOOR;
	tileConvert["*"] = TILE_FLOOR;
	tileConvert["."] = TILE_FLOOR;
	tileConvert[" "] = TILE_FLOOR;
	tileConvert["o"] = TILE_OUT;

	for(var i = 0; i < GRID_WIDTH; i++) {
		for(var j = 0; j < GRID_HEIGHT; j++) {
			var tile = this.game.terrain[i][j];
			this.tileset.dessinerTile(tileConvert[tile], this.game.context, j * TILE_SIZE, i * TILE_SIZE);

			if (tile == "+" || tile == ".") {
				this.tileset.dessinerTile(TILE_TARGET, this.game.context, j * TILE_SIZE, i * TILE_SIZE);
			}
			if (tile == "@" || tile == "+") {
				this.tileset.dessinerTile(TILE_MAN, this.game.context, j * TILE_SIZE, i * TILE_SIZE);
			}
			else if (tile == "$") {
				this.tileset.dessinerTile(TILE_BOX, this.game.context, j * TILE_SIZE, i * TILE_SIZE);
			}
			else if (tile == "*") {
				this.tileset.dessinerTile(TILE_BOX_CORRECT, this.game.context, j * TILE_SIZE, i * TILE_SIZE);
			}
		}
	}
};
