/* global gwa */

window.gwagore = window.gwagore || {};

/**
 * @class App
 * @namespace  gwagore
 */
(function( ns, $ ) { // jshint ignore:line

	/**
	 * @constructor
	 * @param {jQuery} jq
	 * @param {array} productdata
	 * @param {object} filterdata
	 */
	ns.ProductFilters = function( jq, productdata, filterdata )
	{

		// declare private variables
		var
		/**
		 * @property {Object} _interface
		 * @private
		 */
		_interface = {},

		/**
		 * @property {jQuery} _jq
		 * @private
		 */
		_jq = jq,

		_filterdata = filterdata,

		_dispatcher = new gwa.EventDispatcher();

		function _buildBrandMenu()
		{
			var a, brands = [], o, brandselect, allbrands;
			for (a in productdata) {
				if ($.inArray(productdata[a].brand, brands) === -1) {
					brands.push(productdata[a].brand);
				}
			}

			allbrands = _jq.find('#brand').attr('data-allbrands');

			brands.sort();
			brandselect = jq.find('select');
			brandselect.empty();
			o = $('<option />');
			o.attr('value', '').text(allbrands);
			brandselect.append(o);
			for (a in brands) {
				o = $('<option />');
				o.attr('value', brands[a]).text(brands[a]);
				brandselect.append(o);
			}
		}

		/**
		 * Public init method attached to _interface
		 * @method init
		*/
		_interface.init = function()
		{
			_buildBrandMenu();
			jq.fancyfields(
				{
					onCheckboxChange: function(input, ischecked) {
						_filterdata[input.attr('id')] = ischecked;
						_dispatcher.dispatch('CHANGE', this, _filterdata);
					},
					onSelectChange: function(input, text, val) {
						_filterdata[input.attr('id')] = val;
						_dispatcher.dispatch('CHANGE', this, _filterdata);
					}
				}
			);
		};

		/**
		 * @method on
		*/
		_interface.on = function( ev, func )
		{
			return _dispatcher.on(ev, func);
		};

		/**
		 * @method off
		*/
		_interface.off = function( ev, func )
		{
			_dispatcher.off(ev, func);
		};

		_interface.getFilters = function() {
			return _filterdata;
		};

		_interface.setFilters = function( data ) {
			_filterdata = data;
		};

		return _interface;

	};

}(window.gwagore = window.gwagore || {}, typeof(jQuery) === 'function' ? jQuery : null));
