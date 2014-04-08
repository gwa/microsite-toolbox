describe("ProductBoxes", function () {
	it("expects true", function () {

		var jq = $('<div />');
		var b = new gwagore.ProductBoxes(
			jq
		);
		expect(true).toBe(true);
	});
});
