/*
 * The JavaScript file for the popup
 * Handles user input
 */

/**
 * Stores object in local storage
 * Object has name feedback that corresponds to comment string
 *
 * @param  {String} comment    - The input of the text box
 */
function storeString(comment) {
  browser.storage.local.set({feedback : comment});
}

/* Listen for changes in text box */
document.addEventListener("change", function(e) {

  /* If textbox is not empty, store the string */
  if (e.target.value != "") {

	storeString(e.target.value);

	  /* After storing, listen for a button click event */
    document.addEventListener("click", function(e) {

		/* If the button is clicked, open a new tab containing feedback list for all transactions */
		if (e.target.id === "leave-feedback") {
			browser.tabs.create({url: "https://www.ebay.com/fdbk/leave_feedback"});
		}
	});
 }
});
