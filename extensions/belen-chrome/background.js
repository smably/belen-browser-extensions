// Bail out right away if we're not in Manage Ads (we don't want to slow down replies with all this crap)
if ($('body#ads')) {

	// If we have a srch-kwrd element, set its maxlength to 200
	function extendKeywordField() {
		if ($('#srch-kwrd')) $('#srch-kwrd').attr('maxlength', '200');
	}

	// Add links to the ad ID, machine ID, and phone number for each ad
	function linkify() {

		// Add links inside elements that do not already have links and return any elements to which links were added
		var w = function(e) { return e.filter(function() { return $(this).attr('x-wrapped') != 'true'; }).attr('x-wrapped', 'true').wrapInner('<a>') };

		// When mousing over the history line, make sure the link cursor is off (it gets added after this script is run, so we can't just set it here)
		$('dd.meta-user-history').bind('mouseover', function(event) { $(this).css('cursor', 'auto') });

		// TODO: Break this up onto multiple lines and document more thoroughly
		// Wrap the text of each of the spans in the user history box in link tags
		// Apply the span class to child link tags to preserve link colour
		// Add the link href attributes according to the class of the element and the text in the email field
		// Add target "_blank" to force links to open in a new window
		w($('span.meta-usrads-pstd,span.meta-usrads-ok,span.meta-usrads-bad')).find('a').addClass(function() { return $(this).parent().attr('class'); }).attr('href', function() { var p = ''; if ($(this).hasClass('meta-usrads-bad')) { p = '&searchRequest.groupedAdState=BLOCKED&searchRequest.groupedAdState=BLOCK_ADMIN_CONFIRMED&searchRequest.groupedAdState=DELETED__ADMIN_DELETED'; } else if ($(this).hasClass('meta-usrads-ok')) { p = '&searchRequest.groupedAdState=DELAYED&searchRequest.groupedAdState=ACTIVE__TNS_SCORE_FILTER&searchRequest.groupedAdState=ACTIVE__ADMIN_REVIEWED&searchRequest.groupedAdState=ACTIVE__DELAYED_TIMEOUT'; } return '?formAction=submitSearch&searchRequest.dateRangeType=NO_RANGE' + p + '&idAndEmailField=' + $(this).closest('dl.p-ads-dl').find('dd.meta-email :first-child').text(); }).attr('target', '_blank');

		// Add some informative titles on the new links
		$('a.meta-usrads-pstd').attr('title', 'View all ads from this user');
		$('a.meta-usrads-ok').attr('title', 'View live and delayed ads from this user');
		$('a.meta-usrads-bad').attr('title', 'View blocked and admin deleted ads from this user');
		
		// TODO: Break this up onto multiple lines and document more thoroughly
		// Find the parent elements of the ad ID, machine ID, and phone number, wrap their contents in link tags
		// Set the href and target attributes on all links according to what kind of link they are (TODO: document this more thoroughly)
		// Add blocked class onto all links inside a blocked dd (preserves red highlighted on blocked machine IDs)
		w($('dt:contains(\'Ad-Id:\') + dd,dt:contains(\'Machine Id:\') + dd div,dt:contains(\'Phone:\') + dd')).find('a').attr('href', function() { var t = $(this).closest('dd').prev('dt').text(); var p; if (t == 'Ad-Id:') { p = '&idAndEmailField='; } else if (t == 'Machine Id:') { p = '&machId='; } else { p = '&searchRequest.keyword='; } return '?formAction=submitSearch&searchRequest.dateRangeType=LAST_MONTH' + p + $(this).text(); }).attr('target', '_blank').filter('dd.p-ads-dd-blocked a').addClass('p-ads-dd-blocked');
	}

	// Highlight ads from first-time posters and colour-code user state
	function hlUserRisks() {

		// Find all adRow tr elements that have a child element of class "meta-usrads-pstd" in which the text is precisely "1"
		// To those matching tr elements, apply a blue background colour (these are our first-time posters)
		$('tr.adRow').has($('span.meta-usrads-pstd').filter(function() { return $(this).text() == '1'; })).css('background-color', '#E3EDFA');

		// Function to highlight an element in red (accepts a jQuery object returns nothing)
		var h = function(e) { e.css('padding', '1px 2px').css('background-color', '#FCB') };

		// Highlight all scores >0
		h($('dd.meta-scr').filter(function() { return $(this).text().trim() != '0'; }));

		// Highlight, live (untested), blocked, and deleted ad status in red
		h($('dd.meta-status:contains(\'Live \(Untested\)\'),dd.meta-status:contains(\'Blocked\'),dd.meta-status:contains(\'Deleted \(Admin\)\')'));

		// Highlight freemail domains
		h($('dd.meta-email :first-child').filter(function() { return /@(aol\.|gmx\.|g?(oogle)?mail\.com|hotmail\.|msn\.com|naver\.com|qq\.com|(windows)?live\.|y7?mail\.com|yahoo\.)/i.test( $(this).text() ); }));

		// Highlight users with at least one bad ad (blocked or admin deleted)
		h($('dd.meta-user-history').has($('span.meta-usrads-bad').filter(function() { return $(this).text() != '0'; })));

		// Highlight users with at least one note
		h($('a.actn-ntpd').filter(function() { return $(this).next('span').text() != '0' || $(this).next('span').next('span').text() != '0'; }));
	}

	extendKeywordField();
	linkify();
	hlUserRisks();
}