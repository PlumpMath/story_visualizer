TestCase("TcAlternative", sinon.testCase({
	setUp: function () {
		this.alt = SK.alternative.create("Med langsverdet hevet raser jeg ned skråningen mot orken.");
	},

	"test should be a link": function () {
		assertSameAPI(this.alt, SK.link);
	},
	
	"test change color when hovered over": function () {
		this.alt.render(0, 0, 10, 10, paper);
		this.spy(this.alt.path, "attr");
		this.alt.mouseover();
		assertEquals([{stroke: "#666"}], this.alt.path.attr.getCall(0).args);
		this.alt.mouseout();
		assertEquals([{stroke: "#999"}], this.alt.path.attr.getCall(1).args);
	}
}));