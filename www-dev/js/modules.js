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