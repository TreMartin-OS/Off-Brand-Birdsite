
$(document).ready(() => {
  const $body = $('body'); // she says using .html('') clears an element. So this will erase any tweets added to the body, which is why she says make a new div to add tweets to instead.
  $body.html('');

  const $tweetsDiv = $("<div id=tweets></div>")
  $body.append($tweetsDiv);

  const $tweets = streams.home.map((tweet) => { // What does this do?
    const $tweet = $('<div></div>'); // Creates a div for each individual tweet
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $tweetsDiv.append($tweets);

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



