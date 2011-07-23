TestCase("TcPage", sinon.testCase({
	setUp: function () {
		this.page = SK.page.create(10);
	},

	tearDown: function () {
		this.page.set_scale(1);
	},

	"test should be a node": function () {
		assertSameAPI(this.page, SK.node);
	},

	"test should render room number": function () {
		this.spy(paper, "text");
		this.page.render(50, 50, paper);
		assertEquals([50, 50, "#10"], paper.text.getCall(0).args);
	},
	
	"test should scale": function () {
		assertEquals(3, this.page.text_attributes['font-size']);
		this.page.set_scale(10);
		assertEquals(30, this.page.text_attributes['font-size']);
	}
}));