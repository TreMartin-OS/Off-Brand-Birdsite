
$(document).ready(() => {
  const $body = $('body'); 
  $body.html(''); // Using <element tag>.html('') clears an element. Everytime I refresh teh LiveServer page, this erases any tweets added to the body, which is why we have to make a new div to append tweets to instead.

  const $tweetsDiv = $('<div id="tweets"></div>') // Create div that tweets will appear in so they dont vanish when body is cleared
  // Create a button that will be used to load new posts
  let $lButton = $('<button id="lButton">Show More Posts</button>');
  $body.prepend($lButton); // Add button to the top of the Page
    $body.append($tweetsDiv); // This adds the Tweets div into the body
  let $unLink = $('<div id="nameClick" ></div>'); // Defining here so its accessible by the Click event // Moving the whole div out here makes the UN vanish 
  let $itsYou = null; // Will be reassigned to username you click

  function futureFunc(optionalUN) { // fF Start -------------------------------------------

    // Declare var to be front of $tweets map method
    let whatToMap; 
    // If-Else state to determine what whatToMap will be
    if (typeof optionalUN !== "undefined") {
      whatToMap = streams.users[optionalUN];
    } else {
      whatToMap = streams.home;
    }


    // Create Tweet Start ----------------------
    // Below is a func: a Var thats the result of mapping
    // const $tweets = streams.home.map((tweet) => { // OG version
    const $tweets = whatToMap.map((tweet) => { // OG version
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


// Show Tweets New start -----------------------------------------------------------------
$lButton.on("click", function() {futureFunc()}); // Click button to load more tweets
// Show Tweets Old start - Show the user new tweets: automatically or manually (button) -----------
// // Auto-loading new tweets is messing up my results
// // Func Call adds tweets automatically: 1000 milSecs = 1 sec
// let addTweets = setInterval(futureFunc, 1000); // Despite the EXs I found showing the () or "" where needed, it only works when just the func name is present
// // Auto showing these is a bad idea, the page gets ridiculously long
// // W3Schools says this will stop it:
// function stopTweetTimer(){ // If you dont put it in a func, it'll stop them immediately
//   clearInterval(addTweets); // This will stop the adding process
// }
// setInterval(stopTweetTimer, 10000); // This stops the adding process after 6 secs to keep page from flooding
// Show Tweets  End -----------------------------------------------------




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
$body.on("click", "#nameClick", function() { // Now works when I click a username
  // $itsYou = $(this).text(); // UN with the at sign 
  $itsYou = $(this).text().substring(1); // reassigns $itsYou to string of the clicked username without @ sign
  // console.log($itsYou); // Logs the name to the console
  // Clear the Tweet feed
  $tweetsDiv.html(''); 
  // ReCall futureFunc with the $itsYou argument
  futureFunc($itsYou);

});
// 1 Users tweets func end ------------------------------------------------




}); // End of Document function