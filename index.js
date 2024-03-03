
$(document).ready(() => {
  const $body = $('body'); 
  // Using <element tag>.html('') clears an element. Everytime I refresh the LiveServer page, this erases all tweets added to the body, which is why we have to make a new div to append tweets to instead.
  $body.html(''); 

  // Create a div that tweets will be attached to so they dont vanish when body is cleared
  const $tweetsDiv = $('<div id="tweets"></div>') 
  // Add the Tweets div to the Body
    $body.append($tweetsDiv); 

  // Create a button that will be used to load new posts
  let $lButton = $('<button id="lButton">Show More Posts</button>');
  // Add button to the top of the Page
  $body.prepend($lButton); 

    // Define the UserName link div here so its accessible by the Click event later
  let $unLink = $('<div id="nameClick" ></div>'); 
  // This will be reassigned to the username you click in the Click event
  let $itsYou = null; 


  function futureFunc(optionalUN) { // fF Start -------------------------------------------

    // Declare var to be assigned to the text at the beginning of the $tweets map method depnding on optional Param/Arg
    let whatToMap; 
    // If there IS a name input
    if (typeof optionalUN !== "undefined") {
      whatToMap = streams.users[optionalUN];
      // If there is NOT a name input
    } else {
      whatToMap = streams.home;
    }

// Create Tweet Start ----------------------
    // Below is a func: a Var thats the result of mapping
    // const $tweets = streams.home.map((tweet) => { // OG version
    const $tweets = whatToMap.map((tweet) => { // Altered to fit assignment
      // Creates a div for each individual new tweet
      const $tweet = $('<div></div>'); 
    // const text = `@${tweet.user}: ${tweet.message}`; // OG: Combines username with the message into a String & assigns it to a var
    // Changed OG version to just the msg text, adding UN as a new div in front of this
    const text = `: ${tweet.message}`; 
    // Adds msg var to the tweet div
        $tweet.text(text); 
// Create Tweet End -----------------------------
    
// Make Username Div Start ----------------------------------
    // -Clicking it should show the users timeline, meaning only their posts (I think) where are those?
    // I did Define this here but changed it to reassigning so a later Click even will work
    $unLink = $('<div id="nameClick" ></div>'); 
    // Set the UN text inside the 'div' tag
    $unLink.text(`@${tweet.user}`)
    // Add the UN to the front of the tweet div
    $tweet.prepend($unLink);
// Make Username Div End ----------------------------------

// Timestamp Creation Start-------------------------
// Display the timestamps of when the tweets were created in a human-friendly way (eg “10 minutes ago”).
// Use library called Moment.js
// Create div to put the timestamps in
let $timeStampDiv = $('<div></div>'); 
// Assign 1 var to exact time post was made
let callTime = moment().calendar(); 
// Assign another var that tracks how much time has passed since post was made
let pastTime = moment().startOf(callTime).fromNow(); 
// Assign both combined to var so they post the full needed timestamp in the preferred order 
let tweetStamp = pastTime + ': ' + callTime;
// Adds the time var to the div I made for the time stamp
$timeStampDiv.text(tweetStamp);
// Adds the timeStamp div to the end of the tweet div 
$tweet.append($timeStampDiv)
// Timestamp Creation End------------------------

// returns 3 divs: 1 contains UN link, 1 is the Msg, last the timeStamp
    return $tweet; 
  });
  // Adds combined tweet divs to tweetsDiv
  $tweetsDiv.append($tweets); 

} // fF End --------------------------------------------------------------


// Show Tweets New start -----------------------------------------------------------------
// Click button to load more tweets
$lButton.on("click", function() {futureFunc()}); 
// Click functions exist but it didnt work when I used it
// $lButton.on("click", futureFunc); Should have worked but didnt for some reason
// Show Tweets  End -----------------------------------------------------


// Hover highlight to show UN div selection ----------------------------------
// Move this to CSS?
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
// $( "#target" ).on( "click", function() { // OG version that did NOT work
$body.on("click", "#nameClick", function() { // ,= This works
  // reassigns $itsYou to string of the clicked username without @ sign
  $itsYou = $(this).text().substring(1); 
  // Clears the Tweet feed
  $tweetsDiv.html(''); 
  // ReCall futureFunc with the $itsYou argument
  futureFunc($itsYou);

});
// 1 Users tweets func end ------------------------------------------------

}); // End of Document function