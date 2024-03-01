
$(document).ready(() => {
  const $body = $('body'); 
  $body.html(''); // Using .html('') clears an element. So this erases any tweets added to the body, which is why we're meant make a new div to add tweets to instead.
// Everytime I refresh LS, an entire new set of Tweets appears. This is intended, I think.

  const $tweetsDiv = $("<div id=tweets></div>") // Create div that tweets will appear in so they dont vanish when body is cleared
  $body.append($tweetsDiv); // This adds the Tweets div into the body

  // Wrapping this in a func so I can set a timer to call it every few seconds
  function futureFunc() {
  // Below is NOT a func: Var thats the result of mapping
  const $tweets = streams.home.map((tweet) => { // Generates a set number of new tweets
    const $tweet = $('<div></div>'); // Creates a div for each individual new tweet
    // Make Username Clickable Start ----------------------------------
    // How do I select the usernames?  `@${tweet.user} on line 15 is a clue maybe?
    // Clicking it should show the users timeline, meaning only their posts (I think) where are those?
    // streams.users has an array of the usernames. Are these their timelines?
    let $uNSelect = tweet.user
    // console.log(uNSelect) // This logs the usernames
    // Do I need to make a new Username div, or am I meant to modify the one that already exists?
    // Making a tag set for now until someone answers my question.
    let $unLink = $('<a>'); // Create new anchor element/tag
    // Make the href attribute link to the users page (use google till I can figure that out)
    $unLink.attr("href", "https://www.google.com/");
    // Set the link text between the 'a' tags
    $unLink.text(tweet.user)
    // move this block above the const text just in case
    // Make Username Clickable End ----------------------------------

    const text = `@${tweet.user}: ${tweet.message}`; // Testing
    // const text = `@${tweet.user}: ${tweet.message}`; // OG: Combines username with the message into a String & assigns it to a var
    console.log(typeof text) // Ok the lil tics are making this a text string only

    $tweet.text(text); // Adds combo username + msg var to the individual divs

// Timestamp Creation Start-------------------------
/**
- Display the timestamps of when the tweets were created.
This timestamp should reflect the actual time the tweets were created, 
and should not just be hardcoded.
- Show when the tweets were created in a human-friendly way (eg “10 minutes ago”).
You’ll want to use a library to do this work for you.
A very popular libary is called Moment.js
 */
// Create timestamp div
let $timeStampDiv = $('<div></div>'); // Makes a div to put the timestamps in
let callTime = moment().calendar(); // Exact time post was made
let pastTime = moment().startOf(callTime).fromNow(); // How much time has passed since posted
// console.log('Moment time: ', pastTime + ': ' + callTime); // Logs what I want!!!
let tweetStamp = pastTime + ': ' + callTime;
// console.log(tweetStamp)
// Adds the time var to the div I made for the full time stamp
$timeStampDiv.text(tweetStamp);
// Adds the timeStamp div to the tweet div 
$tweet.append($timeStampDiv)
// Timestamp Creation End------------------------


    return $tweet; // returns 2 divs: 1 contains UN + Msg, the 2nd has the timeStamp
  });
  $tweetsDiv.append($tweets); // NOT A FUNC: Adds 16 tweets (and their timestamps) at a time to tweetsDiv
}
// Show Tweets start ---------------------------------------------------
// Show the user new tweets somehow. (You can show them automatically as they’re created, or create a button that displays new tweets.)
// I want a Func Call to add tweets automatically: 1000 milSecs = 1 sec
  let addTweets = setInterval(futureFunc, 2000); // Despite the EXs I found showing the () or "" where needed, it only works when just the func name is present
  // Auto showing these may be a bad idea, the page gets ridiculously longafter a while
  // Isnt there a way to stop it?
  // W3Schools says:
  function stopTweetTimer(){ // If you dont put it in a func, it'll stop them immediately
    clearInterval(addTweets); // This will stop the adding process
  }
  setInterval(stopTweetTimer, 6000); // This stops the adding process after 6 secs to keep page from flooding
// Show Tweets End -----------------------------------------------------

});

  /**
   * Above code only gets the first 10 generated tweets. We have to edit the above code EXCEPT FOR the document ready line.
She also recommends putting it into a function to call.
She recs creating a new div to adding tweets to instead of the body since there is a body clearing command.
We have to have something that clears old tweets & only loads new ones.

 * Assignment Requirements:
 * 1) Must have new tweets appear: Either wih a button click or an automatic refreshing code.
 * 2) Each tweet must have a timestamp for when its made. Dont hard code it.
 * 3) Taylor says do this last > Design interface: Make it pretty, prolly with CSS
 * 4) Make username clickable & it opens that users timeline(?)
 * 5) Simlar to part 2 - Show how many minutes/hours ago a tweet was made.
 * Its recommended to use a library called Moment.js
 * 6) Allow user to Tweet: So have a text field with a post button somewhere on the page.
 * Data-generator has code we're meant to reference BUT NOT CHANGE
 * 
Theres bonus work but dont worry about it until I get the basics done.
 */



