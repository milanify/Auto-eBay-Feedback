/*
 * The JavaScript file for the older eBay layout (mid 2017 and before)
 * Runs only when on one of two pages:
 * 1) The list of feedbacks (max 25 feedbacks per page - eBay restriction)
 * 2) The page that shows up after feedback is left
 */

/* Check if on feedback page by looking for leave feedback button */
var feedbackPage = document.getElementById("but_formSave");

/* Check if on page thats shows up after leaving feedback */
var message = document.querySelector(".arial13bold");
textContent = message.textContent;
var number = textContent.match(/\d/g);
number = number.join("");

/**
 * Function called if Promise fulfilled
 * Object has name feedback that corresponds to comment string
 *
 * @param  {Object} contents    - The fulfillment value
 */
function leaveFeedback(contents) {

  /* Get the string by calling object.Name */
  var message = contents.feedback;

  /* If we are on the feedback page */
  if (feedbackPage) {

	  /* Select all radio buttons for leaving positive feedback and click on them */
	  var positiveRadioButtons = document.querySelectorAll('[id$="-positiveRadio"]');

	  for (i = 0; i < positiveRadioButtons.length; i++) {
		  positiveRadioButtons[i].click();
    }

	  /* Set the value of each comment box to the message of the text box that was stored */
	  for (i = 0; i < positiveRadioButtons.length; i++) {
		  document.getElementById('comment' + i + i).value = message;
    }

	  /* Click on leave feedback button */
	  document.getElementById("but_formSave").click();
  }

	/* If we are on the page after leaving feedback, then go back to the feedback page
	 *
	 * Only goes back if feedback for 25 transactions are left
	 * 25 is the max number of feedbacks that can be left at one time, implies there are
	 * more transactions to leave feedback for
	 */
	else if (number == 25) {
		window.location.assign("http://feedback.ebay.com/ws/eBayISAPI.dll?LeaveFeedback2&show_as=all");
	}
}

/* Retrieves a Promise object from storage
 * Pass in null to get entire contents of storage
 * Pass in callback function that takes storage Objects
 */
chrome.storage.local.get(null, leaveFeedback);
