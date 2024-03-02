$(document).ready(() => {
  const $body = $('body'); 
  $body.html(''); // Using <element tag>.html('') clears an element. Everytime I refresh teh LiveServer page, this erases any tweets added to the body, which is why we have to make a new div to append tweets to instead.

  const $tweetsDiv = $('<div id="tweets"></div>') // Create div that tweets will appear in so they dont vanish when body is cleared
  $body.append($tweetsDiv); // This adds the Tweets div into the body
  let $unLink = $('<div id="nameClick" ></div>'); // Defining here so its accessible by the Click event // Moving the whole div out here makes the UN vanish 
  let $itsYou = null; // Will be reassigned to username you click

  function futureFunc() { // fF Start -------------------------------------------

    // Create Tweet Start ----------------------
    // Below is a func: a Var thats the result of mapping
    const $tweets = streams.home.map((tweet) => { // OG code:
      const $tweet = $('<div></div>'); // Creates a div for each individual new tweet
    // const text = `@${tweet.user}: ${tweet.message}`; // OG: Combines username with the message into a String & assigns it to a var
    const text = `: ${tweet.message}`; // Changed to just the msg text, adding UN as a new div in front of this
        $tweet.text(text); // Adds msg var to the tweet div
// Create Tweet End -----------------------------
    
    // Make Username Div Start ----------------------------------
    // -Clicking it should show the users timeline, meaning only their posts (I think) where are those?
    // Reassigning this instead of defining it here so a later click even will work
    $unLink = $('<div id="nameClick" ></div>'); // new UN div // Moving this outside Func too just in case it works
    // Set the UN text inside the 'div' tag
    $unLink.text(`@${tweet.user}`)
    // Add the UN to the front of the tweet div
    $tweet.prepend($unLink);

// Make Username Div End ----------------------------------

// Timestamp Creation Start-------------------------
// Display the timestamps of when the tweets were created in a human-friendly way (eg “10 minutes ago”).
// Use library called Moment.js

// Create timestamp div
let $timeStampDiv = $('<div></div>'); // Makes a div to put the timestamps in
let callTime = moment().calendar(); // Exact time post was made
let pastTime = moment().startOf(callTime).fromNow(); // How much time has passed since posted
// console.log('Moment time: ', pastTime + ': ' + callTime); // Logs what I want!!!
let tweetStamp = pastTime + ': ' + callTime;
// Adds the time var to the div I made for the combined time stamp
$timeStampDiv.text(tweetStamp);
// Adds the timeStamp div to the tweet div 
$tweet.append($timeStampDiv)
// Timestamp Creation End------------------------

    return $tweet; // returns 3 divs: 1 contains UN, 1 the Msg, last the timeStamp
  }
  
  );
  $tweetsDiv.append($tweets); // Adds 1 div containing 3 divs: UNs, tweets, & timestamps to tweetsDiv




} // fF End --------------------------------------------------------------



// Show Tweets start ---------------------------------------------------
// Show the user new tweets: automatically or manually (button).
// I want a Func Call to add tweets automatically: 1000 milSecs = 1 sec
let addTweets = setInterval(futureFunc, 1000); // Despite the EXs I found showing the () or "" where needed, it only works when just the func name is present
// Auto showing these is a bad idea, the page gets ridiculously long
// W3Schools says this will stop it:
function stopTweetTimer(){ // If you dont put it in a func, it'll stop them immediately
  clearInterval(addTweets); // This will stop the adding process
}
setInterval(stopTweetTimer, 6000); // This stops the adding process after 6 secs to keep page from flooding
// Show Tweets End -----------------------------------------------------


// Hover highlight just to verify div selection ----------------------------------
$body.on({
  mouseenter: function() {
      $(this).css("background-color", "lavender");
  },
  mouseleave: function() {
      $(this).css("background-color", "transparent");
  }
}, "#nameClick");
// Hover highlight End -----------------------------------------------------------


// 1 Users tweets func start ------------------------------------------------
// on-click event to call the tweet generating function
// $( "#target" ).on( "click", function() { // OG version
$body.on("click", "#nameClick", function() { // I need this to work when I click a username
  // $itsYou = $(this).text().substring(1); // reassigns $itsYou to string of the clicked username without @ sign
  $itsYou = $(this).text(); // UN with the at sign 
  // Clear the Tweet feed
$tweetsDiv.html(''); 
console.log($itsYou);

// reassign $itsYou to name that was clicked
// $itsYou = $unLink.text(`@${tweet.user}`) // ??
// console.log($itsYou)

// append result of calling just that one users tweets
// SO give fF an Optional param & call it with $itsYou
// futureFunc($itsYou)
// If I just have to call fF with a param, it should return/append for me, right?

});
// 1 Users tweets func end ------------------------------------------------




}); // End of Document function




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



