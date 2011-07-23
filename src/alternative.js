SK.alternative = _.extend(SK.link.create(), {
	create: function () {
		return Object.create(this);
	},
	
	render: function () {
		SK.link.render.apply(this, arguments);
		$(this.path.node).
			bind("mouseover", _.bind(this.mouseover, this)).
			bind("mouseout",  _.bind(this.mouseout, this));
	},
	
	mouseover: function () {
		this.path.attr({stroke: '#666'});
	},
	
	mouseout: function () {
		this.path.attr({stroke: this.shape_attributes.stroke});
	}
});