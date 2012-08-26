var game = {
	player: new Unit(),
	units: [],
	pressedKeys: [],
	prevTime: new Date().getTime(),
	area: new Area(),
	updateID: null,

	init: function() {
		this.player.model = makeCube();;
		this.area.generate();
		this.player.pos = vec3(0.,1.5,0.);
		this.units.push(this.player);

		for(var i=0; i<6; ++i) {
			var u = new Unit();
			u.model = this.player.model;
			u.pos = vec3(5*Math.cos(4.4*i),4*(1+Math.sin(3.3*i)),5*Math.sin(2.1*i));
			u.ai = new AI(u, this);
			this.units.push(u);
		}
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
			this.stop();
		}
	},
	start: function() {
		if (this.updateID) return;
		this.prevTime = new Date().getTime();
		this.updateID = setInterval(function() {game.update();},30);
	},
	stop: function() {
		clearInterval(this.updateID);
		this.updateID = null;
		stopDraw();
	},
	updateMove: function() {
		var x = !!this.pressedKeys[39] - !!this.pressedKeys[37];
		var z = !!this.pressedKeys[38] - !!this.pressedKeys[40];
		var y = 0+!!this.pressedKeys[32];
		this.player.move = vec3(x, y, z);

		for(var i=0; i<this.units.length; ++i) {
			var u = this.units[i];
			if (u.ai) u.ai.run();
		}
	},
	moveUnits: function(dt) {
		for(var i=0; i<this.units.length; ++i) {
			moveUnit(this.units[i], dt, this.area, this.units);
		}
	}
};
