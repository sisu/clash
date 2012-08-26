function AI(unit, game) {
	this.unit = unit;
	this.game = game;
}
AI.prototype.run = function() {
	var ppos = this.game.player.pos;
	var move = normalize(xz(vsub(ppos, this.unit.pos)));
	this.unit.move = ivmul(.5, vec3(move[0],0.,move[1]));
}
