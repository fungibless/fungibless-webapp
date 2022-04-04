import "./src/assets/css/bootstrap.min.css"
import "./src/assets/css/animate.css"
import "./src/assets/css/magnific-popup.css"
import "./src/assets/css/owl.carousel.css"
import "./src/assets/css/off-canvas.css"
import "./src/assets/css/ico-moon-fonts.css"
import "./src/assets/css/sc-spacing.css"
import "./src/assets/css/style.css"
import "./src/assets/css/responsive.css"

import $ from 'jquery'
import WOW from 'WOW'
import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

export const onRouteUpdate = ({ location, prevLocation }) => {
    console.log(prevLocation ? prevLocation.pathname : null, " => ",location.pathname)    
    $(".loader_first").show()
    $(".loader_first").delay(500).fadeOut(300)
}

export const onInitialClientRender = () => {

    new WOW().init();

    $('.mobile-navbar-menu a').each(function () {
        var href = $(this).attr("href");
        if (href === "#") {
            $(this).addClass('hash');
        } else {
            $(this).removeClass('hash');
        }
    });

    $.fn.menumaker = function (options) {
        var mobile_menu = $(this), settings = $.extend({
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function () {
            mobile_menu.find('li ul').parent().addClass('has-sub');
            var multiTg = function () {
                mobile_menu.find(".has-sub").prepend('<span class="submenu-button"><em></em></span>');
                mobile_menu.find(".hash").parent().addClass('hash-has-sub');
                mobile_menu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open-sub')) {
                        $(this).siblings('ul').removeClass('open-sub').hide('fadeIn');
                        $(this).siblings('ul').hide('fadeIn');
                    }
                    else {
                        $(this).siblings('ul').addClass('open-sub').hide('fadeIn');
                        $(this).siblings('ul').slideToggle().show('fadeIn');
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else mobile_menu.addClass('dropdown');
            if (settings.sticky === true) mobile_menu.css('position', 'fixed');
            var resizeFix = function () {
                if ($(window).width() > 991) {
                    mobile_menu.find('ul').show('fadeIn');
                    mobile_menu.find('ul.sub-menu').hide('fadeIn');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };

    $("#mobile-navbar-menu").menumaker({
        format: "multitoggle"
    });
}

// export const onClientEntry = () => {}