(function () {
	
	if (typeof Object.create !== 'function') {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
	     };
	}
	
	var paper = Raphael("main", 600, 400);

	var room = {
		create: function (name, x, y) {
			var self = Object.create(this);
			self.name = name;
			self.coords = {x: x, y: y};
			return self;
		},
		
		radius: 50,
		
		create_dot: function () {
			var self = this;
			this.dot = paper.circle(this.coords.x, this.coords.y, this.radius);
			this.dot.attr({
				'stroke-width': 0
			  ,	'fill': '270-#eee-#ccc:80-#ddd'
			  ,	'cursor': 'pointer'
  			  , "stroke-dasharray": "-.."
			});
			this.label = paper.text(this.coords.x, this.coords.y, this.name);
			this.label.attr({
				'fill': '#444'
			  , 'font-size': 40
			  , 'font-family': "'League Gothic', 'Futura-CondensedMedium', 'Gill MT Condensed', 'Arial Narrow', sans-serif"
			});

			$(this.dot.node).add(this.label.node).hover(function () {
				self.dot.animate({scale: 1.2, 'stroke-width': 2}, 200, 'bounce');
			}, function () {
				self.dot.animate({scale: 1, 'stroke-width': 0}, 200, 'bounce');
			});
		},
		
		draw: function () {
			if (!this.dot) {
				this.create_dot();
			}
		}
	};

	room.create("#1", 300, 100).draw();
	room.create("#2", 150, 300).draw();
	room.create("#3", 450, 300).draw();
	

	
}());