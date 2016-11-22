$(document).ready(function () {

	var $subMenuFooter = $('.sub-menu-foot');
	
	$(document).on('click', '.menu-footer-item', function () {
		if (viewportWidth < 1024) {
			$(this).toggleClass("open");
		}
	});

	$('.menu-footer-list>ul').children().click(function (e) {
		e.preventDefault();
		if (viewportWidth < 1024) {
			$(this).children('.sub-menu-foot').slideToggle('slow');
		}
	});
	
	$(window).on(orientationEvent, function(){
		if (viewportWidth >= 1024) {
			$subMenuFooter.show();
		} else {
			$subMenuFooter.hide();
		}
	})		

});