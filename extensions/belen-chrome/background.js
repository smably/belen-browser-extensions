// ==UserScript==
// @name            Belen Enhancer for Firefox
// @namespace       http://cs.gumtree.com.au/
// @version         1.7.0.1
// @author          Sylvan Mably
// @description     Fixes various annoyances in Belen
// @include         http://cs.gumtree.com.au/*
// ==/UserScript==
//
// Credits:
// Silk icons (permalink, search reset) from http://www.famfamfam.com/lab/icons/silk/
// Everything else by me.
//
// (This script functions as a component of the Belen Enhancer Firefox add-on as well as a standalone Greasemonkey or Chrome userscript.)

function initApplication(externalJQuery) {

	// We may not be able to access jQuery directly, so we'll just use whatever is passed in... hmmm...
	$ = externalJQuery;

	// Constants!
	const FREEMAIL_REGEX = /@(aol\.|gmx\.|g?(oogle)?mail\.com|hotmail\.|msn\.com|naver\.com|qq\.com|rocketmail\.com|(windows)?live\.|y7?mail\.com|yahoo\.)/i;

	const PATH_MANAGE_ADS = "/searchAds.do";
	const PATH_REPLY_TS = "/replyts/screening.do";
	const PATH_SPAM_REPORT = "/spam-report.do";

	const COLOUR_GREEN_HIGHLIGHT = "#BEA";
	const COLOUR_RED_HIGHLIGHT = "#FCB";
	const COLOUR_BLUE_BACKGROUND = "#E3EDFA";

	const LINK_ICON_SRC = "data:image/png;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m" +
		"dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU" + 
		"3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V" + 
		"/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0P" + 
		"BEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4Z" +
		"HhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg==";
	const MAIL_ICON_SRC = "data:image/png;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m" +
		"dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAITSURBVBgZpcHLThNhGIDh9/vn7/RApwc5VCmFWBPi" +
		"1mvwAlx7BW69Afeu3bozcSE7E02ILjCRhRrds8AEbKVS2gIdSjvTmf+TYqLu+zyiqszDMCf75PnnnVwh" +
		"uNcLpwsXk8Q4BYeSOsWpkqrinJI6JXVK6lSRdDq9PO+19vb37XK13Hj0YLMUTVVyWY//Cf8IVwQEGEeJ" +
		"N47S1YdPo4npDpNmnDh5udOh1YsZRcph39EaONpnjs65oxsqvZEyTaHdj3n2psPpKDLBcuOOGUWpZDOG" +
		"+q0S7751ObuYUisJGQ98T/Ct4Fuo5IX+MGZr95jKjRKLlSxXxFxOEmaaN4us1Upsf+1yGk5ZKhp8C74H" +
		"5ZwwCGO2drssLZZo1ouIcs2MJikz1oPmapHlaoFXH1oMwphyTghyQj+MefG+RblcoLlaJG/5y4zGCTMi" +
		"kEwTctaxXq/w9kuXdm9Cuzfh9acujXqFwE8xmuBb/hCwl1GKAnGccDwIadQCfD9DZ5Dj494QA2w2qtQW" +
		"84wmMZ1eyFI1QBVQwV5GiaZOpdsPaSwH5HMZULi9UmB9pYAAouBQbMHHrgQcnQwZV/KgTu1o8PMgipON" +
		"u2t5KeaNiEkxgAiICDMCCFeEK5aNauAOfoXx8KR9ZOOLk8P7j7er2WBhwWY9sdbDeIJnwBjBWBBAhGsC" +
		"miZxPD4/7Z98b/0QVWUehjkZ5vQb/Un5e/DIsVsAAAAASUVORK5CYII=";

	if (location.pathname == PATH_MANAGE_ADS) {
		// Do the stuff in Manage Ads..

		// Remove the maxLength attribute from the search keyword box
		function extendKeywordField() { $('#srch-kwrd').removeAttr('maxlength'); }

		// Add links to the ad ID, machine ID, and phone number for each ad
		function linkifyAds() {

			// Add links inside elements that do not already have links and return the link added
			var linkWrap = function(e) {

				// Find any elements that have not yet been wrapped
				var unwrapped = $(e).filter(function() {
					return $(this).attr('x-wrapped') != 'true';
				});

				// Mark them as wrapped
				unwrapped.attr('x-wrapped', 'true');

				// Wrap them in link tags and return the link tag added
				return unwrapped.wrapInner($('<a></a>').attr('target', '_blank')).find('a');
			};

			// When mousing over the history line, make sure the link cursor is off (it gets added after this script is run, so we can't just set it here)
			$('dd.meta-user-history').bind('mouseover', function(event) { $(this).css('cursor', 'auto') });

			// Wrap the text of each of the spans in the user history box in link tags
			var userHistoryLinks = linkWrap($('span.meta-usrads-pstd,span.meta-usrads-ok,span.meta-usrads-bad'));

			// Apply the span class to child link tags to preserve link colour
			userHistoryLinks.addClass(function() { return $(this).parent().attr('class'); });

			// Add the link href attributes according to the class of the element and the text in the email field
			userHistoryLinks.attr('href', function() {
				var p = '';
				if ($(this).hasClass('meta-usrads-bad'))
					p = '&searchRequest.groupedAdState=BLOCKED&searchRequest.groupedAdState=BLOCK_ADMIN_CONFIRMED&searchRequest.groupedAdState=DELETED__ADMIN_DELETED';
				else if ($(this).hasClass('meta-usrads-ok'))
					p = '&searchRequest.groupedAdState=DELAYED&searchRequest.groupedAdState=ACTIVE__TNS_SCORE_FILTER&searchRequest.groupedAdState=ACTIVE__ADMIN_REVIEWED&searchRequest.groupedAdState=ACTIVE__DELAYED_TIMEOUT';
				return '?formAction=submitSearch&searchRequest.dateRangeType=NO_RANGE' + p + '&idAndEmailField=' + $(this).closest('dl.p-ads-dl').find('dd.meta-email :first-child').text();
			});

			// Add some informative titles on the new links
			$('a.meta-usrads-pstd').attr('title', 'View all ads from this user');
			$('a.meta-usrads-ok').attr('title', 'View live and delayed ads from this user');
			$('a.meta-usrads-bad').attr('title', 'View blocked and admin deleted ads from this user');

			// Find the parent elements of the ad ID, machine ID, and phone number, wrap their contents in link tags
			var adIDLinks = linkWrap($('dt:contains("Ad-Id:")').next('dd'));
			var machineIDLinks = linkWrap($('dt:contains("Machine Id:")').next('dd').find('div'));
			var phoneLinks = linkWrap($('dt:contains("Phone:")').next('dd'));

			// Restore red highlighting on blocked machine IDs
			machineIDLinks.filter('dd.p-ads-dd-blocked a').addClass('p-ads-dd-blocked');

			// Return link based on the text of the element we are linking
			var generateLinkHref = function(el, queryString) {
				return '?formAction=submitSearch&searchRequest.dateRangeType=LAST_MONTH' + queryString + $(el).text();
			}

			// Set link hrefs for all the links we have added
			adIDLinks.each(function() { $(this).attr('href', generateLinkHref(this, '&idAndEmailField=')); });
			machineIDLinks.each(function() { $(this).attr('href', generateLinkHref(this, '&machId=')); });
			phoneLinks.each(function() { $(this).attr('href', generateLinkHref(this, '&searchRequest.keyword=')); });

			// Create mail icon from a data: URI and set attributes
			var mailIcon = $('<img>').attr('src', MAIL_ICON_SRC);
			mailIcon.attr('alt', 'Replies to this ad').attr('title', 'Replies to this ad');
			mailIcon.css('vertical-align', 'middle').css('margin', '-2px 8px 0 8px').css('border', 'none');

			// Wrap the mail icon in a link and add it after each ad ID
			adIDLinks.each(function() {
				var repliesURL = '/replyts/screening.do?idmail=' + $(this).text() + '&daterange=NO_RANGE';
				var mailLink = $('<a></a>').attr('href', repliesURL).attr('target', '_blank');

				$(this).after(mailIcon.clone().wrap(mailLink).parent());
			});
		}

		// Highlight ads from first-time posters and colour-code user state
		function hlAdRisks() {

			// Find all adRow tr elements that have a child element of class "meta-usrads-pstd" in which the text is precisely "1"
			// To those matching tr elements, apply a blue background colour (these are our first-time posters)
			$('tr.adRow').has($('span.meta-usrads-pstd').filter(function() { return $(this).text() == '1'; })).css('background-color', COLOUR_BLUE_BACKGROUND);

			// Function to highlight an element in red (accepts a jQuery object returns nothing)
			var h = function(e) { e.css('padding', '1px 2px').css('background-color', COLOUR_RED_HIGHLIGHT) };

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

		// Highlight keyword search terms
		function hlSearchTerms() {

			// If there's a search keyword field and it has terms in it, highlight them in ads
			if ($('#srch-kwrd').length > 0 && $('#srch-kwrd').val() != "") {

				// Extract words and quoted strings from search keywords
				var keywords = $('#srch-kwrd').val().match(/".+?"|\w+/g);

				// Helper function to highlight all occurrences of string str in jQuery element el
				var hl = function(el, str) {

					// Escape special regex characters!
					str = str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

					var regex = new RegExp(str, 'gi');
					var highlight = "<span style='background-color: " + COLOUR_GREEN_HIGHLIGHT + "; font-weight: bold;'>$&</span>";

					el.replaceWith(function() { return $(this).text().replace(regex, highlight); });
				};

				// Highlight each each search keyword (or "quote delimited" phrase)
				$.each(keywords, function(i, keyword) {

					// The text eligible for highlighting is  all text nodes within the ad title and descrption elements
					var titleAndDescriptionText = $('h2.p-ads-hdln-title,p.meta-description').contents().filter(function() { return this.nodeType == 3; });

					// If there are any elements that can be highlighted, highlight them with the keyword (stripping it of quotation marks if necessary)
					if (titleAndDescriptionText.length > 0) {
						hl(titleAndDescriptionText, keyword.toString().replace(/"/g, ''));
					}
				});

				// Set some highlighting on the search terms
				$('span.highlight').css('background-color', COLOUR_GREEN_HIGHLIGHT).css('font-weight', 'bold');
			}
		}

		// Add a link button to the current page
		function createPermalink() {
			var searchParams = $('#searchForm :' +
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

			if (searchParams.length > 0) {
				$('#pg-topnav a:first-child').before('<a id="permalink"><img id="permalink_icon" src="' + LINK_ICON_SRC + '" /></a> ');
				$('#permalink_icon').css('border', '0').css('margin-bottom', '-4px').css('margin-right', '4px').attr('alt', 'Permalink').attr('title', 'Permanant link to this search');

				$('#permalink').attr('href', PATH_MANAGE_ADS + '?formAction=submitSearch&' + searchParams);
				$('#permalink').attr('target', '_blank');
			}
		}

		// Adds a reset icon to the right of the Search button in the top form. Clicking it resets the values in the search form to their defaults.
		function initSearchReset() {

			// This function is added to an inline script so that it is executed in the page context rather than the extension context.
			var addResetIcon = function() {

				// This can't be defined at the top of the page with the other consts.
				// Due to the hack we are using to execute this code in the page context (needed for access to multiSelectUpdateSelected), the entire function must be self-contained.
				const RESET_ICON_SRC = 'data:image/png;base64,' +
					'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
					'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHsSURBVDjLtZPpTlpRFIV5Dt7AOESr1kYNThGnSomI' +
					'ihPoNVi5Qp3RgBgvEERpRW1BRBAcMEDUtIkdjKk4otK0Jdr2vgxZ3kA0MYoaG3+cX2evb529zt4sAKz/' +
					'OawnASgCBNm5LaE7vjVDutkA4mMdLV4TkvcCuvba2Iqd1pDhWA33mQU+2oXVv07YfpoxuNWFuqVXoeqF' +
					'CnZcgJwRm04p+Gk3Fs9t8PyZx/K5Hfbf03CGLRj62g2+rSR0K0D+vZXUB1Xw/ou5usJWjAaU0Gz3w/rj' +
					'Hey/ZjDLvKTD34KSyXzyBkC2JaYd4feMqyNa3OQTREQePlXjrqSq5ssj5hMjTMd66ALDKDLm0jcA0s+N' +
					'ID6JIFmvQaNXANEKX3l5x7NyqTcb7Zg8GYtCOLoXuPcbha6XV0VlU4WUzE9gPKjF2CGFbE3G3QAmafDn' +
					'ShETF3iKTZyIblcNza4Syi/deD6USscFCJwV6Fwn8NonQak5Hy1L9TAcjkJ/oAG1p0a1hYdnfcnkrQCB' +
					'oxyyNYLp1YCJoB7GIwqGgxGod/oZsQoNDiHSepNCceeAN8uF1CvGxJE25rofc+3blKPqQ2VUnKxIYN85' +
					'yty3eWh216LeKUTOSCayVGlIH0g5S+1JJB+8Cxxt1rWkH7WNTNIPAlwA9Gm7OcXUHxUAAAAASUVORK5C' +
					'YII=';

				// Reset all form values to their defaults
				var resetSearch = function() {

					// These variables are necessary for multiSelect operations
					var messageVars = Belen.tns.controller.vars.messages;
					var o = {
						oneOrMoreSelected: messageVars.selectStatOneOrMoreSelected,
						selectAllText: messageVars.selectStatSelectAll,
						noneSelected: messageVars.selectStatNoneSelected
					};

					// Reset all the multiSelects
					$('div.multiSelectOptions').find('INPUT:checkbox').attr('checked', false).parent().removeClass('checked');
					$('#srch-subcat').html("<option value=''>&nbsp;</option>");
					$('div.multiSelectOptions').multiSelectUpdateSelected(o);

					// Reset the regular selects and the text inputs
					$('#ads-srchfrm-params input.c-inpt-frm').val('');
					$('#ads-srchfrm-params select.c-slct-frm option').removeAttr('selected');

					// Restore default form values
					// Date range = "Within the last week"
					$('#srch-dtrng option[value="LAST_WEEK"]').attr('selected', 'true');
					// Flags = "[no restriction]", Appeals = "[Ignore]"
					$('#srch-flgtype option:first-child').attr('selected', 'true');
				};

				// Create reset icon from a data: url, give it a sensible title and alt text, set styles, add a click handler
				var resetIcon = $('<img>').attr('src', RESET_ICON_SRC);
				resetIcon.attr('alt', 'Reset search fields').attr('title', 'Reset search');
				resetIcon.css('vertical-align', 'middle').css('margin', '-4px 2px 0 2px').css('margin-top', '-4px').css('cursor', 'pointer');
				resetIcon.click(resetSearch);

				// Add the reset icon immediately after the search button
				$('#srch-sbmt').after(resetIcon);
			};

			// Create a script element, stuff the text of addResetIcon inside an anonymous function and immediately call it, and add all that to the end of the document body
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.appendChild(document.createTextNode('('+ addResetIcon +')();'));
			document.body.appendChild(script);
		}

		// Adds links beside each ad to block and unblock all images
		function initBlockImageLinks() {

			// Function to add "block images" links, to be inserted in an inline script and run in page context
			var addBlockImageLinks = function() {

				// Some templates for the block/unblock image links
				var blockImageLink = $('<a></a>').addClass('actn-blckAllImg').text('Block Images').attr('href', '#');
				var unblockImageLink = $('<a></a>').addClass('actn-ublkAllImg').text('Unblock Images').attr('href', '#');

				// Insert the block/unblock links before the "send ad mail" link in the right sidebar (should be after "block all" link)
				// Links will only be inserted on ads that have an image div
				$('div.p-ads-div-imgs').closest('tr.adRow').find('a.actn-rsndRegMail').before(blockImageLink.after(document.createTextNode(' | ')).after(unblockImageLink).after($('<br>')));

				// Given an element in an ad row, return a list of all the image block/unblock/hold/unhold links with the specified link text for that ad
				var getImageActionLinks = function(eventSrc, linkText) {
					return $(eventSrc).closest('tr.adRow').find('a.j-img-action').filter(function() {
						return $(this).text().toUpperCase() == linkText.toUpperCase();
					});
				}

				// For each "block images" link, if there are no image block links for the ad, disable it
				$('a.actn-blckAllImg').each(function() {
					if (getImageActionLinks(this, 'block').length == 0)
						$(this).addClass('p-ads-lnk-dsbld');
				});

				// For each "unblock images" link, if there are no image unblock links for the ad, disable it
				$('a.actn-ublkAllImg').each(function() {
					if (getImageActionLinks(this, 'unblock').length == 0)
						$(this).addClass('p-ads-lnk-dsbld');
				});

				// Function to click all the links below images (block/unblock, hold/unhold) in the current ad row
				var clickImageActionLinks = function(eventSrc, linkText, toggleLink) {
					getImageActionLinks(eventSrc, linkText).click();

					$(eventSrc).addClass('p-ads-lnk-dsbld');
					$(toggleLink).removeClass('p-ads-lnk-dsbld');
				};

				// Set the click event on the block/unblock links to block images
				$('a.actn-blckAllImg').click(function() { clickImageActionLinks(this,   'block', $(this).next('a.actn-ublkAllImg')); });
				$('a.actn-ublkAllImg').click(function() { clickImageActionLinks(this, 'unblock', $(this).prev('a.actn-blckAllImg')); });
			};

			// Create a script element, stuff the text of addBlockImageLinks inside an anonymous function and immediately call it, and add all that to the end of the document body
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.appendChild(document.createTextNode('('+ addBlockImageLinks +')();'));
			document.body.appendChild(script);
		}

		createPermalink();
		initSearchReset();
		extendKeywordField();
		linkifyAds();
		initBlockImageLinks();
		hlAdRisks();
		hlSearchTerms();
	}

	// Do the stuff in ReplyTS
	else if (location.pathname == PATH_REPLY_TS) {

		// Set the "ad ID" link to show all replies from that ad, not just the ones from the past day
		function fixIdLinks() {

			$('#rts-tbl td:first-child p:nth-child(2) a:first-child').attr('href', function() { return $(this).attr('href') + "&daterange=NO_RANGE"; });
		}

		// Add links to message IDs (note that they will only work with this extension installed)
		function linkifyReplies() {

			$('#rts-tbl td:first-child p:nth-child(2)').contents().filter(function() { return $(this).text().trim().match(/^Message ID: \d+$/); }).replaceWith(function() { var m = $(this).text().match(/\d+/)[0]; return 'Message ID: <a href=\'?srch-jumptomessage-id=' + m + '\' target=\'_blank\'>' + m + '</a>'; });
		}

		// Highlight the bad stuff in replies
		function hlReplyRisks() {

			// Function to highlight an element in red (accepts a jQuery object returns nothing)
			var h = function(e) { e.css('padding', '1px 2px').css('background-color', COLOUR_RED_HIGHLIGHT) };

			h($('span.j-block-status :first-child').filter(function() { return FREEMAIL_REGEX.test( $(this).text() ); }));
		}

		// Hide Gumtree boilerplate in replies
		function hideBoilerplate() {

			// Text at the bottom varies depending on whether or not the user is registered
			var boilerplateStartRegex = new RegExp('(.|\n)+?Message:');
			var boilerplateEndRegex = new RegExp('<br>(Please report any suspicious email|If your ad is no longer available)(.|\n)+');

			var repliesWithBoilerplate = $('div.rts-mail-body').filter(function() { return ($(this).text().trim().indexOf('Someone has replied to your ad!') == 0); });

			// Make a little function to replace a bunch of text with an inconspicuous ellipsis
			var r = function(el, regex) {
				el.innerHTML = el.innerHTML.replace(regex, function(matched) {return "<span style='color: #AAA;'>[ ... ]</span>";});
			}

			repliesWithBoilerplate.each(function() {
				r(this, boilerplateStartRegex);
				r(this, boilerplateEndRegex);
			});
		}

		// Fix all the things in replies
		function initReplies() {

			// If the results table is not flagged as fixed, immediately set the flag to fixed and then fix all the replies
			// Conveniently, every time a new search is performed, we get a new results table (with the flag not set, of course)
			if ($('#rts-tbl').length > 0 && $('#rts-tbl').attr('x-fixed') != 'true') {
				$('#rts-tbl').attr('x-fixed', 'true');

				fixIdLinks();
				linkifyReplies();
				hlReplyRisks();
				hideBoilerplate();
			}
		}

		// Watch for elements being added to the reply screening container
		$('#replyts-screening-results').bind('DOMNodeInserted', initReplies);
		initReplies();
	}

	// Do the stuff in the spam reports
	else if (location.pathname == PATH_SPAM_REPORT) {

		// Wrap message IDs and ad IDs in links
		$('tr.record td:nth-child(3)').wrapInner(function() { return "<a href='" + PATH_REPLY_TS + "?srch-jumptomessage-id=" + $(this).text() + "' target='_blank'>"; });
		$('tr.record td:nth-child(4)').wrapInner(function() { return "<a href='" + PATH_MANAGE_ADS + "?formAction=submitSearch&idAndEmailField=" + $(this).text() + "' target='_blank'>"; });
		$('tr.record td:nth-child(7)').wrapInner(function() { return "<a href='" + PATH_REPLY_TS + "?ip=" + $(this).text() + "&daterange=LAST_DAY' target='_blank'>"; });
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
