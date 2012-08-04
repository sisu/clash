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
	var inters = area.getIntersecting(u.pos, Math.sqrt(.25*u.height*u.height + u.rad*u.rad));
//	console.log(inters.length);
	for(var i=0; i<inters.length; ++i) {
		var tri = inters[i];
		if (tri.high < u.pos[1]) continue;
		if (tri.low > u.pos[1]+u.height) continue;
		u.pos[1] = tri.high;
		u.vel[1] = 0.;
		if (u.move[1]) {
			u.vel[1] = 3.;
		}
	}
}
