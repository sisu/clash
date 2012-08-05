function moveUnit(u, dt, area) {
	var pvel = u.vel;
	var prevVY = u.vel[1];
	var prevY = u.pos[1];
	var movexz = vec3(u.move[0], 0., u.move[2]);
	u.vel = vmul(u.speed, movexz);
	u.pos = vadd(u.pos, vmul(.5*dt, vadd(pvel, u.vel)));

	var fallA = -6.;
	u.pos[1] += dt * (prevVY + .5 * dt * fallA);
	u.vel[1] = prevVY + dt * fallA;
//	console.log('update pl '+u.pos.y+' '+dt+' '+u.vel.y+' '+prevVY);

	var midpos = u.pos.copy();
	midpos[1] += .5*u.height;
	var inters = area.getIntersectingCone(u.pos, u.rad, u.height);
//	console.log(inters.length);
	for(var i=0; i<inters.length; ++i) {
		var tri = inters[i];
		if (prevY >= tri.high-1e-6) {
			u.pos[1] = tri.high;
			u.vel[1] = 0.;
			if (u.move[1]) {
				u.vel[1] = 3.;
			}
		} else if (prevY+u.height <= tri.low) {
			u.pos[1] = tri.low-u.height;
			u.vel[1] = 0.;
		} else {
		}
	}
}
