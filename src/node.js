var SK = SK || {};

(function () {
	
	var original = {
		size: 10,
		link_spacing: {dx: 4, dy: 20},
		stroke_width: 0.5
	};

	SK.node = {
		size: original.size,
		link_spacing: {
			dx: original.link_spacing.dx,
			dy: original.link_spacing.dx
		},
		shape_attributes: {
			'stroke-width': original.stroke_width,
			'fill': '#eee'
		},
		links: [],
	
		create: function () {
			return Object.create(this);
		},
	
		get_radius: function () {
			return this.size / 2 - this.shape_attributes['stroke-width'];
		},
	
		set_scale: function (scale) {
			this.size = original.size * scale;
			this.link_spacing.dx = original.link_spacing.dx * scale;
			this.link_spacing.dy = original.link_spacing.dy * scale;
			this.shape_attributes['stroke-width'] = original.stroke_width * scale;
		},
	
		total_links_width: function () {
			return _.reduce(this.links, function (value, link) {
				return value + link.get_required_width();
			}, 0);
		},
	
		total_link_spacing: function () {
			return this.links.length === 0 ? 0 :
				(this.links.length - 1) * this.link_spacing.dx;
		},
	
		get_required_width: function () {
			return Math.max(this.size,
				this.total_link_spacing() + this.total_links_width());
		},
		
		get_required_height: function () {
			return this.size / 2 + this.get_required_height_below_y();
		},
		
		get_required_height_below_y: function () {
			return this.links.length === 0 ? this.size / 2 :
				this.link_spacing.dy + this.links_height_below_y();
		},
		
		links_height_below_y: function () {
			return _.max(_.map(this.links, function (a) { 
				return a.get_required_height_below_y(); 
			}));
		},
	
		set_links: function (links) {
			this.links = links;
			return this;
		},
	
		render_links: function (x, y, paper) {
			var x_spacing = this.link_spacing.dx,
			left_edge = x - this.get_required_width() / 2,
			link_y = y + this.link_spacing.dy,
			link_x = left_edge;

			_.each(this.links, function (a) {
				a.render(x, y, 
					link_x + a.get_required_width() / 2, link_y,
					paper);
				link_x = link_x + a.get_required_width() + x_spacing;
	 		});
		},
	
		render_dot: function (x, y, paper) {
			var self = this;
			this.dot = paper.circle(x, y, this.get_radius());
			this.dot.attr(this.shape_attributes);
		},
	
		render: function (x, y, paper) {
			this.render_links(x, y, paper);
			this.render_dot(x, y, paper);
		}
	};

}());