var $html = $('html');

var scrollbarWidth = window.innerWidth - $(window).width();
var sidePaddingDesktop = 34;

// Detect whether device supports orientationchange event, otherwise fall back to
// the resize event.
var supportsOrientationChange = "onorientationchange" in window,
	orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

// Update viewportWidth when viewport size changed
var viewportWidth = window.innerWidth;

$(window).on(orientationEvent, function(e){
	viewportWidth = window.innerWidth;
});


// DOM ready
$(document).ready(function () {

	$(window).trigger(orientationEvent);
	
});