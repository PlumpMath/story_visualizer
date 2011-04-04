var elem = {
	attr: function () {}
};

var paper = {
	circle: function (x, y, r) { return Object.create(elem); },
	path: function (svg_path) { return Object.create(elem); },
	text: function (x, y, text) { return Object.create(elem); }
};