function pointSegDist(a, b, p) {
	var ab = vsub(b, a);
	var ap = vsub(p, a);
	var bp = vsub(p, b);
	if (dot(ab, bp)>=0) return norm(bp);
	if (dot(ab, ap)<=0) return norm(ap);
//	if (norm(cross(ab,ap))==0) console.log('dap 0 '+cross(ab,ap));
	if (a.length==2)
		return Math.abs(cross2(ab,ap) / norm(ab));
	return norm(cross(ab,ap)) / norm(ab);
}
function project(v, normal) {
	return vsub(v, vmul(-dot(v,normal)/norm2(normal), normal));
}

function segClosestPoint(a, b, p) {
	var ab = vsub(b, a);
	var ap = vsub(p, a);
	var bp = vsub(p, b);
	if (dot(ab, bp)>=0) return b;
	var dabp = dot(ab,ap);
	if (dabp<=0) return a;
//	console.log('in seg '+ap+' ; '+ab);
	return vadd(a, ivmul(dabp/norm2(ab), ab));
}
