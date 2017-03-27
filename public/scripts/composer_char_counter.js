/*
Calculates the number of characters for the tweet compose form
*/

// wait until html is loaded so js doesn't run until it has elements to act on
$(document).ready(function() {

  $('.new-tweet textarea').on('input', function() {
    const maxLength = 140; // max string length from requirements
    const tweetLength = $(this).val().length; // length of current tweet string
    const charCount = maxLength - tweetLength;

    // change value of counter by traversing the form instead of explicitly using the counter class
    $(this).parent().find('span.counter').text(charCount);

    // change color of counter to red if < 0
    if(charCount < 0) {
      $(this).parent().find('span.counter').addClass('too-long');
      $('.new-tweet .invalid-tweet').text('Tweet too long!').show();
      $('.new-tweet textarea').focus();
    } else {
      $(this).parent().find('span.counter').removeClass('too-long');
      $('.new-tweet .invalid-tweet').hide();
    }
  });
});
