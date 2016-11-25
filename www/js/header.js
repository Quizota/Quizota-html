$(document).ready(function () {
	
	// Sticky
	var lastScrollTop = 0;
	var $Header = $('#Header');
	var $HeaderInner = $('#Header > .inner');
	var headerHeight;
	var $landingTopBox = $('.landing-top-box');
	var landingTopBoxHeight;
	
	$(window).on(orientationEvent, function(e){
		headerHeight = $Header.outerHeight();
		landingTopBoxHeight = $landingTopBox.height();
	}).trigger(orientationEvent);
	
	$(window).on('scroll', function (event) {
		var st = $(this).scrollTop();
		if (st <= headerHeight) {
			$html.removeClass('header-off');
		} else if (st >= lastScrollTop) {
			$html.addClass('header-off');
		} else {
			$html.removeClass('header-off');
		}
		lastScrollTop = st;
		
		if(st > landingTopBoxHeight - headerHeight){
			$HeaderInner.addClass('solid-bg');
		} else {
			$HeaderInner.removeClass('solid-bg');
		}
	}).trigger('scroll');


	// Search box
	function closeSearchBox(){
		$('html').removeClass('search-open');
		$('.box-search').removeClass('active');
	}
	
	function toggleSearchBox(){
		$('html').toggleClass('search-open');
		$('.box-search').toggleClass('active');
	}
	
	$(document).on('click', function (e) {
		closeSearchBox();
	});
	
	$(document).on('click', '#Header .icon-search', function (e) {
		e.preventDefault();
		e.stopPropagation();
		toggleSearchBox();
		closeDropdownUser();
	});
	
	$(document).on('click', '#Header .input-search', function (e) {
		e.preventDefault();
		e.stopPropagation();
		closeDropdownUser();
	});
	
	// $(document).on('click', '#Header .close-box-search', function (e) {
	// 	closeSearchBox();
	// });

	
	// Login
	function closeDropdownUser(){
		$('#Header .icon-users').removeClass('active');
		$('#Header .dropdown-user').removeClass('active');
	}
	
	function toggleDropdownUser(){
		$('#Header .icon-users').toggleClass('active');
		$('#Header .dropdown-user').toggleClass('active');
	}
	
	$(document).on('click', function (e) {
		closeDropdownUser();
	});
	$('#Header .icon-users').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		toggleDropdownUser();
		closeSearchBox();
	});
	
	
	// Branding
	setTimeout(function(){
		$('#Header #Branding').addClass('graphic-version');
	}, 2000);
	
	
	// Icons wrap
	// $('#Header .icons-wrap').css('right', sidePaddingDesktop - scrollbarWidth + 'px');
	
	
	// Second level
	$('.full-page #Header .sub-active + .second-level:visible').closest('body').addClass('has-second-level');
	

});