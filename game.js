var game = {
	player: new Unit(),
	units: [],
	pressedKeys: [],
	prevTime: new Date().getTime(),
	area: new Area(),
	
	init: function() {
		this.player.model = makeCube();;
		this.area.generate();
		this.player.pos = vec3(0.,1.5,0.);
		this.units.push(this.player);
	},
	update: function() {
		try {
		var time = new Date().getTime();
		var dt = (time-this.prevTime)/1000.;
		this.prevTime = time;

		this.updateMove();
		this.moveUnits(dt);
		draw();
		} catch(err) {
			console.log('exception: '+err);
			clearInterval(updateID);
		}
	},
	updateMove: function() {
		var x = !!this.pressedKeys[39] - !!this.pressedKeys[37];
		var z = !!this.pressedKeys[38] - !!this.pressedKeys[40];
		var y = 0+!!this.pressedKeys[32];
		this.player.move = vec3(x, y, z);
	},
	moveUnits: function(dt) {
		for(var i=0; i<this.units.length; ++i) {
			moveUnit(this.units[i], dt, this.area);
		}
//		moveUnit(this.player, dt, this.area);
	}
};
