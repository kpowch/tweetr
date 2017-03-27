"use strict";

const userHelper    = require("../lib/util/user-helper");
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      isLiked: false //[] // array of userids like like the speciifc tweet
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send(tweet);
      }
    });
  });

  // for liking tweets.
  // TODO should this be put?
  tweetsRoutes.post("/:id/like", function(req, res) {
    DataHelpers.toggleTweetLike(req.params.id, (err, tweet) => {
      if (err) {
        // TODO what is best status code?
        res.status(500).json({ error: err.message });
        console.log('error in tweets.js');
      } else {
        // TODO what do i do otherwise?
        res.status(201).send(tweet);
      }
    });
  });

  return tweetsRoutes;

}
