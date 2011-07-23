(function () {
	var original = {
		font_size: 3
	};

	SK.page = $.extend(SK.node.create(), {
		text_attributes: {
			'font-size': original.font_size
		},
		
		create: function (number) {
			var self = Object.create(this);
			self.number = number;
			return self;
		},

		set_scale: function (scale) {
			SK.node.set_scale.apply(this, arguments);
			this.text_attributes['font-size'] = original.font_size * scale;
		},

		render: function (x, y, paper) {
			SK.node.render.apply(this, arguments);
			this.text = paper.text(x, y, "#" + this.number);
			this.text.attr(this.text_attributes);
		}
	});
		
}());

