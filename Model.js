function Model() {
	this.vbuf = new Buffer(gl.ARRAY_BUFFER);
	this.ibuf = new Buffer(gl.ELEMENT_ARRAY_BUFFER);
	this.vattrs = {}
	this.indices = [];
}
Model.prototype.bind = function(prog) {
	this.vbuf.bind(prog);
	this.ibuf.bind();
}
Model.prototype.load = function() {
	for(var i in this.vattrs) {
		this.vbuf.add(this.vattrs[i], i);
	}
	this.vbuf.load(gl.STATIC_DRAW);

	this.ibuf.add(new Int16Array(this.indices));
	this.ibuf.load(gl.STATIC_DRAW);
}
Model.prototype.draw = function() {
	this.bind(prog);
	gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
}
