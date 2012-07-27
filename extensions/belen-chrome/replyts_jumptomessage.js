// ReplyTS doesn't allow linking to replies by reply ID, so we have to hack it.
// After the page loads, a script in the page will manually run a search on the values in the form.
// The reply ID overrides any other search parameters, so we can just set a single form field and let the page's onload handler deal with the rest.

$(document).ready(function () {
	
	// If we find a reply ID in the query string and there is a reply ID field in the search form...
	if ((match = window.location.search.match(/srch-jumptomessage-id=(\d+)/)) && ($('#srch-jumptomessage-id').length > 0)) {

		// Quickly set the value of the reply ID field in the search form to the reply ID
		$('#srch-jumptomessage-id').attr('value', match[1]);
	}
});
