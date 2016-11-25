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
$(document).ready(function () {

    // Accordion

    $(".accordion .link").click(function () {
        var rest = $('.accordion.editor').find('.accordion-cont:visible').not($(this).next().next());

        $(this).next().next().slideToggle('').addClass('open');
        rest.slideUp();
        $(this).toggleClass("active");
        $('.accordion .link.active').not(this).removeClass('active');
        $('.accordion .link').not(this).next().next().removeClass('open');
        $('.accordion .link').not(this).closest('li').prev().removeClass('space-margin');

        if ($(this).hasClass('active')) {
            $(this).next().next().addClass('open');
            $(this).closest('li').next().addClass('space-margin');
        }
        else {
            $(this).next().next().removeClass('open');
            $(this).closest('li').next().removeClass('space-margin');
        }
    });

    function educationTool() {
        $('.education-btn').on('click touch', function(event) {
            var $this = $(this);
            if($this.hasClass('level1')) {
                $this.removeClass('close').addClass('active').next().removeClass('close2').addClass('active');
                $('.back').removeClass('close').addClass('active');
            }
            else{
                if($this.parent().hasClass('level2')) {
                    $this.parent().addClass('close').next().removeClass('close').addClass('active');
                }
            }
        });

        $('.back').on('click touch', function() {
            if($('.level3').hasClass('active')) {
                $('.level3').removeClass('active').addClass('close');
                $('.level2').removeClass('close');
            }
            else{
                if($('.level2').hasClass('active')) {
                    $('.level2, .level1, .back').removeClass('active');
                    $('.level1, .back').addClass('close');
                    $('.level2').addClass('close2');
                }
            }
        })
    }
    educationTool();

    // Video
    $('.video').on('click touch', function (event) {
        event.stopPropagation();
        var $this = $(this);
        $this.find('.video-overlay, .video-action').fadeOut();
        $this.find('video').addClass('active').get(0).play();
    });


    //Call slider
    function sliderModify(parent, child) {
        $(window).on('resize load', function () {
            var $this = $(this),
                w_this = $this.width();
            if (w_this < 768) {

                parent.each(function () {
                    var $this = $(this);
                    if ($this.find(child).length == 1) {
                        $this.slick({
                            dots: true,
                            centerPadding: '0',
                            arrows: false
                            // adaptiveHeight: true
                            // variableWidth: true
                        });
                    }
                    else {
                        $this.on('init', function(event, slick) {
                          setHeightslider(parent, child);
                        })
                        $this.slick({
                            centerMode: true,
                            centerPadding: '30px',
                            slidesToShow: 1,
                            dots: true,
                            arrows: false,
                            infinite: false
                        });
                    }
                });

            }
            else {
                if (parent.hasClass('slick-initialized')) {
                    parent.slick('unslick');
                    child.removeAttr('style');
                }
            }
        });
    }

    sliderModify($('.video-box'), $('.box'));
    sliderModify($('.pin-board-box'), $('.pin-board'));


    function setHeightslider(parent, child) {
      var max_height = 0;
      parent.each(function() {
        max_height = 0;
        var $this = $(this);
        $this.find(child).each(function() {
            h_this = $this.find(child).outerHeight();
            if( h_this > max_height) {
                max_height = h_this;
            }
        });
        $this.find(child).animate({'min-height': max_height + 'px'}, 500);
      });
    }

    // supergraphic slider
    $('.supergraphic-slider-box').slick({
        slidesToShow: 1,
        dots: true,
        adaptiveHeight: true
    });


    // Dotdotdot
    $(".item-info__description").each(function () {
        $(this).dotdotdot({
            height: 90
        });
    })
    var height = 0;
    height = $(".nav-tabs li").outerHeight(true) + 10;
    $(".nav-tabs").css({

        "height": height
    });


    // Nav tabs
    $(window).on(orientationEvent, function () {
        var $this = $(this),
            w_this = $this.width();
        if (w_this < 768) {
            var childTabWidth = 0;
            var height = 0;
            $('.nav-tabs li').each(function () {
                // console.log($(this)[0].getBoundingClientRect().width);
                childTabWidth += $(this)[0].getBoundingClientRect().width;
                height = $(this).outerHeight(true) + 10;
            });
            $(".nav-tabs").css({
                "width": childTabWidth,
                "height": height
            });
        }
        else {
        }
    });


    // Cookie banner
    if (checkCookie('cookieAccept') != 'on') {
        $('.cookie-wrap').hide();
        $('body').addClass('cookiebanner'); //Adds a class tothe <body> tag when the banner is visible
        setTimeout(function () {
            $('body.cookiebanner .cookie-wrap').slideDown(400);
        }, 1000);
    }

    $(document).on('click', '#cookieBanner .btn-green', function (e) {
        createCookie('cookieAccept', 'on', 14); // Create the cookie and keep it in 14 days
        $('#cookieBanner').remove();
    });

    // Education selector header
    $(".mini-accordion").on('click',function(){
        var $this = $(this);
        $this.next('.education-selector-content').animate({
            height: 'toggle',
            opacity: 'toggle'
        },500);
        $this.toggleClass("active");
        $this.next('.education-selector-content').toggleClass("active");
    });

    //tab education selector header
    $('ul.tabs li:last').addClass('active');
    $('.block article').hide();
    $('.block article:last').show();
    $('ul.tabs li').on('click',function(){
        $('ul.tabs li').removeClass('active');
        $(this).addClass('active')
        $('.block article').hide();
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).show();
        return false;
    });

    //list subject accordion
    //$(".list-subjects-box .accordion .link").click(function () {
    //    var rest = $('.accordion.editor').find('.accordion-cont:visible').not($(this).next().next());
    //
    //    $(this).next().next().slideToggle('').addClass('open');
    //    rest.slideUp();
    //    $(this).toggleClass("active");
    //    $('.accordion .link.active').not(this).removeClass('active');
    //    $('.accordion .link').not(this).next().next().removeClass('open');
    //
    //    if ($(this).hasClass('active')) {
    //        $(this).next().next().addClass('open');
    //    }
    //    else {
    //        $(this).next().next().removeClass('open');
    //    }
    //});

});
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