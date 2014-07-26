(function(document, window, undefined) {
	'use strict';

	var A_VALUE = 'data-custom-selectbox-value';

	window.Selectbox = function(select) {
		var valueContainer;

		function init() {
			var parent = select.parentElement || select.parentNode;

			valueContainer = parent.querySelector('[' + A_VALUE + ']');
			setValue();
			initListeners();
		}

		function initListeners() {
			select.addEventListener('change', setValue);
		}

		function setValue() {
			var index = select.selectedIndex;

			if (index !== -1) {
				valueContainer.textContent = select.options[index].textContent;
			}
		}

		init();
	};
})(document, window);