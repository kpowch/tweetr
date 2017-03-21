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
    $(this).parent().children('span').text(charCount)

    // change color of counter to red if < 0
    if(charCount < 0) {
      $(this).parent().children('span').addClass('too-long');
    } else {
      $(this).parent().children('span').removeClass('too-long');
    }
  })
});
