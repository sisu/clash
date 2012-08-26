function vec3(x,y,z) {
	return [x,y,z];
}
function vec2(x,y) {
	return [x,y];
}
function ivadd(a, b) {
	for(var i=0; i<a.length; ++i) a[i] += b[i];
	return a;
}
function vadd(a, b) {
	return ivadd(a.copy(), b);
}
function ivsub(a, b) {
	for(var i=0; i<a.length; ++i) a[i] -= b[i];
	return a;
}
function vsub(a, b) {
	return ivsub(a.copy(), b);
}
function ivmul(x, a) {
	for(var i=0; i<a.length; ++i) a[i] *= x;
	return a;
}
function vmul(x, a) {
	return ivmul(x, a.copy());
}
function ivneg(a) {
	for(var i=0; i<a.length; ++i) a[i] = -a[i];
	return a;
}
function vneg(a) {
	return ivneg(a.copy());
}

function xz(a) {
	return vec2(a[0],a[2]);
}
function setxz(a, b) {
	a[0]=b[0];
	a[2]=b[1];
}

function dot(a, b) {
	var r=0.0;
	for(var i=0; i<a.length; ++i) r += a[i] * b[i];
	return r;
}
function cross2(a, b) {
	return a[0]*b[1] - a[1]*b[0];
}
function cross(a, b) {
	if (a.length==2) return cross2(a,b);
	return [
		a[1]*b[2] - a[2]*b[1],
		a[2]*b[0] - a[0]*b[2],
		a[0]*b[1] - a[1]*b[0]];
}

function norm2(v) {
	return dot(v,v);
}
function norm(v) {
	return Math.sqrt(norm2(v));
}

function normalize(v) {
	return ivmul(1.0/norm(v), v);
}
function normalized(v) {
	return vmul(1.0/norm(v), v);
}
