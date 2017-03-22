/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary).
// TODO: Eventually will get this from the server.
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

/*
Takes tweet object and reters a tweet <article> element containing the
entire HTML structure of the tweet.
*/
function createTweetElement(tweet) {
  const avatar = tweet.user.avatars.small;
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  const contentText = tweet.content.text
  const createdAt = tweet.created_at;

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
function renderTweets(tweets) {
  tweets.forEach( function(element) {
    let $tweet = createTweetElement(element);
    $('#tweets-container').append($tweet);
  });
}

$(document).ready(function() {
  renderTweets(data);
});
