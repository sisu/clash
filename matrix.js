function sizeM(m) {
	return Math.floor(Math.sqrt(m.length));
}
function mmmult(a, b) {
	var n = sizeM(a);
	var r = a.copy();
	for(var i=0; i<n; ++i) {
		for(var j=0; j<n; ++j) {
			var x=0.0;
			for(var k=0; k<n; ++k)
				x += a[n*k+j] * b[n*i+k];
			r[n*i+j] = x;
		}
	}
	return r;
}
function mult() {
	var r = arguments[0];
	for(var i=1; i<arguments.length; ++i) {
		r = mmmult(r, arguments[i]);
	}
	return r;
}
function mvmult(m, v) {
	var n = v.length;
	var r = v.copy();
	for(var i=0; i<n; ++i) {
		var x=0;
		for(var j=0; j<n; ++j) x += m[n*j+i] * v[j];
		r[i] = x;
	}
	return r;
}

function zeroM(n) {
	var r = [];
	r.length = n*n;
	for(var i=0; i<n*n; ++i) r[i]=0.0;
	return r;
}
function identityM(n) {
	var r = zeroM(n);
	for(var i=0; i<n; ++i) r[n*i+i]=1.0;
	return r;
}
function rotateX(r) {
	var ca = Math.cos(r), sa = Math.sin(r);
	return [
		1.,0.,0.,
		0.,ca,sa,
		0.,-sa,ca];
}
function rotateY(r) {
	var ca = Math.cos(r), sa = Math.sin(r);
	return [
		ca,0.0,-sa,
		0.,1.,0.,
		sa,0.,ca];
}
function rotateZ(r) {
	var ca = Math.cos(r), sa = Math.sin(r);
	return [
		ca,sa,0.,
		-sa,ca,0.,
		0.,0.,1.];
}

function translateM(v) {
	var x=v[0], y=v[1], z=v[2];
	var r = identityM(4);
	r[12] = x;
	r[13] = y;
	r[14] = z;
	return r;
}
function scaleM(v) {
	var r = zeroM(4);
	for(var i=0; i<3; ++i)
		r[4*i+i] = v[i];
	r[4*3+3] = 1.;
	return r;
}

function perspectiveM(fovy, aspect, zNear, zFar) {
	var f = 1.0 / Math.tan(fovy / 2.0);
	return [f/aspect,0,0,0,
		0,f,0,0,
		0,0,(zFar+zNear)/(zNear-zFar),-1,
		0,0,(2*zFar*zNear)/(zNear-zFar),0];
}

function resizeM(m,s) {
	var r = identityM(s);
	var n = sizeM(m);
	var c = Math.min(s,n);
	for(var i=0; i<c; ++i)
		for(var j=0; j<c; ++j)
			r[s*i+j] = m[n*i+j];
	return r;
}

function transpose(m) {
	var n = sizeM(m);
	for(var i=0; i<n; ++i) {
		for(var j=0; j<n; ++j) {
			var t = m[n*i+j];
			m[n*i+j] = m[n*j+i];
			m[n*j+i] = t;
		}
	}
	return m;
}
