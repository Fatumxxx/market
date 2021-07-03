$(function () {

    $('input:checkbox,input:radio,select').styler();

    $('.slider__inner').slick({
        arrows: true,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
    });

    $('.shares__slider').slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1860,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1128,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                    dots: false,
                    arrows: false,
                }
            }
        ]
    });

    $('.selected__slider').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    lidesToShow: 2,
                    centerMode: true,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                }
            }
        ]
    });

    $('.category__products').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1860,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1128,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 2,
                    variableWidth: true,
                    centerMode: true,
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                }
            }
        ]
    });

    $('.logotypes__inner').slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1860,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1128,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                }
            }
        ]
    });

    $('.blog__slider').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1860,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1128,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true
                }
            }
        ]
    });

    $('.menu__btn').on('click', function () {
        $('.header__menu-list').slideToggle();
    });

    $('.sale__inner-slider').slick({
        arrows: true,
        slidesToScroll: 2,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 1200,
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1260,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: true,
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                }
            }
        ]
    });

    $(".range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 3000,
        from: 50,
        to: 2500,
        postfix: "g"
    });

    $(".js-range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 200,
        from: 9,
        to: 145,
        prefix: "$"
    });

    $('.product__list-slider').slick({
        arrows: true,
        dots: true,
        slidesToScroll: 2,
        slidesToShow: 5,
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: true,
                }
            },
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                    arrows: false,
                    dots: false,
                }
            }
        ]
    });

    $(document).ready(function () {
        $('.minus').click(function () {
            var $input = $('.number__btn').parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.plus').click(function () {
            var $input = $('.number__btn').parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
    });

    $('.checkings-btn').on('click', function () {
        $('.select').slideToggle();
    });
    $('.product-list__mobile-aside').on('click', function () {
        $('.product-list__mobile-menu').slideToggle();
        return false;
    });
    $('.first').on('click', function () {
        $(this).addClass('active');
        $('.mobile-menu__aside-filter').addClass('active');
        $('.second').removeClass('active');
        $('.mobile-menu__aside-item').removeClass('active');
    });
    $('.second').on('click', function () {
        $(this).addClass('active');
        $('.mobile-menu__aside-item').addClass('active');
        $('.first').removeClass('active');
        $('.mobile-menu__aside-filter').removeClass('active');
    });

    $('.main-form__tabs .tab').on('click', function (event) {
        var id = $(this).attr('data-id');
        $('.main-form__tabs').find('.tab-item').removeClass('active-tab').hide();
        $('.main-form__tabs .tabs').find('.tab').removeClass('active');
        $(this).addClass('active');
        $('#' + id).addClass('active-tab').fadeIn();
        return false;
    });

    $('.main-form__mobile-tabs').on('click', function () {
        $('.tabs').slideToggle();
    });

    $('.product-page__tabs .tab').on('click', function (event) {
        var id = $(this).attr('data-id');
        $('.product-page__tabs').find('.tab-item').removeClass('active-tab').hide();
        $('.product-page__tabs .tabs').find('.tab').removeClass('active');
        $(this).addClass('active');
        $('#' + id).addClass('active-tab').fadeIn();
        return false;
    });

    $('.product-mobile__tab-item').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        adaptiveHeight: true,
        asNavFor: '.tabs_slide'
    });
    $('.tabs_slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.product-mobile__tab-item',
        centerMode: true,
        focusOnSelect: true,
        arrows: true,
        fade: true,
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
    });

    $('.product-page__slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.product-page__slider-nav',
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
    });

    $('.product-page__slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: true,
        asNavFor: '.product-page__slider-for',
        prevArrow: '<button class="slick-arrow slick-prew"></button>',
        nextArrow: '<button class="slick-arrow slick-next"></button>',
    });


    $(".rate-star").rateYo({

        rating: 3,
        spacing: "15px",
        starWidth: "20px",
        ratedFill: "#4c4c4c",
        normalFill: "#fff",
        readOnly: 'true',
        starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="#4c4c4c" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>'
    });



    var mix = mixitup('.selected__products');
});