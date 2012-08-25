var prog = null;
var model = null;
var gl = null;

function makeModel() {
	var m = new Model();
	var verts = [
		-1,-1,0,
		1,-1,0,
		0,1,0
		];
	m.vattrs.pos = new Float32Array(verts);
	m.indices.push(0,1,2);
	return m;
}
function initShaders() {
	var frag = getShader("shader-fs");
	var vert = getShader("shader-vs");

	prog = gl.createProgram();
	gl.attachShader(prog, vert);
	gl.attachShader(prog, frag);
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		alert("Failed initializing shader program.");
	}
	gl.useProgram(prog);
}

/*
function initDebug() {
	debugElem = document.getElementById('debug');
	debugElem.setAttribute("style", "height:320px; width:600px; overflow:scroll;");
}
function debug(str) {
	debugElem.innerHTML += str+"<br/>";
	debugElem.scrollTop = debugElem.scrollHeight;
}*/

var updateID;
function init() {
	var canvas = document.getElementById('canvas');
	gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	assert(gl, 'gl');
//	initDebug();
	initShaders();
	game.init();
	draw();
	game.start();
	console.log("init done");
}

window.onfocus = function() {
	game.start();
}
window.onblur = function() {
	game.stop();
}
