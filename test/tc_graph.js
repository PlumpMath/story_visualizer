(function () {
	
	TestCase("TcGraph", sinon.testCase({
		setUp: function () {
			this.node = SK.node;
			this.node.size = 10;
			this.stub(this.node, "get_required_width").returns(100);
			this.stub(this.node, "render");

			this.stub(SK.node, "set_scale");
			this.stub(SK.link, "set_scale");

			this.graph = SK.graph.create({
				available_width: 300,
				root_node: this.node
			});
		},

		"test should calculate scale as ratio between required width and available width": function () {
			assertEquals(3, this.graph.calculate_scale());
			this.graph.available_width = 50;
			assertEquals(5, Math.floor(10 * this.graph.calculate_scale()));
		},
		
		"test should set scale": function () {
			assert(SK.node.set_scale.calledWith(3));
			assert(SK.link.set_scale.calledWith(3));
		},
		
		"test should place root node x in center of available width": function () {
			assertEquals(150, this.graph.get_root_position().x)
		},
		
		"test should place root node y at top plus radius": function () {
			assertEquals(5, this.graph.get_root_position().y);
		},
		
		"test should render root node": function () {
			var paper = {};
			this.graph.render(paper);
			assert(this.node.render.calledWith(150, 5, paper));
		}
	}));
		
}());

