function makeCube(x, y, z) {
	var m = new Model();
	var verts = [
		-1,-1,-1,
		1,-1,-1,
		1,1,-1,
		-1,1,-1,
		-1,-1,1,
		1,-1,1,
		1,1,1,
		-1,1,1];
	m.vattrs.pos = new Float32Array(verts);
	m.vattrs.normal = new Float32Array(verts);
	var quads = [
		[0,1,2,3],
		[4,5,6,7],
		[0,1,5,4],
		[2,3,7,6],
		[0,3,7,4],
		[1,5,6,2]];
	for(var i=0; i<quads.length; ++i) {
		var q = quads[i];
		m.indices.push(q[0],q[1],q[2],q[0],q[2],q[3]);
	}
	m.load();
	return m;
}
