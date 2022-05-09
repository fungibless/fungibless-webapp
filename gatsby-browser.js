import './src/assets/css/bootstrap.min.css';
import './src/assets/css/animate.css';
import './src/assets/css/magnific-popup.css';
import './src/assets/css/owl.carousel.css';
import './src/assets/css/off-canvas.css';
import './src/assets/css/ico-moon-fonts.css';
import './src/assets/css/sc-spacing.css';
import './src/assets/css/style.css';
import './src/assets/css/responsive.css';

import $ from 'jquery';
import WOW from 'WOW';
import wrapWithProvider from './wrap-with-provider';

export const wrapRootElement = wrapWithProvider;

export function onRouteUpdate({ locatoin, prevLocation }) {
  const counter = $('.counter');
  console.log(counter);
  if (counter.length) {
    counter.counterUp();
  }
}

export function onInitialClientRender() {
  new WOW().init();

  $('.expeander-iteam-area').on('click', function () {
    $(this).parent().toggleClass('expeand-bottom-content');
  });

  const navexpander = $('#nav-expander');
  if (navexpander.length) {
    $('#nav-expander,  #nav-close2').on('click', (e) => {
      e.preventDefault();
      $('body').toggleClass('nav-expanded');
    });
  }

  $('.mobile-navbar-menu a').each(function () {
    const href = $(this).attr('href');
    if (href === '#') {
      $(this).addClass('hash');
    } else {
      $(this).removeClass('hash');
    }
  });

  $.fn.menumaker = function (options) {
    const mobile_menu = $(this); const
      settings = $.extend({
        format: 'dropdown',
        sticky: false,
      }, options);

    return this.each(() => {
      mobile_menu.find('li ul').parent().addClass('has-sub');
      const multiTg = function () {
        mobile_menu.find('.has-sub').prepend('<span class="submenu-button"><em></em></span>');
        mobile_menu.find('.hash').parent().addClass('hash-has-sub');
        mobile_menu.find('.submenu-button').on('click', function () {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open-sub')) {
            $(this).siblings('ul').removeClass('open-sub').hide('fadeIn');
            $(this).siblings('ul').hide('fadeIn');
          } else {
            $(this).siblings('ul').addClass('open-sub').hide('fadeIn');
            $(this).siblings('ul').slideToggle().show('fadeIn');
          }
        });
      };

      if (settings.format === 'multitoggle') { multiTg(); } else { mobile_menu.addClass('dropdown'); }
      if (settings.sticky === true) { mobile_menu.css('position', 'fixed'); }
      const resizeFix = function () {
        if ($(window).width() > 991) {
          mobile_menu.find('ul').show('fadeIn');
          mobile_menu.find('ul.sub-menu').hide('fadeIn');
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    });
  };

  $('#mobile-navbar-menu').menumaker({
    format: 'multitoggle',
  });
}
