
$(document).ready(() => {
  const $body = $('body');
  // Using <element tag>.html('') clears an element. Everytime I refresh the LiveServer page, this erases all tweets added to the body, which is why we have to make a new div to append tweets to instead.
  $body.html('');

  // Create a div that tweets will be attached to so they dont vanish when body is cleared
  const $tweetsDiv = $('<div id="tweetsDiv"></div>')
  // Add the Tweets div to the Body
  $body.append($tweetsDiv);

  // Create a Div ABOVE the tweets div to add buttons & new Post elements to
  let $topDiv = $('<div id="topDiv"></div>')
  // Add this to the top of the body using prepend
  $body.prepend($topDiv);

  // Create a button that will be used to load new posts
  let $lButton = $('<button id="lButton">Show More Posts</button>');
  // Add button to the topDiv
  $topDiv.prepend($lButton);

  // Define the UserName link div here so its accessible by the Click event later
  let $unLink = $('<div id="nameClick" ></div>');
  // This will be reassigned to the username you click in the Click event
  let $itsYou = null;

  // Input Start -----------------------------------------------------------------------------
  // Show more Posts button is adding tweets above the new post section

  // Create Input box for Username
  let $nameBox = $('<input id="unBox"></input>').attr({ type: 'text' })
  // Create a label for it
  let $nbLabel = $("<label></label>").text("Username: ");
  // Add the label in front of the box
  $nbLabel.append($nameBox);
  // Attach UN box + label to: body under the Show More Posts button
  $("#topDiv:nth-child(1)").append($nbLabel);

  // Create Input box for message
  let $msgBox = $('<input id="mBox"></input>').attr({ type: 'text' })
  // Create a label for it
  let $msgLabel = $("<label></label>").text("Message: ");
  // Add the label in front of the box
  $msgLabel.append($msgBox);
  // Attach UN box + label to: body under the Show More Posts button
  $("#topDiv:nth-child(1)").append($msgLabel);

  // Create a button that will be used to add a new post to the top of the list
  let $pButton = $('<button id="pButton">Submit Post</button>');
  // Add button under the text input fields
  $("#topDiv:nth-child(1)").append($pButton);
  // Create new onclick at the bottom of the code
  // Input End -------------------------------------------------------------------------------


  function futureFunc(optionalUN) { // fF Start -------------------------------------------

    // Declare var to be assigned to the text at the beginning of the $tweets map method depnding on optional Param/Arg
    let whatToMap;
    // If there IS a name input and there are already tweets in their Arr
    if (optionalUN !== undefined && streams.users[optionalUN].length > 0) {
      // Assign the newest post they made to a variable (because writeTweet() already made it)
      let newPost = streams.users[optionalUN][streams.users[optionalUN].length - 1];
        // Then assign whatToMap as ONLY that single tweet
        whatToMap = [newPost];
       }
    // If there IS a opN but NO tweets in the Arr
    else if (optionalUN !== undefined && streams.users[optionalUN].length === 0) {
      // Assign it to opN so it will make a new User + tweet
      whatToMap = streams.users[optionalUN];
    }   
    // If there is NOT a name input, assign to streams.home so it makes the random tweets
    else {
      // Assign wTM to this to make sure the randomizer doesnt include tweets made by your visitor
      // And that it doesnt pull every tweet ever made to repost
      whatToMap = streams.home.filter(function(tweet) {return tweet.user !== optionalUN;}).slice(-(Math.floor(Math.random() * (6 - 3 + 1)) + 3));
      // I finally figure out how to choose how many random posts get pulled!!! Hooray!!!  Thank you free code camp!!!
  }

  // Create Tweet Start ----------------------
  // Below is a func: a Var thats the result of mapping
  // const $tweets = streams.home.map((tweet) => { // OG version
  const $tweets = whatToMap.map((tweet) => { // Altered to fit assignment
    // Creates a div for each individual new tweet
    const $tweet = $('<div id="tweet" ></div>');
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
    // return $tweets; // temp change
  });
  // Adds combined tweet divs to front of tweetsDiv
  $tweetsDiv.prepend($tweets); // temp hide
} // fF End --------------------------------------------------------------

// Hover highlight to show UN div selection ----------------------------------
// Move this to CSS?
$body.on({
  mouseenter: function () {
    $(this).css("background-color", "#7CB9E8");
  },
  mouseleave: function () {
    $(this).css("background-color", "transparent");
  }
}, "#nameClick");
// Hover highlight End -----------------------------------------------------------



// Generate & Show New Tweets start -----------------------------------------------------------------
// Click button to load more tweets
$lButton.on("click", function () { 
  // Calling this before fF because it was just pulling from a list of old tweets & still mixing in Visitor ones even tho I told it to exclude them
  generateRandomTweet();
  // NOW calling fF should add only new tweets to the top of the feed
  futureFunc();
});
// Click functions exist but it didnt work when I used it
// $lButton.on("click", futureFunc); Should have worked but didnt for some reason
// Generate & Show New Tweets End -----------------------------------------------------

// Show only this users tweets Start ------------------------------------------------
// Create On click event for clicking a username
$body.on("click", "#nameClick", function () {
  // reassigns $itsYou to string of the clicked username without @ sign
  $itsYou = $(this).text().substring(1);
  // Clears the Tweet feed
  $tweetsDiv.html(''); //This HAS to be cleared so you only see their Tweets
  // ReCall futureFunc with the $itsYou argument
  futureFunc($itsYou);
  // Because of changes made to futureFunc, its only showing the single tweet you clicked riht now
});
// Show only this users tweets end ------------------------------------------------


// Visitor Creation tweets start ------------------------------------------------
// Create an on function that responds to a click (.onClick didnt let me pass in something ive forgotten about, dang)
$body.on("click", "#pButton", function () { 

  // CHECK if the visitor var been assigned
  // WAIT I gotta handle if the username gets changed too!
  if (typeof visitor === 'undefined') {
    // Assign the global visitor var to the value entered in unBox
    visitor = $("#unBox").val();
    // add username to the streams object
    streams.users[visitor] = [];
  } // What do if the name wasnt undefined but was also changed?
  else {}

  // THIS takes the message written inside mBox, turns it into a string & assigns it to a var
  $urMSG = $("#mBox").val().toString();
  // Call writeTweet with the message as the argument argument
  writeTweet($urMSG);

   // Call futureFunc() to add the new User tweet to the top of the div
  futureFunc(visitor);
});
// Visitor Creation tweets end ------------------------------------------------

// CSS Start ----------------------------------------------------------
// margin: auto; width: 50%; border: 3px solid green; padding: 10px;
$('body').css({ "width": "70%", "margin": "auto", "background-color": "#002244", "border-style": "dotted dashed solid double", "border-width": "20px", "border-color": "#00538C" })
$tweetsDiv.css({ "width": "80%", "margin": "auto", "background-color": "white", "padding": "5%", "border-radius": "5px", "text-align": "left", "font-family": "Arial", "font-size": "20px" })
$topDiv.css({ "width": "80%", "margin": "auto", "background-color": "white", "padding": "5%", "border-radius": "5px" });
$lButton.css({ "width": "50%", "margin-left": "25%" }).after("<br />")
$nbLabel.css({ "margin-left": "5%", "font-family": "Arial" }).after("<br />")
$nameBox.css({ "width": "90%", "margin": "auto" })
$msgLabel.css({ "margin-left": "5%", "font-family": "Arial" }).after("<br />")
$msgBox.css({ "width": "90%", "margin": "auto" })
$pButton.css({ "width": "50%", "margin-left": "25%" })
// $tweets.css({"background-color": "navy"}); // Wont work, why?
// 
// CSS End ----------------------------------------------------------


}); // End of Document function