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
function fixUnits(a, b, dt) {
	if (a==b) return;
	if (!rangesHit(a.pos[1], a.pos[1]+a.height, b.pos[1], b.pos[1]+b.height))
		return;
	var xzdiff = ivsub(xz(b.pos), xz(a.pos));
	var dist = norm(xzdiff);
	var need = a.rad + b.rad;
	if (dist >= need) return;

	var fixAmount = Math.min(10.*dt*(1+1./dist), need-dist);
	var fixSpeed = fixAmount/(a.invMass + b.invMass);
	ivmul(xzdiff, 1./dist);

	setxz(a.pos, ivadd(xz(a.pos), vmul(-a.invMass*fixSpeed, xzdiff)));
	setxz(b.pos, ivadd(xz(b.pos), vmul(b.invMass*fixSpeed, xzdiff)));
//	setxz(a.pos, fixPoint(xz(a.pos), xz(b.pos), a.rad+b.rad));
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
		fixUnits(u, uu, dt);
	}
}
