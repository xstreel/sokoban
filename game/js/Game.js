var map = new Map("sprites.png");

window.onload = function() {
	var canvas = document.getElementById('gameCanvas');
	var ctx = canvas.getContext('2d');

	canvas.width = GRID_WIDTH * 32;
	canvas.height = GRID_HEIGHT * 32;

	map.dessinerMap(ctx);
}
