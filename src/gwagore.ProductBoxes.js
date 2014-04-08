window.gwagore = window.gwagore || {};

/**
 * @class App
 * @namespace  gwagore
 */
(function( ns, $ ) { // jshint ignore:line

	/**
	 * @constructor
	 * @param {jQuery} jq
	 * @param {object} data JSON data
	 * @param {function} filterfunc
	 * @param {boolean} isie
	 */
	ns.ProductBoxes = function( jq, data, filterfunc, isie )
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

		_data = data,

		_filterfunc = filterfunc,

		_isie = isie;

		function _isVisibleProduct( data, filters )
		{
			return _filterfunc(data, filters);
			/*
			if (filters.brand !== '' && data.brand !== filters.brand) {
				return false;
			}
			if (!filters.gender_m && data.gender === 'male') {
				return false;
			}
			if (!filters.gender_f && data.gender === 'female') {
				return false;
			}
			if (!filters.gender_k && data.gender === 'kids') {
				return false;
			}
			return true;
			*/
		}

		function _getProductBox( data )
		{
			var learnmore = _jq.find('.productboxes').attr('data-learnmore'),
				html = '<li><div class="mob-title"><h3>' + data.name + '</h3><p>' + data.brand + '</p></div><a class="normal" href="' + data.url + '"><img src="' + data.image + '" alt="' + data.name + '" width="213" height="213" /></a><div class="info"><h3>' + data.name + '</h3><p>' + data.brand + '</p><p><a href="' + data.url + '" class="more white">' + learnmore + ' <i>&nbsp;</i></a></p></div></li>';
			return $(html);
		}

		function _initBoxes()
		{
			if (_isie) {
				_initBoxesIE();
				return;
			}

			var nodes  = document.querySelectorAll('.productboxes li'),
			_nodes = [].slice.call(nodes, 0),
			getDirection = function( ev, obj ) {
				var w = obj.offsetWidth,
					h = obj.offsetHeight,
					x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
					y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
					d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
				return d;
			},
			addClass = function( ev, obj, state ) {
				var direction = getDirection( ev, obj ),
				class_suffix = '';
				obj.className = '';
				switch (direction) {
					case 0 : class_suffix = '-top';    break;
					case 1 : class_suffix = '-right';  break;
					case 2 : class_suffix = '-bottom'; break;
					case 3 : class_suffix = '-left';   break;
				}
				obj.classList.add(state + class_suffix);
			};

			// bind events
			_nodes.forEach(function( el ) {
				el.addEventListener(
					'mouseover',
					function(ev) {
						addClass(ev, this, 'in');
					},
					false
				);
				el.addEventListener(
					'mouseout',
					function(ev) {
						addClass(ev, this, 'out');
					},
					false
				);
			});

		}

		function _initBoxesIE()
		{
			_jq.find('li').hover(
				function() {
					$(this).children('a.normal').hide();
					$(this).children('div.info').show();
				},
				function() {
					$(this).children('div.info').hide();
					$(this).children('a.normal').show();
				}
			);
		}

		/**
		 * Public init method attached to _interface
		 * @method init
		*/
		_interface.init = function()
		{

		};

		/**
		 * @method filterProducts
		*/
		_interface.filterProducts = function( filters )
		{
			if (typeof _data === 'undefined') {
				return;
			}
			jq.empty();
			var ul = $('<ul/>'), a, p;
			for (a in _data) {
				p = _data[a];
				if (_isVisibleProduct(p, filters)) {
					ul.append(_getProductBox(p));
				}
			}
			jq.append(ul);
			_initBoxes();
		};

		return _interface;
	};

}(window.gwagore = window.gwagore || {}, typeof(jQuery) === 'function' ? jQuery : null));
