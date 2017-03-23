"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweetr";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  db.collection('tweets').find().toArray((err, results) => {
    if(err) throw err;

    console.log('results array', results);

    db.close();
  })

  // ==> long hand way of getting tweets
  // Get all tweets
  // db.collection('tweets').find({}, (err, results) => {
  //   if(err) throw err;
  //
  //   // ==> this was an old way of itering the cursor.
  //   // console.log('For each item yielded by the cursor:');
  //   // results.each((err, item) => {
  //   //   console.log(" ", item);
  //   // })
  //
  //   results.toArray((err, resultsArray) => {
  //     if(err) throw err;
  //
  //     console.log('resultsArray', resultsArray);
  //   })
  //
  //   // ==> At the end, we close the connection:
  //   db.close();
  // })
});
