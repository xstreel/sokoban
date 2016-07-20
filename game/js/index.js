var game = new Game();

window.onload = function() {
	var canvas = document.getElementById('gameCanvas');
	var ctx = canvas.getContext('2d');

	canvas.width = GRID_WIDTH * 32;
	canvas.height = GRID_HEIGHT * 32;
	
	this.game.context = ctx;
	game.map.drawMap(ctx);
}
