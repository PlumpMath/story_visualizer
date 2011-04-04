var SK = SK || {};

SK.graph = {
	create: function (params) {
		var self = Object.create(this);
		self.root_node = params.root_node;
		self.available_width = params.available_width;
		self.set_scale(self.calculate_scale());
		return self;
	},
	
	set_scale: function (scale) {
		SK.node.set_scale(scale);
		SK.link.set_scale(scale);
	},
	
	calculate_scale: function () {
		return this.available_width / this.root_node.get_required_width();
	},
	
	get_root_position: function () {
		return {
			x: this.available_width / 2,
			y: this.root_node.size / 2
		};
	},
	
	render: function (paper) {
		var p = this.get_root_position();
		this.root_node.render(p.x, p.y, paper);
	}
};