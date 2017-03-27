/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function handleLikeIncrementClicks(event) {
  const $tweetLikes = $(this).parents('.icons').children('.heart-number');
  var tweetLikesNum = $tweetLikes.data('likes');
  var tweetid = $(this).parents('article.tweet').data('id');
  $.ajax({
    url: `/tweets/${tweetid}/like`,
    method: 'POST',
    data: tweetLikesNum,
  }).done(function (res) {
    if(res.isLiked) {
      $tweetLikes.text(1).attr('data-count', 1);
    } else {
      $tweetLikes.text(0).attr('data-count', 0);
    }
  })
}

function toggleNewTweet() {
  $('.new-tweet').slideToggle();
  $('.new-tweet textarea').focus();
  document.body.scrollTop = 0; // scrolls the window to the top
}

/*
Takes tweet object and reters a tweet <article> element containing the
entire HTML structure of the tweet.
*/
function createTweetElement(tweetObject) {
  // Note: mongo adds an object id so we don't have to generate a new one per tweet
  const id = tweetObject._id;
  const avatar = tweetObject.user.avatars.small;
  const name = tweetObject.user.name;
  const handle = tweetObject.user.handle;
  const contentText = tweetObject.content.text;
  const createdAt = tweetObject.created_at;
  const timestamp = new Date(createdAt).toJSON();
  const likeCount = !!tweetObject.isLiked ? 1 : 0;

  let $tweet = $('<article>').addClass('tweet').attr('data-id', id );

  let $header = $('<header>')
    .append($('<img>').attr('src', avatar))
    .append($('<h2>').text(name))
    .append($('<span>').text(handle));

  let $icons = $('<div>').addClass('icons');
  ['flag', 'retweet', 'heart'].forEach((icon) => {
    $icons.append($('<i>').addClass('fa fa-' + icon).attr('aria-hidden', 'true'))
          .append($('<span>').addClass(icon + '-number number').attr('data-count', 0).text(0));
  })

  let $footer = $('<footer>')
    .append($('<time>').addClass('timeago').attr('datetime', timestamp))
    .append($icons);

  $tweet
    .append($header)
    .append($('<p>').text(contentText))
    .append($footer);

  $tweet.find('.heart-number').text(likeCount).attr('data-count', likeCount);

  // add even handle to 'heart' icon to enable likes
  $tweet.find('.fa-heart').on('click', handleLikeIncrementClicks);

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
    $("time.timeago").timeago();
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
  }).fail( function(err) {
    console.log('Error:', err);
  });
}

/*
This runs once the html is loaded
================================================================================
*/
// TODO handle the error in ajax post?
$(document).ready(function() {
  loadTweets();
  $('.new-tweet .invalid-tweet').hide();

  // new tweet submit actions
  $("form[action='/tweets/']").on('submit', function(event) {
    event.preventDefault(); // to prevent redirection to /tweets
    const $tweetTextarea = $('.new-tweet textarea');
    const tweetText = $tweetTextarea.val();

    if (tweetText.trim().length === 0) {
      $('.new-tweet .invalid-tweet').text('Tweet too short!').show();
      $tweetTextarea.focus(); // keeps cursor in textarea
      return;
    } else if (tweetText.length > 140) {
      // note: char counter handles error flash for count too long
      $tweetTextarea.focus(); // keeps cursor in textarea
      return;
    }

    $('.new-tweet .invalid-tweet').hide();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $tweetTextarea.serialize() // same as 'text: ($...).val()'
    }).done( function(newTweet) {
      $tweetTextarea.val(''); // gets rid of text once submitted
      $('.new-tweet span.counter').text(140); // restarts counter
      $tweetTextarea.focus();
      renderTweets([newTweet]); // add new tweet to collection of tweets
    }).fail(function(err) {
      console.log('Error:', err);
    });
  });

});
