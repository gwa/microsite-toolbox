window.gwa = window.gwa || {};

/**
 * @class EventDispatcher
 * @namespace  gwa
 * @constructor
 */
(function( ns, $ ) { // jshint ignore:line

	ns.EventDispatcher = function()
	{
		var
		_listeners = {},

		_instance = {

			/**
			 * @method on
			 * @param  {String} event
			 * @param  {Function} func
			 * @param  {Object} obj
			 * @param  {Boolean} once
			 * @return {Number} listener index
			 */
			on: function( event, func, obj, once )
			{
				if (!_listeners[event]) {
					_listeners[event] = [];
				}
				_listeners[event].push({func: func, obj: obj, once: once});
				return _listeners[event].length - 1;
			},

			/**
			 * @method on
			 * @param  {String} event
			 * @param  {Function} func
			 * @param  {Object} obj
			 * @return {Number} listener index
			 */
			once: function( event, func, obj )
			{
				return _instance.on(event, func, obj, true);
			},

			/**
			 * @method on
			 * @param  {String} event
			 * @param  {Function|Number} func
			 */
			off: function( event, func )
			{
				if (typeof(func) === 'number') {
					if (typeof(_listeners[event][func]) === 'function') {
						_listeners[event][func] = undefined;
					}
					return;
				}
				if (typeof(func) === 'undefined') {
					_listeners[event] = [];
				}
				for (var i = 0, len = _listeners[event].length; i < len; i++) {
					if (_listeners[event][i].func === func) {
						_listeners[event][i] = undefined;
					}
				}
			},

			/**
			 * @method offAll
			 */
			offAll: function()
			{
				_listeners = {};
			},

			/**
			 * @method dispatch
			 * @param {String} event
			 * @return {Number} Number of listeners affected.
			 */
			dispatch: function( event )
			{
				var args = [], i, len, l, c = 0;
				for (i = 1, len = arguments.length; i < len; i++) {
					args.push(arguments[i]);
				}
				if (_listeners[event]) {
					for (i in _listeners[event]) {
						l = _listeners[event][i];
						if (typeof(l) !== 'object') {
							continue;
						}
						if (typeof(l.func) === 'function') {
							l.func.apply(l.obj, args);
							c++;
						}
						if (l.once) {
							_listeners[event][i] = undefined;
						}
					}
				}
				return c;
			},

			/**
			 * @method getListeners
			 * @return {Array}
			 */
			getListeners: function()
			{
				return _listeners;
			}

		};

		return _instance;

	};

}(window.gwa, typeof(jQuery) === 'function' ? jQuery : null));
