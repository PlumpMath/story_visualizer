TestCase("TcLink", sinon.testCase({
	setUp: function () {
		this.link = SK.link.create();
	},
	
	tearDown: function () {
		this.link.set_scale(1);
	},

	"test should return self when setting node": function () {
		assertSame(this.link, this.link.set_node({}));
	},

	"test should scale": function () {
		assertEquals(1, this.link.shape_attributes['stroke-width']);
		this.link.set_scale(5);
		assertEquals(5, this.link.shape_attributes['stroke-width']);
	},
	
	"test should have no required width or height alone": function () {
		assertEquals(0, this.link.get_required_width());
		assertEquals(0, this.link.get_required_height_below_y());
	},
	
	"test should have required width and height of its node": function () {
		var node = { 
			get_required_width: function () { return 50; },
			get_required_height_below_y: function () { return 5; }
		};
		this.link.set_node(node);
		assertEquals(50, this.link.get_required_width());
		assertEquals(5, this.link.get_required_height_below_y());
	},

	"test create svg path string": function () {
		assertEquals("M10 10L90 90", this.link.svg_line_string(10, 10, 90, 90));
	},
	
	"test should render": function () {
		this.spy(paper, "path");
		this.link.render(50, 70, 35, 90, paper);
		assert(paper.path.calledWith("M50 70L35 90"));
	},
	
	"test should render node": function () {
		var node = { render: function () {} };
		this.spy(node, "render");
		this.link.set_node(node);
		this.link.render(50, 70, 35, 90, paper);
		assert(node.render.calledWith(35, 90, paper));
	}
}));