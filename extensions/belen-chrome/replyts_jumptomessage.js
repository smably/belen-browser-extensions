$(document).ready(function () {
	if ((match = window.location.search.match(/srch-jumptomessage-id=(\d+)/)) &&
	    ($('#srch-jumptomessage-id').length > 0)) {
		$('#srch-jumptomessage-id').attr('value', match[1]);
		console.log('set the thing to ' + $('#srch-jumptomessage-id').attr('value'));
	}
});
