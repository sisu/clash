function fixPoint(a, pt, rad) {
	var dir = vsub(a, pt);
	var dist = norm(dir);
//	console.log('fixpoint '+a+' ; '+pt+' ; '+rad+' ; '+dir+' ; '+dist);
	if (dist >= rad) {
//		console.log(dist+' '+rad+' '+(dist>=rad));
		return a;
	}
//	console.log('fixing');
	return vadd(pt, ivmul(rad/norm(dir), dir));
}
function moveUnit(u, dt, area, units) {
	var pvel = u.vel;
	var prevVY = u.vel[1];
	var prevY = u.pos[1];
	var movexz = ivmul(1.5, vec3(u.move[0], 0., u.move[2]));
	u.vel = vmul(u.speed, movexz);
	u.pos = vadd(u.pos, vmul(.5*dt, vadd(pvel, u.vel)));

	var fallA = -20.;
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
				u.vel[1] = 10.;
			}
		} else if (prevY+u.height <= tri.low) {
			u.pos[1] = tri.low-u.height;
			if (u.vel[1]>0)
				u.vel[1] = -.5 * u.vel[1];
		} else {
			var posxz = xz(u.pos);
			// FIXME: thin walls
			for(var j=0; j<tri.pts.length; ++j) {
				var jj = (j+1)%tri.pts.length;
//				console.log('trying '+tri.pts[j]+' - '+tri.pts[jj]+' ; '+posxz);
				// FIXME: push only to outside
				var pt = segClosestPoint(tri.pts[j], tri.pts[jj], posxz);
				assert(isFinite(pt[0]), pt);
				posxz = fixPoint(posxz, pt, u.rad);
//				console.log('ok '+posxz);
			}
//			assert(0,'zxc');
			setxz(u.pos, posxz);
		}
	}

	for(var i=0; i<units.length; ++i) {
		var uu = units[i];
		if (uu==u) continue;
		var ydiff = u.pos[1] - uu.pos[1];
		if (Math.abs(ydiff) >= .5*(u.height+uu.height))
			continue;
		setxz(u.pos, fixPoint(xz(u.pos), xz(uu.pos), u.rad+uu.rad));
	}
}
