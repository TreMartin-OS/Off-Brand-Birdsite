
$(document).ready(() => {
  const $body = $('body');
  // Using <element tag>.html('') clears an element. Everytime I refresh the LiveServer page, this erases all tweets added to the body, which is why we have to make a new div to append tweets to instead.
  $body.html('');

  // Create a Div ABOVE the tweets div to add buttons & new Post elements to
  let $topDiv = $('<div id="topDiv"></div>')
  // Add this to the top of the body using prepend
  $body.prepend($topDiv);

  // Create a div that tweets will be attached to so they dont vanish when body is cleared
  const $tweetsDiv = $('<div id="tweetsDiv"></div>')
  // Add the Tweets div after the Body
  $body.append($tweetsDiv);

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
  // Add the label to the box
  $nbLabel.append($nameBox);
  // Attach UN box + label to: body under the Show More Posts button
  $("#topDiv:nth-child(1)").append($nbLabel);

  // Create Input box for message
  let $msgBox = $('<input id="mBox"></input>').attr({ type: 'text' })
  // Create a label for it
  let $msgLabel = $("<label></label>").text("Message: ");
  // Add the label to the box
  $msgLabel.append($msgBox);
  // Attach UN box + label to: body under the Show More Posts button & UserName divs
  $("#topDiv:nth-child(1)").append($msgLabel);

  // Create a button that will be used to add a new post to the top of the list
  let $pButton = $('<button id="pButton">Submit Post</button>');
  // Add button under the text input fields
  $("#topDiv:nth-child(1)").append($pButton);
  // Create new onclick at the bottom of the code
  // Input End -------------------------------------------------------------------------------

  // Figure Out What to Map Start --------------------------------------------------------------------------
  // Define Function 
  function getMapInfo(optionalUN) {
    // Declare var to be assigned to the text at the beginning of the $tweets map method in fF()
    let whatToMap;

    // If there IS a name Arg & there are tweets in the Arr
    if (optionalUN !== undefined && streams.users[optionalUN].length > 0) {
      // Assign the newest post they made to a variable (because writeTweet() already made it)
      let newPost = streams.users[optionalUN][streams.users[optionalUN].length - 1];
      // Then assign whatToMap as ONLY that single tweet (Or else it will post them all)
      whatToMap = [newPost];
    }
    //    // I don't think I need this thanks to the on-click for "Submit Post", but im scared to delete it yet
    // // If there IS a opN but NO tweets in the Arr
    // else if (optionalUN !== undefined && streams.users[optionalUN].length === 0) {
    //   // Assign it to opN so it will make a new User + tweet
    //   whatToMap = streams.users[optionalUN];
    // }   
    // If there is NOT a name input, assign to streams.home so it makes the random tweets
    else {
      // Assign wTM to this to make sure the randomizer doesnt include tweets made by your visitor 
      // It sometimes still pulls visitor tweets for some reason
      whatToMap = streams.home.slice(-(Math.floor(Math.random() * (4 - 2 + 1)) + 2));
      /*
      I finally figured out how to choose how many posts get displayed!!! Hooray!!!  Thank you free code camp!!!
      Downside(?) is that the full 16 random posts are still being made & pushed to each stream.users[username] array.
      So when you click someones username, it loads posts that hadn't been displayed in the feed too.
      Removing the slice-randomizer would make all new posts appear on feed, so that wouldn't happen anymore.
      But I really hate the way that clutters my feed & makes it hard to track things im testing.
      Turn it in like this for now & remove it if instructed.
      */
    }
    return whatToMap;
  }
  // Figure Out What to Map End --------------------------------------------------------------------------


  // allOfOne Start --------------------------------------------------------------------------------------
  // Define function to call when you want to display ALL the posts by a single User
  function allOfOne(iChooseYou) {
    // When passed into fF, only this users Tweets will get mapped
    let chosenOne = streams.users[iChooseYou];
    // Adding .reverse() makes them display chronologically with the newest posts at the top
    return chosenOne.reverse();
    // This was working before I started playing with CSS
  }
  // When called inside of fF(), only the chosenOnes tweets will be mapped & displayed.  All of them.
  // allOfOne End --------------------------------------------------------------------------------------


  // fF Start --------------------------------------------------------------------------------------
  function futureFunc(decider) {
    // Create Tweet Start ----------------------
    // Get whatToMap data from either getMapInfo()) or allOfOne()) 
    let whatToMap;

    // This will assign the result of allOfOne or getMapInfo to the wTM
    // aOO will get all of a single users tweets to post on a cleared out timeline
    // gMI will show either the 1 newest tweet made by a visitor OR generate new tweets & pick 2-4 to add to the top of the feed
    if (decider !== undefined) {
      whatToMap = decider;
    }
    // If there is NO decider... I forgot. I knew I should have commented when I wrote it!!
    // I know it will result in streams.users.map()
    // I think it was for generating new random tweets b4 I added somethign for that to gMI?
    // Commented out & tested: I see no issues but am wary of deleting it just yet.
    // if (decider === undefined) {
    //   whatToMap = streams.users;
    // }


    // Below is a .map() func: a Var thats the result of mapping
    // const $tweets = streams.home.map((tweet) => { // OG version
    const $tweets = whatToMap.map((tweet) => { // Altered to fit assignment
      // Creates a div for each individual new tweet
      const $tweet = $('<div id="tweet" ></div>');
      // This CSS only works here, not at the bottom. BUT- 
      $tweet.css({ "margin-bottom": "20px", "font-size": "20px" });
      // const text = `@${tweet.user}: ${tweet.message}`; // OG: Combines username with the message into a String & assigns it to a var
      // Changed OG version to just the msg text, adding UN as a new div in front of this
      const text = `${tweet.message}`;
      // Adds msg var to the tweet div
      $tweet.text(text);
      // Create Tweet End -----------------------------

      // Make Username Div Start ----------------------------------
      // -Clicking it should show the users timeline, meaning only their posts 
      // Defined elsewhere, reassigning here so the later Click even will work
      $unLink = $('<div id="nameClick" ></div>');
      // CSS only works here, not below. BUT
      $unLink.css({ "font-size": "15px" });
      // Set the UN text inside the 'div' tag
      $unLink.text(`@${tweet.user}`) // Adding : here broke a lot of code
      // Add the UN to the front of the tweet div
      $tweet.prepend($unLink, ':');
      // Make Username Div End ----------------------------------

      // Timestamp Creation Start-------------------------
      // Display the timestamps of when the tweets were created in a human-friendly way (eg “10 minutes ago”).
      // Used library called Moment.js
      // Create div to put the timestamps in
      let $timeStampDiv = $('<div></div>');
      // CSS only works here. BUT: 
      $timeStampDiv.css({ "font-size": "15px" });
      // Assign 1 var to exact time & date post was made
      let callTime = moment().format('LL');
      // let callTime = moment().calendar()
      // Assign another var that tracks how much time has passed since post was made
      let pastTime = moment().startOf(callTime).fromNow(); //
      // let pastTime = moment(callTime).fromNow(); // This shows how many hours in the day its been, not how long since the post was made
      // Append to Div in the prefeered order. This way pastTime should update.
      // $timeStampDiv.append(pastTime, ': ', callTime);
      $timeStampDiv.text(pastTime + ': ' + callTime);

      // Adds the timeStamp div to the end of the tweet div 
      $tweet.append($timeStampDiv)
      // Timestamp Creation End------------------------

      // returns 3 divs: 1 contains UN link, 1 is the Msg, last the timeStamp
      return $tweet;
    });
    // Adds combined tweet divs to front of tweetsDiv
    $tweetsDiv.prepend($tweets);
  }
  // fF End ------------------------------------------------------------------------------


  // Generate & Show New Tweets start -----------------------------------------------------------------
  // Click button to load more tweets (Click functions exist but it didnt work when I tried it)
  $lButton.on("click", function () {
    // Calling random number of times as extra prevention of "Show More Posts" displaying a Visitors recent posts
    for (let x = 0; x < (Math.floor(Math.random() * (6 - 2 + 1)) + 2); x++) {
      // Call gRT b4 fF: because auto post generator in data-generator doesnt run often enough & it was mixing in Visitor posts
      generateRandomTweet();
    }
    // NOW call fF with gMI with NO param so that it will add a random number of new posts to the top of the feed
    futureFunc(getMapInfo());
    /* 
    Calling gMI without a param makes its wTM var = streams.home with a filter that makes it select 3-6 of 
    gRTs newly generated posts. That wTM var is passed into fFs decider where it organizes the info into a post.
    Then adds the tweets to the top of the page.
    */
  });
  // Generate & Show New Tweets End -----------------------------------------------------

  // Show only this users tweets Start ------------------------------------------------
  // Create On click event for clicking a username, assigned to a div I made earlier
  $tweetsDiv.on("click", "#nameClick", function () {
    console.log('I clicked it')
    // reassigns $itsYou to string of the clicked username without @ sign
    $itsYou = $(this).text().substring(1);
    // Clears the entire Tweet feed. It HAS to be cleared so you only see their Tweets
    $tweetsDiv.html('');
    // Call fF with aOO containing the $itsYou argument
    futureFunc(allOfOne($itsYou));
    // ^ This will make fFs decider = streams.users[$itsYou] so that .map() in fF will display ALL that Users posts
    // New Problem, it displays them all newest to oldest. They want new posts up top.
    // I dont think this is part of the assignment, but lets try to figure it out.
  });
  // Show only this users tweets end ------------------------------------------------


  // Visitor Creation tweets start ------------------------------------------------
  // Create on-click function (.onClick didnt let me do something ive forgotten about, dang)
  $body.on("click", "#pButton", function () {

    // CHECK if the global visitor var has been assigned
    if (typeof visitor === 'undefined') {
      // Assign the global visitor var to the value entered in unBox
      visitor = $("#unBox").val();
      // add visitor-username to the streams object with am empty arr as the key
      streams.users[visitor] = []; // I do need this, new posts didnt work with it commented out
    }
    // If visitor isnt undefined, but was changed
    if (typeof visitor !== 'undefined') {
      // Reassign visitor to the new username
      visitor = $("#unBox").val();
      // Check if the name has been used before (if streams.users[visitor] = [] already exists)
      if (!streams.users[visitor]) { // If it DOESNT exist
        // Make it
        streams.users[visitor] = [];
      } // I think itll work fine without an else for if it does exist
    }

    // THIS takes the message written inside mBox, turns it into a string & assigns it to a var
    $urMSG = $("#mBox").val().toString();
    // Call writeTweet from the data-generator page with the msg var as the argument
    writeTweet($urMSG);
    // wT takes this msg var, and has access to the global visitor.
    // It uses both to create an object that it passes into to the addTweet function
    // aT then uses the object to push the msg to the users arr in streams.users that was made in the above if-statement
    // it also posts a copy to the streams.home array

    // Call fF containing gMI with visitor as its arg 
    futureFunc(getMapInfo(visitor));
    /*
    This will use visitor as the optionalUN param inside gMI. 
    If visitor already exists in streams.users, it will check if they have posted. (It should because this code makes 1 b4 this is called)
    If they have made previous posts, it will assign wTM to tell fF to ONLY return the most recent post, which was just made.
    If there are no previous posts, it will assign wTM to visitors empty array to map. 
    ^ I know I had a reason for this but dont recall now. Its commented out & tested, everything seems to work.
    Still too scared to delete it yet.
    */
  });
  // Visitor Creation tweets end ------------------------------------------------

  // CSS Start ----------------------------------------------------------
// CSS wont work unless you affect them in the order theyre in in the code
  $('body').css({ "width": "70%", "margin": "auto", "background-color": "#002244", "border-style": "dotted dashed solid double", "border-width": "20px", "border-color": "#00538C" })
  $topDiv.css({ "width": "80%", "margin": "auto", "background-color": "white", "padding": "5%", "border-radius": "5px" });
  $tweetsDiv.css({ "width": "80%", "margin": "auto", "background-color": "white", "padding": "5%", "border-radius": "5px", "text-align": "left", "font-family": "Arial", "font-size": "18px" })
  $lButton.css({ "width": "50%", "margin-left": "25%" }).after("<br />")
  $nameBox.css({ "width": "90%", "margin": "auto" })
  $nbLabel.css({ "margin-left": "5%", "font-family": "Arial" }).after("<br />")
  $msgBox.css({ "width": "90%", "margin": "auto" })
  $msgLabel.css({ "margin-left": "5%", "font-family": "Arial" }).after("<br />")
  $pButton.css({ "width": "50%", "margin-left": "25%" })
  
  // These were causing console errors, why?
  // $unLink.css({ "font-size": "15px" });
  // $timeStampDiv.css({ "font-size": "15px" });
  // $tweet.css({ "margin-bottom": "20px", "font-size": "20px" });
  // ------------------------------------------------------------------------- 

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

  // CSS End ----------------------------------------------------------


}); // End of Document function