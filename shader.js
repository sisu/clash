function getShader(id) {
	var script = document.getElementById(id);

	var type;
	if (script.type == "x-shader/x-fragment")
		type = gl.FRAGMENT_SHADER;
	else if (script.type == "x-shader/x-vertex")
		type = gl.VERTEX_SHADER;
	else alert("unknown shader type: "+script.type);
	
	var shader = gl.createShader(type);
	console.log("loading shader "+id);
	gl.shaderSource(shader, script.innerHTML);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("Compiling shader "+id+" failed: "+gl.getShaderInfoLog(shader));
		throw 5;
	}
	return shader;
}
