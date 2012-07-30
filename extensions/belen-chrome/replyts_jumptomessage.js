// ReplyTS doesn't allow linking to replies by reply ID, so we have to hack it.
// After the page loads, a script in the page will manually run a search on the values in the form.
// The reply ID overrides any other search parameters, so we can just set a single form field and let the page's onload handler deal with the rest.

var setSearchField = function() {

	const MESSAGE_ID_NAME = "srch-jumptomessage-id";
	const MESSAGE_ID_REGEX = new RegExp(MESSAGE_ID_NAME + "=(\\d+)");

	var match, searchField;

	// If there is a message ID in our URL and a message ID field in the search form...
	if ((match = location.search.match(MESSAGE_ID_REGEX)) && (searchField = document.getElementById(MESSAGE_ID_NAME))) {

		// Quickly set the value of the reply ID field in the search form to the reply ID
		searchField.value = match[1];
	}
}

// As soon as the DOM is loaded, set our form field to the appropriate value
document.addEventListener("DOMContentLoaded", setSearchField, false );
