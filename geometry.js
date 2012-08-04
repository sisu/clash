function pointSegDist(a, b, p) {
	var d = vsub(b, a);
	var ap = vsub(p, a);
	if (dot(d,vsub(p,b))>=0) return norm(b,p);
	if (dot(d, ap)<=0) return norm(a,p);
	return norm(cross(d,ap)) / norm(d);
}
