function Tileset(url) {
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
		this.referenceDuTileset.largeur = (this.width + 5) / (32 + 5);
	}
	this.image.src = "tilesets/" + url;
	
	Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
		var xSourceEnTiles = numero % this.largeur;
		if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
		var ySourceEnTiles = Math.ceil(numero / this.largeur);
		var xSource = (xSourceEnTiles - 1) * 37;
		var ySource = (ySourceEnTiles - 1) * 37;
		context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
	}
}

