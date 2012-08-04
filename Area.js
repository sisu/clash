function ATriangle(a, b, c, low, high) {
	this.pts = [a,b,c];
	this.low = low;
	this.high = high;
}
function APolygon() {
	this.pts = [];
	this.low = 0.;
	this.high = 0.;
}

function Area() {
	this.triangles = [];
	this.polygons = [];
	this.model = null;
}
Area.prototype.generate = function() {
	function makePoly(n, diry, mid) {
		if (!mid) mid = vec2(0,0);
		var p = new APolygon();
		var dirx = [diry[1],-diry[0]];
		for(var i=0; i<n; ++i) {
			var fi = 2*Math.PI*i/n;
			var ci = Math.cos(fi), si = Math.sin(fi);
			var v = ivadd(vmul(ci, dirx), vmul(si, diry));
			p.pts.push(ivadd(v, mid));
		}
		return p;
	}
	var base = makePoly(8, vec2(0,100));
	base.low = -100.;
	base.high = 0.;
	this.polygons.push(base);

	var pts = [[10,10], [-10,10], [-10,-10], [10,-10]];
	for(var i=0; i<pts.length; ++i) {
		var p = makePoly(6, vec2(0,5), pts[i]);
		p.low = 1;
		p.high = 2.;
		this.polygons.push(p);
	}

	this.genTriangles();
	this.makeModel();
}
Area.prototype.genTriangles = function() {
	for(var i=0; i<this.polygons.length; ++i) {
		var p = this.polygons[i];
		for(var j=2; j<p.pts.length; ++j) {
			var t = new ATriangle(p.pts[0], p.pts[j-1], p.pts[j], p.low, p.high);
			this.triangles.push(t);
			console.log('triangle '+showA(t.pts));
		}
	}
}
Area.prototype.makeModel = function() {
	var verts = [];
	var indices = [];
	var normals = [];
	var colors = [];
	for(var i=0; i<this.polygons.length; ++i) {
		function addAll(pts, h, up) {
			var n0 = verts.length/3;
			for(var j=0; j<pts.length; ++j) {
				var v = p.pts[j];
				var n = verts.length/3;
				verts.push(v[0], h, v[1]);
				normals.push(0.,up,0.);
				colors.addAll(hsvrgb(1.*j/pts.length, 1, 1));
				if (j>1) {
					indices.push(n0);
					indices.push(n-1);
					indices.push(n);
				}
			}
		}
		var p = this.polygons[i];
		console.log('making model of poly '+p.low+' '+p.high);
		addAll(p.pts, p.low, -1.);
		addAll(p.pts, p.high, 1.);
	}

	this.model = new Model();
	this.model.vattrs.pos = new Float32Array(verts);
	this.model.vattrs.normal = new Float32Array(normals);
	this.model.vattrs.color = new Float32Array(colors);
	this.model.indices = indices;

	this.model.load();
}
Area.prototype.getIntersecting = function(pos, rad) {
	var pos2 = xz(pos);
	var y = pos[1];
	function intersect(t) {
		if (y+rad < t.low) return false;
		if (y-rad > t.high) return false;
//		console.log('height ok');
		for(var i=0; i<t.pts.length; ++i) {
			var a = t.pts[i];
			var b = t.pts[(i+1)%t.pts.length];
			// XXX: breaks for non-triangles
			if (cross(vsub(b,a), vsub(pos2,a)) > 0) {
				var dist2 = pointSegDist(a, b, pos2);
				assert(isFinite(dist2), 'dist2');
				var disth = y<t.low ? t.low-y : y>t.high ? t.high-y : 0;
//				console.log('not inside '+a+' '+b+' ; '+dist2+' '+disth);
				var dist = Math.sqrt(dist2*dist2 + disth*disth);
				return dist <= rad;
			}
		}
		return true;
	}
//	console.log('testing for '+this.triangles.length);
	var res = [];
	for(var i=0; i<this.triangles.length; ++i) {
		var t = this.triangles[i];
		if (intersect(t)) res.push(t);
	}
	return res;
}
