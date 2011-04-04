(function () {

	var link = function (width) {
		var l = SK.link.create();
		sinon.stub(l, "get_required_width").returns(width);
		return l;
	}

	TestCase("Node rendering", sinon.testCase({
		setUp: function () {
			this.node = SK.node.create();
		},
		
		tearDown: function () {
			this.node.set_scale(1);
		},

		"test should return self when setting links": function () {
			assertSame(this.node, this.node.set_links([]));
		},
		
		"test should return required width when last node": function () {
			assertEquals(10, this.node.get_required_width());
		},
		
		"test should return required height": function () {
			assertEquals(10, this.node.get_required_height());
		},
		
		"test should return required height with links": function () {
			var l = link();
			this.stub(l, "get_required_height_below_y").returns(5);
			this.node.set_links([l]);
			assertEquals(30, this.node.get_required_height());
		},
		
		"test should return required height below y when last node": function () {
			// with size 10 half of pixels are below y -> 5
			assertEquals(5, this.node.get_required_height_below_y());
		},
		
		"test should return required height from y with one link": function () {
			var l = link();
			this.stub(l, "get_required_height_below_y").returns(5);
			this.node.set_links([l]);
			assertEquals(25, this.node.get_required_height_below_y());
		},
		
		"test should return required height from y with different height links": function () {
			var l1 = link(), l2 = link();
			this.stub(l1, "get_required_height_below_y").returns(5);
			this.stub(l2, "get_required_height_below_y").returns(25);
			this.node.set_links([l1, l2]);
			assertEquals(45, this.node.get_required_height_below_y());
		},
		
		"test should make room for links": function () {
			this.node.set_links([link(10), link(10)]);
			assertEquals(24, this.node.get_required_width());
		},
		
		"test should make room for self": function () {
			this.node.set_links([link(1)]);
			assertEquals(10, this.node.get_required_width());
		},
		
		"test should render": function () {
			this.spy(paper, "circle");
			this.node.render(50, 50, paper);
			assertEquals([50, 50, 4.5], paper.circle.getCall(0).args);
		},
		
		"test should render one link straight down": function () {
			var l = link(10);
			this.spy(l, "render");
			this.node.set_links([l]);
			this.node.render(50, 50, paper);
			assertEquals([50, 50, 50, 70, paper], l.render.getCall(0).args);
		},
		
		"test should render two links at center of two halves": function () {
			var link1 = link(10);
			var link2 = link(10);
			this.spy(link1, "render");
			this.spy(link2, "render");
			this.node.set_links([link1, link2]);
			this.node.render(50, 50, paper);
			// required width = 24 ... dvs 50+-12 ... 38 til 62
			// link1 har 10 i bredde. midten er 5 -> dvs 38+5 = 43
			assert(link1.render.calledWith(50, 50, 43, 70, paper));
			// link2 går fra 38+10+4 linkså 52, midten er 5 -> 52+5 = 57
			assert(link2.render.calledWith(50, 50, 57, 70, paper));
		},
		
		"test should render three links at edges and straight down": function () {
			var link1 = link(10);
			var link2 = link(10);
			var link3 = link(10);
			this.spy(link1, "render");
			this.spy(link2, "render");
			this.spy(link3, "render");
			this.node.set_links([link1, link2, link3]);
			this.node.render(50, 50, paper);
			// venstre kant = 50 - 38 / 2 = 31 .. høyre er da 69
			assert(link1.render.calledWith(50, 50, 36, 70, paper));
			assert(link2.render.calledWith(50, 50, 50, 70, paper));
			assert(link3.render.calledWith(50, 50, 64, 70, paper));
		},
		
		"test should render skewed links": function () {
			var link1 = link(40);
			var link2 = link(10);
			this.spy(link1, "render");
			this.spy(link2, "render");
			this.node.set_links([link1, link2]);
			this.node.render(50, 50, paper);
			// required width = 54 ... dvs 50+-27 ... 23 til 77
			// link1 har 40 i bredde. midten er 20 -> dvs 23+20 = 43
			assert(link1.render.calledWith(50, 50, 43, 70, paper));
			// link2 går fra 23+40+4 linkså 67, midten er 5 -> 67+5 = 72
			assert(link2.render.calledWith(50, 50, 72, 70, paper));
		},
		
		"test should scale": function () {
			this.node.set_scale(5);
			assertEquals(50, this.node.size);
			assertEquals({dx: 20, dy: 100}, this.node.link_spacing);
			assertEquals(2.5, this.node.shape_attributes['stroke-width']);
		},
		
		"test should allow multiple scale settings": function () {
			this.node.set_scale(5);
			this.node.set_scale(6);
			assertEquals(60, this.node.size);
		}
	}));

}());
