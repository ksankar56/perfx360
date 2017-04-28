/*=========================================================================================
	File Name: popover.js
	Description: Popovers are an updated version, which don’t rely on images, 
				use CSS3 for animations, and data-attributes for local title storage.
	----------------------------------------------------------------------------------------
	Item Name: Robust - Responsive Admin Theme
	Version: 1.2
	Author: PIXINVENT
	Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
(function(window, document, $) {
'use strict';
	//$('[data-toggle="popover"]').popover();


	/******************/
	// Popover events //
	/******************/


	// onShown event
	$('#shown-popover').popover({
		title: 'Popover Shown Event',
		content: 'Bonbon chocolate cake. Pudding halvah pie apple pie topping marzipan pastry marzipan cupcake.',
		trigger: 'click',
		placement: 'bottom'
	}).on('shown.bs.popover', function() {
		//alert('Shown event fired.');
		console.info('popover');
	});


})(window, document, jQuery);