"use strict";

var ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, callback(null, true));
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().toArray(callback);
    },

    // increments/decrements the likes on a tweet
    toggleTweetLike: function(id, callback) {
      db.collection('tweets').findOne({_id: ObjectId(id)}, (err, tweet) => {
        db.collection('tweets').update(
          {
            _id: ObjectId(id)
          },
          {
            $set: {
              isLiked: !tweet.isLiked
            }
          }, (err) => {
            if (err) {
              return callback(err);
            } else {
              db.collection('tweets').findOne({ _id: ObjectId(id) }, callback);
            }
          });
      })
    }
  };
}
