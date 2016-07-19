function Tileset(url) {
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.onload = function() {
		if(!this.complete)
			throw new Error("No tileset \"" + url + "\".");
		this.referenceDuTileset.largeur = this.width / TILE_SIZE_IMAGE;
	}
	this.image.src = "tilesets/" + url;
}

Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
	var xSourceEnTiles = numero % this.largeur;
	if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
	var ySourceEnTiles = Math.ceil(numero / this.largeur);
	var xSource = (xSourceEnTiles - 1) * TILE_SIZE_IMAGE;
	var ySource = (ySourceEnTiles - 1) * TILE_SIZE_IMAGE;
	context.drawImage(this.image, xSource, ySource, TILE_SIZE_IMAGE, TILE_SIZE_IMAGE, xDestination, yDestination, TILE_SIZE, TILE_SIZE);
}
