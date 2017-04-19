# Tweeter

A single-page AJAX-based Twitter clone that uses jQuery, HTML5 and CSS3.
Take a look at the deployed [heroku app!](https://desolate-citadel-65011.herokuapp.com/)(https://desolate-citadel-65011.herokuapp.com/)

## Getting Started

1. Fork and clone your fork of this repository.
2. Install dependencies: `npm install` or `npm i` for short.
3. Start the web server from the command line: `npm run local`
4. Open the app on <http://localhost:8080/> and make sure that it's loading.

## Dependencies & Troubleshooting

Dependencies:

- Express
- Node 5.10.x or above

**This project assumes that:**

- It is running in our Vagrant machine (and therefore...)
- It is Running with Node 5.10.x or above

## Technical Approach & Objectives

This project is starter (incomplete) code for students to fork and clone, located here.

The server is built with Node and Express and allows users to request and submit tweets via a JSON end-point. The server/express code should not require any change from the student.

Students must work with and implement the HTML, CSS and client-side JS to bring this project to life.

## Final Product

The end result should look and function like this:

!["End Result"](https://d.pr/i/1eyEY/4MEH16BY+)

## Project Details
### Goal
A simple single-page AJAX-based Twitter clone that uses jQuery, HTML5 and plain ol' CSS3 to help web bootcamp students get comfortable with their front-end chops with those technologies.

The server is built with Node, Express and Mongo and allows users to request and submit tweets via a JSON end-point. The server/express code should not require any change from the student.

Students must work with and implement the HTML, CSS and client-side JS to bring this project to life.

### Functional Requirements
* Single page app architecture.
* Use ajax to communicate w/ Tweeter backend server
* Tweets should be persisted to MongoDB and survive server restart

Page Contains:

1. Navbar

* fixed to top
* Padding on both sides
* Should look similar if not identical to image/gif provided
* contains Compose button, which:
* Toggles display of inline compose box (animation required)
* Auto-focuses the textarea in the compose box

2. Tweet compose box

* Contains form to submit tweet, above the tweets
* Form contains: tweet textarea, tweet submit button (left aligned), character counter (right aligned)
*  validates input on submit and indicates input errors (alerts are okay)
* Character counter updates on keypress and turns red (or similar) when count > 140 chars
* Does not submit (alert feedback) if empty or count > 140 (should be smart enough to catch empty spaces (" ") as text [minor])
*  refreshes tweet list when successfully submitted

3. List of tweets

* Order by post time descending (reverse chronological)
Each tweet:
* Must look like the tweet [major]
* Should have semantic HTML tags (article, etc) [minor]
* Contains:
* user avatar
* user name
* user handle
* tweet text (not required to handle carriage return / new line)

### Stack Requirements
* ES6 (Simple, client side JS)
* jQuery (Ajax)
* CSS3 (rounded corners, transitions, etc.)
* Semantic HTML5 tags (section, article, etc)
* git for version control
* mongodb for persistance
