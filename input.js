function keydown(e) {
	game.pressedKeys[e.keyCode] = true;
}
function keyup(e) {
	game.pressedKeys[e.keyCode] = false;
}

document.onkeydown = keydown;
document.onkeyup = keyup;
