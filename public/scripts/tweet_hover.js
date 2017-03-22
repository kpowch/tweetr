/*
Adds the 'animation' of hovering over an old tweet post - i.e. change header
opacity, show buttons, darker border, etc.
*/

// wait until html is loaded so js doesn't run until it has elements to act on
$(document).ready(function() {
  $('.tweet').on('mouseenter', function() {
    // add hover class to article so border gets darker
    $(this).addClass('hover');
    // add hover class to header so it become less opaque
    $(this).children('header').addClass('hover');
    // show the icons
    $(this).children('footer').children('.icons').show();
  });

  $('.tweet').on('mouseleave', function() {
    $(this).removeClass('hover');
    $(this).children('header').removeClass('hover');
    $(this).children('footer').children('.icons').hide();
  });
});
