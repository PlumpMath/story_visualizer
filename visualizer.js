(function ($) {
	
	var holder = $("#holder"),
	
	page = function (number, links) {
		var p = SK.page.create(number);
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
	
	root_node = page(1, [
		link(page(2, [
			link(page(3)),
			link(page(4, [
				link(page(5))
			]))
		])),
		link(page(6, [
			link(page(7, [
				link(page(8)), 
				link(page(9, [link(page(10, [link(page(11))]))])), 
				link(page(12))
			])),
			link(page(13)),
			link(page(14)),
			link(page(15))
		]))
	]),
	
	graph = SK.graph.create({
		available_width: holder.width(),
		root_node: root_node
	}),
	
	paper = Raphael(holder.get(0), holder.width(), root_node.get_required_height());
		
	graph.render(paper);
	
	
}(jQuery));