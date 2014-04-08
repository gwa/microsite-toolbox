describe("A ProductBoxes instance", function () {

	var _jq,
		_productdata;

	beforeEach(function() {
		_jq = $('<div><div class="productboxes" data-learnmore="learn more"></div>');
		_productdata = [
			{
				"name": "Civetta M Jacket",
				"brand": "Berghaus",
				"image": "http://www.gore-tex.co.uk/resources/goretex/static/en_GB/images/products/GTX-17316_350.jpg",
				"url": "http://www.gore-tex.co.uk/product/berghaus-civetta-m-jacket/1361060814162/",
				"type": "trail",
				"gender": "male"
			},
			{
				"name": "Spirit jacket",
				"brand": "Haglöfs",
				"image": "http://www.gore-tex.co.uk/resources/goretex/static/en_GB/images/products/GTX-17238_350.jpg",
				"url": "http://www.gore-tex.co.uk/product/haglöfs-spirit-jacket/1361060696605/",
				"type": "trail",
				"gender": "female"
			},
			{
				"name": "Explorair Tech Pant W",
				"brand": "Scott",
				"image": "http://www.gore-tex.co.uk/resources/goretex/static/en_GB/images/products/GTX-16842_350.jpg",
				"url": "http://www.gore-tex.co.uk/product/scott-explorair-tech-pant-w/1361060648000/",
				"type": "trail",
				"gender": "male"
			}
		];
	});

	it("can filter products", function() {
		var filterfunc = function( data, filters ) {
			if (filters.brand !== '' && data.brand !== filters.brand) {
				return false;
			}
			return true;
		},
		isie = false,
		pb = new gwagore.ProductBoxes(
			_jq,
			_productdata,
			filterfunc,
			isie
		),
		filters = {
			brand: 'Berghaus'
		};

		pb.filterProducts(filters);

		expect(_jq.find('ul').length).toBe(1);
		expect(_jq.find('li').length).toBe(1);
		expect(_jq.find('.mob-title p').text()).toBe('Berghaus');
	});

});
