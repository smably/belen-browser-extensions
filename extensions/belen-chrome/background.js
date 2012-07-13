// ==UserScript==
// @name            Belen Enhancer for Firefox
// @namespace       http://cs.gumtree.com.au/
// @version         1.6.0.0
// @author          Sylvan Mably
// @description     Fixes various annoyances in Belen
// @include         http://cs.gumtree.com.au/*
// ==/UserScript==
// (This functions as a component of the Belen Enhancer Firefox add-on as well as a standalone Greasemonkey userscript.)

function initApplication(externalJQuery) {

	// We may not be able to access jQuery directly, so we'll just use whatever is passed in... hmmm...
	$ = externalJQuery;

	// Constants!
	const FREEMAIL_REGEX = /@(aol\.|gmx\.|g?(oogle)?mail\.com|hotmail\.|msn\.com|naver\.com|qq\.com|rocketmail\.com|(windows)?live\.|y7?mail\.com|yahoo\.)/i;

	const PATH_MANAGE_ADS = "/searchAds.do";
	const PATH_REPLY_TS = "/replyts/screening.do";
	const PATH_SPAM_REPORT = "/spam-report.do";
	
	const LINK_ICON_DATA = "image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0PBEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4ZHhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg==";


	if (location.pathname == PATH_MANAGE_ADS) {
		// Do the stuff in Manage Ads..

		// If we have a srch-kwrd element, set its maxlength to 200
		function extendKeywordField() {
			if ($('#srch-kwrd')) $('#srch-kwrd').attr('maxlength', '200');
		}

		// Add links to the ad ID, machine ID, and phone number for each ad
		function linkifyAds() {

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
		function hlAdRisks() {

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
			h($('dd.meta-email :first-child').filter(function() { return FREEMAIL_REGEX.test( $(this).text() ); }));

			// Highlight users with at least one bad ad (blocked or admin deleted)
			h($('dd.meta-user-history').has($('span.meta-usrads-bad').filter(function() { return $(this).text() != '0'; })));

			// Highlight users with at least one note
			h($('a.actn-ntpd').filter(function() { return $(this).next('span').text() != '0' || $(this).next('span').next('span').text() != '0'; }));
		}

		function updatePermalink() {
		}

		// Add a link button to the current page
		function createPermalink() {
			var permalinkCode = '<a id="permalink" target="_blank" href=""><img alt="Permalink" title="Permalink" style="border: 0; margin-bottom: -4px; margin-right: 4px;" src="data:' + LINK_ICON_DATA + '" /></a> ';
			$('#pg-topnav a:first-child').before(permalinkCode);

			var permalinkURL = 'http://cs.gumtree.com.au/searchAds.do?formAction=submitSearch&';
			permalinkURL += $('#searchForm :' +
				'[name=\'categoryId1stLevel\'],' + 
				'[name=\'categoryId2ndLevel\'][value!=\'\'],' +
				'[name=\'searchRequest.scoreGroups\'],' +
				'[name=\'searchRequest.activeFeatureTypes\'],' +
				'[name=\'purchaseOrderId\'][value!=\'\'],' +
				'[name=\'searchRequest.groupedAdState\'],' +
				'[name=\'searchRequest.dateRangeType\'][value!=\'LAST_WEEK\'],' +
				'[name=\'idAndEmailField\'][value!=\'\'],' +
				'[name=\'machId\'][value!=\'\'],' +
				'[name=\'paymentTransactionId\'][value!=\'\'],' +
				'[name=\'searchRequest.ip\'][value!=\'\'],' +
				'[name=\'searchRequest.keyword\'][value!=\'\'],' +
				'[name=\'searchRequest.agent\'][value!=\'\'],' +
				'[name=\'searchRequest.flagType\'][value!=\'\'],' +
				'[name=\'searchRequest.appealType\'][value!=\'IGNORE\']'
			).serialize();
			$('#permalink').attr('href', permalinkURL);
		}

		createPermalink();
		extendKeywordField();
		linkifyAds();
		hlAdRisks();
	}

	// Do the stuff in ReplyTS
	else if (location.pathname == PATH_REPLY_TS) {

		// Add links to message IDs (note that they will only work with this extension installed)
		function linkifyReplies() {
			$('#rts-tbl td:first-child p:nth-child(2)').contents().filter(function() { return $(this).text().trim().match(/^Message ID: \d+$/); }).replaceWith(function() { var m = $(this).text().match(/\d+/)[0]; return 'Message ID: <a href=\'?srch-jumptomessage-id=' + m + '\' target=\'_blank\'>' + m + '</a>'; })
		}

		// Highlight the bad stuff in replies
		function hlReplyRisks() {
			// Function to highlight an element in red (accepts a jQuery object returns nothing)
			var h = function(e) { e.css('padding', '1px 2px').css('background-color', '#FCB') };

			h($('span.j-block-status :first-child').filter(function() { return FREEMAIL_REGEX.test( $(this).text() ); }));
		}

		$('#replyts-screening-results').bind('DOMNodeInserted', function(event) {
			linkifyReplies();
			hlReplyRisks();
		});

		linkifyReplies();
		hlReplyRisks();
	}

	// Do the stuff in the spam reports
	else if (location.pathname == PATH_SPAM_REPORT) {

	}
}

// Main function
(function() {

	// First check for a local jQuery and use that if it exists...
	if (typeof jQuery != 'undefined') {
		initApplication(jQuery);
	}

	// If we don't have a local jQuery, maybe the unsafeWindow has one. Use that if it exists...
	else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') {
		initApplication(unsafeWindow.jQuery);
	}

	// If all else fails, wait five seconds for the unsafeWindow to get a jQuery and use that if and when it shows up
	else if (typeof unsafeWindow != 'undefined') {
		var i = 0;

		function jQuery_wait() {
			if (i++ < 50 && typeof unsafeWindow.jQuery == 'undefined')
				window.setTimeout(jQuery_wait, 100);
			else
				initApplication(unsafeWindow.jQuery);
		}

		jQuery_wait();
	}

})();
