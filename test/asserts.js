function assertSameAPI(obj, parent) {
	for (key in parent) {
		if (parent.hasOwnProperty(key)) {
			assertNotUndefined(obj[key]);
		}
	}
}