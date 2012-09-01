Array.prototype.last = function() {
	return this[this.length - 1];
}
Array.prototype.copy = function() {
	return this.slice(0);
}
Array.prototype.addAll = function(v) {
	for(var i=0; i<v.length; ++i)
		this.push(v[i]);
	return this;
}

function getFile(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
//	return (req.status == 200) ? req.responseText : null;
	return req.responseText;
};

function radians(x) {
	return x*(Math.PI/180.0);
}

function showA(v) {
	if (v.length==undefined) return v;
	var s = '[';
	for(var i=0; i<v.length; ++i) {
		if (i>0) s += ' ';
		s += showA(v[i]);
	}
	s += ']';
	return s;
}

function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
	return 'AssertException: ' + this.message;
}

function assert(exp, message) {
	if (!exp) {
		throw new AssertException(message);
	}
}

function hslrgb(h, s, l) {
	var r, g, b;

	if(s == 0){
		r = g = b = l; // achromatic
	}else{
		function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}

	return [r, g, b];
}
function hsvrgb(h, s, v){
	var r, g, b;

	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch(i % 6){
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}

	return [r, g, b];
}

function rangesHit(a1,a2, b1,b2) {
	return a2>=b1 && b2>=a1;
}
