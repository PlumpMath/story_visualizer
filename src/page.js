SK.page = {
	create: function (number) {
		var self = $.extend(SK.node.create(), this);
		self.number = number;
		return self;
	},
	
	render: function (x, y, paper) {
		SK.node.render.apply(this, arguments);
		paper.text(x, y, "#" + this.number);
	}
};