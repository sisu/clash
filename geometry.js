function pointSegDist(a, b, p) {
	var d = vsub(b, a);
	var ap = vsub(p, a);
	var bp = vsub(p, b);
	if (dot(d, bp)>=0) return norm(bp);
	if (dot(d, ap)<=0) return norm(ap);
//	if (norm(cross(d,ap))==0) console.log('dap 0 '+cross(d,ap));
	if (a.length==2)
		return cross2(d,ap) / norm(d);
	return norm(cross(d,ap)) / norm(d);
}
