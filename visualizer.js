(function ($) {
	
	var holder = $("#holder"),
	
	node = function (links) {
		var p = SK.node.create();
		if (links) {
			p.set_links(links);
		}
		return p;
	},
	
	link = function (node) {
		var l = SK.link.create();
		if (node) {
			l.set_node(node);
		}
		return l;
	},
	
	root_node = node([
		link(node([
			link(node()),
			link(node([
				link(node())
			]))
		])),
		link(node([
			link(node([
				link(node()), 
				link(node([link(node([link(node())]))])), 
				link(node())
			])),
			link(node()),
			link(node())
		]))
	]),
	
	graph = SK.graph.create({
		available_width: holder.width(),
		root_node: root_node
	}),
	
	paper = Raphael(holder.get(0), holder.width(), root_node.get_required_height());
		
	graph.render(paper);
	
	
}(jQuery));