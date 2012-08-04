function Buffer(target) {
	this.target = target;
	this.id = null;
	this.index = [0];
	this.arrs = [];
	this.names = [];
}
Buffer.prototype.add = function(arr, name) {
	console.log("adding array "+name+" ; "+arr.BYTES_PER_ELEMENT);
	this.arrs.push(arr);
	this.names.push(name);
	this.index.push(this.index.last() + arr.length * arr.BYTES_PER_ELEMENT);
}
Buffer.prototype.free = function() {
	gl.deleteBuffer(this.id);
}
Buffer.prototype.bind = function(prog) {
	if (!this.id) {
		this.id = gl.createBuffer();
	}
	gl.bindBuffer(this.target, this.id);
	if (!prog) return;
	for(var i=0; i<this.names.length; ++i) {
		var idx = gl.getAttribLocation(prog, this.names[i]);
//		console.log("setting attribute "+this.names[i]+" : "+idx);
		if (idx<0) continue;
		gl.enableVertexAttribArray(idx);
		// FIXME: magic constant 3
		gl.vertexAttribPointer(idx, 3, gl.FLOAT, false, 0, this.index[i]);
	}
}
Buffer.prototype.load = function(usage) {
	this.bind();
	console.log("total size: "+this.index.last()+" ; "+this.index.length);
	gl.bufferData(this.target, this.index.last(), usage);
	console.log("loading "+this.arrs.length+" arrs");
	for(var i=0; i<this.arrs.length; ++i) {
		gl.bufferSubData(this.target, this.index[i], this.arrs[i]);
	}
}
