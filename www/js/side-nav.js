$(document).ready(function(){
	
	// Side nav top level ======
	$(document).on('click', '.main-nav .icon-hamburger', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('html').addClass('side-nav-top-level-open');
	});

	$(document).on('click', '.side-nav-top-level .icon-close', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('html').removeClass('side-nav-top-level-open');
	});

	$(document).on('click', '.side-nav-top-level .inner', function (e) {
		e.stopPropagation();
	});
	
	$(document).on('click', function(){
		$('html').removeClass('side-nav-top-level-open');		
	})
	

	
	// Side nav ======

	// Make side nav structure from tree format to parallel format
	var subMenuId = 0;
	$('.side-nav .main-mn').parent().attr('data-level', 1);
	$('.side-nav .main-mn li.has-child').each(function(){
		subMenuId++
		$(this).children('.overthrow')
			.attr('id', 'Overthrow-' + subMenuId)
			.attr('data-level', $(this).parents('ul').length + 1 );
		$(this)
			.attr('data-children-id', 'Overthrow-' + subMenuId)
			.attr('data-parent-id', $(this).closest('.overthrow').attr('id'));
	});

	$('.side-nav .main-mn li.has-child').each(function(){
		var $overthrow = $(this).children('.overthrow').clone();
		$('.side-nav .inner > .back-root').after($overthrow);
	});

	$('.side-nav .overthrow .overthrow').remove();
	

	// clone login-contact
	$('.side-nav .sub-mn').each(function(){
		$(this).append($('.side-nav .main-mn > .login-contact').clone());
	});
	

	// scan current item
	var $initialActiveNavItems = $('.side-nav .has-child.active'); 
	// $initialActiveNavItems.each(function(){
	// 	$(this).removeClass('active');
	// });
	
	function navDiveDeep(){
		if($initialActiveNavItems.length){
			$('.side-nav').addClass('diving-deep');
			var deepestLevel = 1;
			$initialActiveNavItems.each(function(){
				var $closestOverthrow = $(this).closest('.overthrow');
				$(this).addClass('current');
				$closestOverthrow.addClass('current');
				$('.side-nav .overthrow[data-level=' + (parseInt($closestOverthrow.attr('data-level')) - 1) + ']').addClass('sub-menu-shown');

				// $('.side-nav').attr('data-current-level', '_' + ($(this).parents('ul').length + 1) );
				var thisLevel = $(this).closest('.overthrow').attr('data-level');
				deepestLevel = thisLevel > deepestLevel ? thisLevel : deepestLevel;
				$('.side-nav').attr('data-current-level', '_' + deepestLevel );
			});
			setTimeout(function(){
				$('.side-nav').removeClass('diving-deep');
			}, 500);
		} else {
			$('.side-nav').attr('data-current-level', '_1');
			$('.side-nav .main-mn').parent().addClass('current');
		}
	}
	
	$(window).on(orientationEvent, function(){
		if(viewportWidth >= 1024){
			navDiveDeep();
		}
	});


	var pageScrollTopBeforeOpenSideNav = $(window).scrollTop();
	
	function openSideNav(){
		if(viewportWidth < 1024){
			pageScrollTopBeforeOpenSideNav = $(window).scrollTop();
			$('html').addClass('side-nav-open');
			$('#PageWrapper').css('margin-top', '-' + pageScrollTopBeforeOpenSideNav + 'px');
			navDiveDeep();
		}		
	}
	
	function closeSideNav(){
		if(viewportWidth < 1024){
			$('html').removeClass('side-nav-open');
			$('#PageWrapper').css('margin-top', '0');
			$(window).scrollTop(pageScrollTopBeforeOpenSideNav);
		}
	}

	$(document).on('click', '.icons-wrap .icon-hamburger', function (e) {
		e.preventDefault();
		e.stopPropagation();
		openSideNav();
	});
	
	$(document).on('click', '.side-nav .icon-close, .side-nav > .bg', function (e) {
		e.preventDefault();
		e.stopPropagation();
		closeSideNav();
	});

	$(document).on('click', '.side-nav .inner', function (e) {
		e.stopPropagation();
	});
	
	$('.side-nav li > a').each(function(){
		$(this).html('<span>' + $(this).text() + '</span>');
		if($(this).parent().hasClass('has-child')){
			$(this).after('<i></i>');
		}
	})

	$(document).on('click', '.side-nav li.has-child > a + i', function (e) {
		// var self = this;
		e.preventDefault();
		e.stopPropagation();
		// var $a = $(this).parent();
		// $('.side-nav').attr('data-current-level', '_' + ($(this).parents('ul').length + 1) );
		$('.side-nav').attr('data-current-level', '_' + (parseInt($(this).closest('.overthrow').attr('data-level')) + 1) );
		var $li = $(this).parent();
		var $a = $(this).prev();
		$('#' + $li.attr('data-children-id')).addClass('current');
		$a.parent().addClass('current');
		$a.closest('.overthrow').addClass('sub-menu-shown');
		// $('.side-nav').addClass('animating');
		setTimeout(function(){
			$('.side-nav .inner > .overthrow').scrollTop(0);
		}, 500);
		// setTimeout(function(){
		// 	var subNavHeight = $a.closest('.active').find('.sub-mn').eq(0).height();
		// 	$('.login-contact').css('top', subNavHeight);
		// 	$('.side-nav').removeClass('animating');
		// }, 800);

	});
	
	$(document).on('touchstart', '.side-nav li.has-child > a + i', function (e) {
		$(this).addClass('touch');
	});
	
	$(document).on('touchend', '.side-nav li.has-child > a + i', function (e) {
		$(this).removeClass('touch');
	})

	$(document).on('click', '.side-nav .overthrow .back', function (e) {
		if(viewportWidth < 1024){
			e.preventDefault();
			// $('.login-contact').hide().removeAttr('css');
			var self = this;
			// $(this).closest('.overthrow').parents('.overthrow').eq(0).removeClass('sub-menu-shown');
			var $thisOverthrow = $(this).closest('.overthrow');
			var prevLevel = parseInt($thisOverthrow.attr('data-level')) - 1;
			var $prevOverthrow = $('.side-nav .overthrow[data-level=' + prevLevel + ']');
			$prevOverthrow.removeClass('sub-menu-shown');

			// var _cur = $(self).closest('.has-child');

			// $('.login-contact').css('top', _cur.parent().height()).show();

			// $('.side-nav').addClass('animating');
			
			var currentLevel = parseInt($('.side-nav').attr('data-current-level').substr(1)) - 1;

			setTimeout(function () {
				// $('.login-contact').css('top', _cur.parent().height());
				// _cur.removeClass('current');
				$thisOverthrow.removeClass('current');
				$prevOverthrow.find('li.current').removeClass('current');
				// $('.side-nav').removeClass('animating');
				$('.side-nav').attr('data-current-level', '_' + currentLevel );
			}, 500);
		}
	});

	$(document).on('click', '.side-nav .back-root', function (e) {
		if(viewportWidth < 1024){
			e.preventDefault();
			// $('.side-nav .sub-menu-shown').eq(1).removeClass('sub-menu-shown');
			$('.side-nav .overthrow[data-level=2]').removeClass('sub-menu-shown');
			setTimeout(function(){
				// $('.side-nav .sub-menu-shown').eq(0).removeClass('sub-menu-shown');
				$('.side-nav .overthrow[data-level=1]').removeClass('sub-menu-shown');
			}, 200);
			setTimeout(function(){
				$('.side-nav .sub-menu-shown').removeClass('sub-menu-shown');
				$('.side-nav .current:not([data-level=1])').removeClass('current');
				$('.side-nav').attr('data-current-level', '_1');
			}, 800);
		}
	});
	
	
	// login
	$(document).on('click', '.side-nav .login-box', function(e){
		e.preventDefault();
		var self = this;
		var _buttonHeight = $(this).outerHeight();
		var $loginContent = $(this).next();
		var _overthrowHeight = $(self).closest('.overthrow').height();
		var _contentHeight = $loginContent.outerHeight(true);
		if($loginContent.hasClass('open')){
			var _ulHeight = $(self).closest('ul').height();
			var _y = _ulHeight - _overthrowHeight - _contentHeight + _buttonHeight;
			if(_ulHeight - $loginContent.height() <= _overthrowHeight){
				_y = 0;
			}
			$(self).closest('.overthrow').scrollTo(_y, 300, {onAfter: function(){
				$loginContent.removeClass('open');
			}});
		} else {
			$loginContent.addClass('open');
			setTimeout(function(){
				var _y = $(self).closest('ul').height() - _overthrowHeight;
				$(self).closest('.overthrow').scrollTo(_y, 300 );
			},50);
		}
	});
	
});