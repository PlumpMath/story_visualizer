var SK = SK || {};

(function () {

	var original = {
		stroke_width: 1
	};

	SK.link = {
		shape_attributes: {
			stroke: '#999',
			'stroke-width': 1
		},

		create: function () {
			return Object.create(this);
		},

		set_scale: function (scale) {
			this.shape_attributes['stroke-width'] = original.stroke_width * scale;
		},

		svg_line_string: function (x1, y1, x2, y2) {
			return "M" + x1 + " " + y1 + "L" + x2 + " " + y2;
		},

		render: function (x1, y1, x2, y2, paper) {
			this.path = paper.path(this.svg_line_string(x1, y1, x2, y2));
			this.path.attr(this.shape_attributes);
			if (this.node) {
				this.node.render(x2, y2, paper);
			}
		},

		set_node: function (node) {
			this.node = node;
			return this;
		},

		get_required_width: function () {
			return this.node ? this.node.get_required_width() : 0;
		},
		
		get_required_height_below_y: function () {
			return this.node ? this.node.get_required_height_below_y() : 0;
		}
	};
	
}());
