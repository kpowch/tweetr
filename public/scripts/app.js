/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/*
Adds the 'animation' of hovering over an old tweet post - i.e. change header
opacity, show buttons, darker border, etc.
*/
function hoverAnimation() {
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
    // hide the icons
    $(this).children('footer').children('.icons').hide();
  });
}

/*
Takes tweet object and reters a tweet <article> element containing the
entire HTML structure of the tweet.
*/
function createTweetElement(tweetObject) {
  const avatar = tweetObject.user.avatars.small;
  const name = tweetObject.user.name;
  const handle = tweetObject.user.handle;
  const contentText = tweetObject.content.text
  const createdAt = tweetObject.created_at;

  // TODO: split these up into variables like header, footer to modularize it
  // and make it look more readable
  let $tweet = $('<article>').addClass('tweet')
    .append($('<header>')
      .append($('<img>').attr('src', avatar))
      .append($('<h2>').text(name))
      .append($('<span>').text(handle))
    )
    .append($('<p>').text(contentText)
    )
    .append($('<footer>')
      .append($('<span>').text(createdAt))
      .append($('<div>').addClass('icons')
        .append($('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true'))
        .append($('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true'))
        .append($('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true'))
      )
    )
  return $tweet;
}

/*
Responsible for taking in an array of tweet objects and then appending each one
to the #tweets-container, leveraging the createTweetElement function.
*/
function renderTweets(tweetArray) {
  tweetArray.forEach( function(tweetObject) {
    let $tweet = createTweetElement(tweetObject);
    $('#tweets-container').prepend($tweet); // appends it to front
  });
}

/*
Responsible for fetching tweets from database using jQuery to make a request to
/tweet. Receives the array of tweets as JSON
*/
// TODO handle the error?
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  }).done( function(allTweets) {
    renderTweets(allTweets);
    hoverAnimation();
  }).fail( function(err) {
    console.log('Error:', err)
  });
}

/*
This runs onces the html is loaded
================================================================================
*/
// TODO handle the error in ajax post?
$(document).ready(function() {
  loadTweets();

  $("form[action='/tweets/']").on('submit', function(event) {
    event.preventDefault(); // to prevent redirection to /tweets
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $('.new-tweet textarea').serialize() // same as 'text: ($...).val()'
    }).done( function(newTweet) {
      $('.new-tweet textarea').removeClass('error');
      $('.new-tweet textarea').val(''); // gets rid of text once submitted
      $('.new-tweet textarea').focus(); // keeps cursor in textarea

      // add new tweet to collection of tweets
      renderTweets([newTweet]);
      // add animation to old tweets when hovering
      hoverAnimation();
    }).fail(function(err) {
      $('.new-tweet textarea').addClass('error');
      console.log('Error:', err)
    })
  })
});
