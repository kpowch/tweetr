/*
Calculates the number of characters for the tweet compose form
*/

// wait until html is loaded so js doesn't run until it has elements to act on
$(document).ready(function() {

  $('.new-tweet textarea').on('keyup', function() {
    const maxLength = 140; // max string length from requirements
    let tweetLength = $(this).val().length; // length of current tweet string
    let charCount = maxLength - tweetLength;

    // change value of counter by traversing the form instead of explicitly using the counter class
    $(this).parent().children('span.counter').text(charCount)

    // change color of counter to red if < 0
    if(charCount < 0) {
      $(this).parent().children('span.counter').addClass('too-long');
      $('.new-tweet .invalid-tweet').text('Tweet too long!').show();
      $('.new-tweet textarea').focus();
    } else {
      $(this).parent().children('span.counter').removeClass('too-long');
      $('.new-tweet .invalid-tweet').hide();
    }
  })
});
