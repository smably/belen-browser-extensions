// ==UserScript==
// @name            Belen Enhancer
// @namespace       http://cs.gumtree.com.au/
// @version         1.8.1.1
// @author          Sylvan Mably
// @description     Fixes various annoyances in Belen
// @include         http://cs.gumtree.com.au/*
// ==/UserScript==
//
// (This script functions as a component of the Belen Enhancer Firefox add-on
// as well as, in theory, a standalone Greasemonkey or Chrome userscript.
// Currently not working as a standalone script, as it has a number of external
// dependencies.)
//
// ============================================================================

var jQuery, $, Belen;

// Function to inject a script into the page and run it in the page context (giving access to the page's jQuery)
var runInPageContext = function(fn) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.textContent = '('+ fn +')();';
	document.body.appendChild(script);
};

var initApplication = function() {

	// Constants!
	const PATH_MANAGE_ADS        = "/searchAds.do";
	const PATH_REPLY_TS          = "/replyts/screening.do";
	const PATH_SPAM_REPORT       = "/spam-report.do";
	const PATH_JQUERY            = "/js/lib/jquery-1.4.2.min.js";

	const COLOUR_GREEN_HIGHLIGHT = "#BEA";
	const COLOUR_RED_HIGHLIGHT   = "#FCB";
	const COLOUR_BLUE_BACKGROUND = "#E3EDFA";

	const AD_STATES_BAD          = ["BLOCKED", "BLOCK_ADMIN_CONFIRMED", "DELETED__ADMIN_DELETED"];
	const AD_STATES_OK           = ["DELAYED", "ACTIVE__TNS_SCORE_FILTER", "ACTIVE__ADMIN_REVIEWED", "ACTIVE__DELAYED_TIMEOUT"];

	const SEARCH_DATERANGE       = "NO_RANGE";

	const JQUERY_WAIT_PERIOD_MS  = "100";
	const JQUERY_WAIT_TIMEOUT_MS = "1000";

	const FLAG_BOLD              = true;
	const FLAG_NO_BOLD           = false;

	const FREEMAIL_REGEX         = /@(aol\.|gmx\.|g?(oogle)?mail\.com|hotmail\.|msn\.com|naver\.com|qq\.com|rocketmail\.com|(windows)?live\.|y7?mail\.com|yahoo\.)/i;

	const REPLY_BEGIN_REGEX      = /(.|\n)+?Message:/;
	const REPLY_END_REGEX        = /<br>\s*(To reply to this message please use the Reply Button|Please report any suspicious email|If your ad is no longer available)(.|\n)+/;

	const LINK_ICON_SRC          = "data:image/png;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m" +
		"dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU" + 
		"3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V" + 
		"/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0P" + 
		"BEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4Z" +
		"HhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg==";

	const MAIL_ICON_SRC          = "data:image/png;base64," +
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

	const RESET_ICON_SRC         = 'data:image/png;base64,' +
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

	// Function to highlight a set of elements in a chosen colour (accepts an element or jQuery object, returns nothing)
	const SET_HIGHLIGHT = function(e, colour) {
		$(e).css('padding', '1px 2px').css('background-color', colour);
	};

	// Function to insert jQuery if it does not already exist in the page
	// If successful, runs the callback function passed in
	const injectJQuery = function(callback) {

		// Make sure we don't already have a jQuery defined
		if (typeof jQuery == 'undefined') {

			// Create a script element, set its src to the jQuery path, and add it to the end of the document body
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = PATH_JQUERY;
			document.body.appendChild(script);

			// Function that waits for jQuery to load and then does something
			var jQueryWait = function(remainingWait, callback) {

				// If we don't have a jQuery yet and we haven't timed out, decrement our remaining time and schedule our next check
				if (typeof jQuery == 'undefined' && remainingWait > 0) {
					remainingWait -= JQUERY_WAIT_PERIOD_MS;
					setTimeout(function() { jQueryWait(remainingWait, callback) }, JQUERY_WAIT_PERIOD_MS);
				}

				// Otherwise, if we do have a jQuery and we have a valid callback function, run the callback
				else if (typeof jQuery != 'undefined' && typeof callback == 'function') {
					callback();
				}

				// (If we've timed out and still don't have a jQuery, just exit silently)
			}

			// Start waiting for jQuery
			jQueryWait(JQUERY_WAIT_TIMEOUT_MS, callback);
		}
	}

	// Do the stuff in Manage Ads...
	if (location.pathname == PATH_MANAGE_ADS) {

		// Remove the maxLength attribute from the search keyword box
		var extendKeywordField = function() { $('#srch-kwrd').removeAttr('maxlength'); };

		// Add links to the ad ID, machine ID, and phone number for each ad
		var linkifyAds = function() {

			// Add links inside elements that do not already have links and return the link added
			var linkWrap = function(e) {

				// Find any elements that have not yet been wrapped
				var unwrapped = $(e).filter(function() {
					return $(this).data('wrapped') != true;
				});

				// Mark them as wrapped
				unwrapped.data('wrapped', true);

				// Wrap them in link tags and return the link tag added
				return unwrapped.wrapInner($('<a></a>').attr('target', '_blank')).find('a');
			};

			// Set a CSS rule to override the pointer style that gets added by jquery.belen-tooltip.js
			var userHistoryStyle = document.createElement('style');
			userHistoryStyle.type = 'text/css';
			userHistoryStyle.textContent = 'dd.meta-user-history { cursor: auto !important; }';
			document.body.appendChild(userHistoryStyle);

			// Wrap the text of each of the spans in the user history box in link tags
			var userHistoryLinks = linkWrap($('span.meta-usrads-pstd,span.meta-usrads-ok,span.meta-usrads-bad'));

			// Apply the span class to child link tags to preserve link colour
			userHistoryLinks.addClass(function() {
				return $(this).parent().attr('class');
			});

			// Add the link href attributes according to the class of the element and the text in the email field
			userHistoryLinks.attr('href', function() {

				// Find the email address of the user associated with the ad and save it
				var userEmail = $(this).closest('dl.p-ads-dl').find('dd.meta-email :first-child').text();

				// Create search parameters out of the supplied name and value (or values)
				var buildSearchParams = function(name, values) {

					// Handle some special cases: if there are no values, make values an empty object; if it's a non-object, wrap it in an array
					if (typeof values == "undefined")
						values = [];
					else if (typeof values != "object")
						values = [values];

					// Build the query string, adding a name=value pair for each value in values
					var searchParams = "";
					$.each(values, function() {
						searchParams += "&" + name + "=" + encodeURIComponent(this);
					});

					return searchParams;
				}

				// Set the params if necessary (only for OK/bad ads -- not necessary when we want all ads) and return the complete URL
				var adStates;
				if ($(this).hasClass('meta-usrads-ok'))
					adStates = AD_STATES_OK;
				else if ($(this).hasClass('meta-usrads-bad'))
					adStates = AD_STATES_BAD;

				var dateParams   = buildSearchParams("searchRequest.dateRangeType",  SEARCH_DATERANGE);
				var searchParams = buildSearchParams("searchRequest.groupedAdState", adStates);
				var emailParams  = buildSearchParams("idAndEmailField",              userEmail);

				return '?formAction=submitSearch' + dateParams + searchParams + emailParams;
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

			// Make sure the ad ID link gets the blocked class whenever its parent dd gets set to blocked
			$.hook(['addClass', 'removeClass']);
			$('dd.meta-machine').bind('onaddClass',    function(e) { $(this).find('a').addClass('p-ads-dd-blocked'); });
			$('dd.meta-machine').bind('onremoveClass', function(e) { $(this).find('a').removeClass('p-ads-dd-blocked'); });

			// Return link based on the text of the element we are linking
			var generateLinkHref = function(el, queryString) {

				var linkHref = '?formAction=submitSearch';
				linkHref += '&searchRequest.dateRangeType=LAST_MONTH';
				linkHref += queryString + encodeURIComponent($(el).text());

				return linkHref;
			}

			// Set link hrefs for all the links we have added
			adIDLinks.each(     function() { $(this).attr('href', generateLinkHref(this, '&idAndEmailField=')); });
			machineIDLinks.each(function() { $(this).attr('href', generateLinkHref(this, '&machId=')); });
			phoneLinks.each(    function() { $(this).attr('href', generateLinkHref(this, '&searchRequest.keyword=')); });

			// Create mail icon from a data: URI and set attributes
			var mailIcon = $('<img>').attr('src', MAIL_ICON_SRC);
			mailIcon.attr('alt', 'View replies to this ad').attr('title', 'View replies to this ad');
			mailIcon.css('vertical-align', 'middle').css('margin', '-2px 8px 0 8px').css('border', 'none');

			// Wrap the mail icon in a link and add it after each ad ID
			adIDLinks.each(function() {
				var repliesURL = '/replyts/screening.do?idmail=' + $(this).text() + '&daterange=' + SEARCH_DATERANGE;
				var mailLink = $('<a></a>').attr('href', repliesURL).attr('target', '_blank');

				$(this).after(mailIcon.clone().wrap(mailLink).parent());
			});
		};

		// Highlight ads from first-time posters and colour-code user state
		var hlAdRisks = function() {

			// Find all adRow tr elements that have a child element of class "meta-usrads-pstd" in which the text is precisely "1"
			// To those matching tr elements, apply a blue background colour (these are our first-time posters)
			$('tr.adRow').has($('span.meta-usrads-pstd').filter(function() {
				return $(this).text() == '1';
			})).css('background-color', COLOUR_BLUE_BACKGROUND);

			// Highlight all scores >0
			SET_HIGHLIGHT($('dd.meta-scr').filter(function() {
				return $(this).text().trim() != '0';
			}), COLOUR_RED_HIGHLIGHT);

			// Highlight, live (untested), blocked, and deleted ad status in red
			SET_HIGHLIGHT($('dd.meta-status:contains("Live \(Untested\)")'), COLOUR_RED_HIGHLIGHT);
			SET_HIGHLIGHT($('dd.meta-status:contains("Blocked")'),           COLOUR_RED_HIGHLIGHT);
			SET_HIGHLIGHT($('dd.meta-status:contains("Deleted \(Admin\)")'), COLOUR_RED_HIGHLIGHT);
			// Highlight partner trusted status in green
			SET_HIGHLIGHT($('dd.meta-status:contains("Partner Trusted")'),   COLOUR_GREEN_HIGHLIGHT);

			// Highlight freemail domains
			SET_HIGHLIGHT($('dd.meta-email :first-child').filter(function() {
				return FREEMAIL_REGEX.test($(this).text());
			}), COLOUR_RED_HIGHLIGHT);

			// Highlight users with at least one bad ad (blocked or admin deleted)
			SET_HIGHLIGHT($('dd.meta-user-history').has($('span.meta-usrads-bad').filter(function() {
				return $(this).text() != '0';
			})), COLOUR_RED_HIGHLIGHT);

			// Highlight users with at least one note
			SET_HIGHLIGHT($('a.actn-ntpd').filter(function() {

				var hasNoteOnAd = ($(this).next('span').text() != '0');
				var hasNoteOnAccount = ($(this).next('span').next('span').text() != '0');

				return hasNoteOnAd || hasNoteOnAccount;
			}), COLOUR_RED_HIGHLIGHT);
		};

		// Highlight keyword search terms
		var hlSearchTerms = function() {

			// If there's a search keyword field and it has terms in it, highlight them in ads
			if ($('#srch-kwrd').length > 0 && $('#srch-kwrd').val() != "") {

				// Extract words and quoted strings from search keywords
				var keywords = $('#srch-kwrd').val().match(/".+?"|\S+/g);

				// Helper function to highlight all occurrences of string str in jQuery element el
				var hl = function(el, str) {

					// Escape special regex characters!
					str = str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

					// Create a regex from our search string
					var regex = new RegExp(str, 'gi');

					// Our highlight string is the regex match wrapped in span with a highlight class
					var highlight = "<span class='kwd-highlt'>$&</span>";

					// Replace all instances of our search string with the highlight-wrapped version; replace the element text with that
					el.replaceWith(function() {
						return $(this).text().replace(regex, highlight);
					});

					// Set green highlighting on our keyword highlight class
					$('span.kwd-highlt').css("background-color", COLOUR_GREEN_HIGHLIGHT).css("font-weight", "bold");
				};

				// Highlight each each search keyword (or "quote delimited" phrase)
				$.each(keywords, function(i, keyword) {

					// The text eligible for highlighting is  all text nodes within the ad title and descrption elements
					var titleAndDescriptionText = $('h2.p-ads-hdln-title,p.meta-description').contents().filter(function() {
						return this.nodeType == Node.TEXT_NODE;
					});

					// If there are any elements that can be highlighted, highlight them with the keyword (stripping it of quotation marks if necessary)
					if (titleAndDescriptionText.length > 0)
						hl(titleAndDescriptionText, keyword.toString().replace(/"/g, ''));
				});

				// Set some highlighting on the search terms
				$('span.highlight').css('background-color', COLOUR_GREEN_HIGHLIGHT).css('font-weight', 'bold');
			}
		};

		// Add a link button to the current page
		var createPermalink = function() {

			// Grab search parameters from the search form (jQuery selectors use "," for OR and "" -- i.e., concatenations of selectors -- for AND)
			var searchParams = $('#searchForm :' +
				'[name="categoryId1stLevel"],' + 
				'[name="categoryId2ndLevel"][value!=""],' +
				'[name="searchRequest.scoreGroups"],' +
				'[name="searchRequest.activeFeatureTypes"],' +
				'[name="purchaseOrderId"][value!=""],' +
				'[name="searchRequest.groupedAdState"],' +
				'[name="searchRequest.dateRangeType"][value!="LAST_WEEK"],' +
				'[name="idAndEmailField"][value!=""],' +
				'[name="machId"][value!=""],' +
				'[name="paymentTransactionId"][value!=""],' +
				'[name="searchRequest.ip"][value!=""],' +
				'[name="searchRequest.keyword"][value!=""],' +
				'[name="searchRequest.agent"][value!=""],' +
				'[name="searchRequest.flagType"][value!=""],' +
				'[name="searchRequest.appealType"][value!="IGNORE"]'
			).serialize();

			// Only print the permalink if any of the search parameters are not at their default values
			if (searchParams.length > 0) {
				var permalinkIcon = $('<img>').attr('src', LINK_ICON_SRC);
				permalinkIcon.attr('alt', 'Permalink').attr('title', 'Permanant link to this search');
				permalinkIcon.css('border', '0').css('margin-bottom', '-4px').css('margin-right', '4px');

				var permalink = $('<a></a>').attr('href',  PATH_MANAGE_ADS + '?formAction=submitSearch&' + searchParams);
				permalink.attr('target', '_blank');

				// Wrap the permalink icon in the link tag and get the parent (i.e., the linkwrapped permalink icon)
				// Put that before the menu link at the top of the page
				$('#pg-topnav a:first-child').before(permalinkIcon.wrap(permalink).parent());
			}
		};

		// This function is added to an inline script so that it is executed in the page context rather than the extension context.
		var addResetIcon = function() {

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

		// Adds links beside each ad to block and unblock all images
		var addBlockImageLinks = function() {

			// Some templates for the block/unblock image links
			var blockImageDiv    = $('<div></div>');
			var blockImageLink   = $('<a></a>').addClass('actn-blckAllImg').text('Block Images')  .attr('href', '#');
			var unblockImageLink = $('<a></a>').addClass('actn-ublkAllImg').text('Unblock Images').attr('href', '#');

			// Insert the block/unblock links before the "send ad mail" link in the right sidebar (should be after "block all" link)
			// Links will only be inserted on ads that have an image div
			$('div.p-ads-div-imgs').closest('tr.adRow').find('a.actn-rsndRegMail').before(blockImageDiv.append(blockImageLink).append(" | ").append(unblockImageLink));

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

			// Watch for attr() calls on ad image wrappers (these indicate an image being blocked or unblocked)
			// After an attribute change, update disabled status on image (un)block links in sidebar
			$.hook('attr');
			$('a.a-adimg').bind('onafterattr', function(e) {
				var adRow = $(this).closest('tr.adRow');
				var adImages = adRow.find('a.a-adimg');

				var   blockLink = adRow.find('a.actn-blckAllImg');
				var unblockLink = adRow.find('a.actn-ublkAllImg');

				// If all images are blocked, disable block link and enable unblock link
				if (adImages.filter('.img-block').length == adImages.length) {
					blockLink.addClass('p-ads-lnk-dsbld');
					unblockLink.removeClass('p-ads-lnk-dsbld');
				}
				// If no images are blocked, enable block link and disable unblock link
				else if (!adImages.is('.img-block')) {
					blockLink.removeClass('p-ads-lnk-dsbld');
					unblockLink.addClass('p-ads-lnk-dsbld');
				}
				// Otherwise some images are blocked and some are unblocked, so enable both links
				else {
					blockLink.removeClass('p-ads-lnk-dsbld');
					unblockLink.removeClass('p-ads-lnk-dsbld');
				}
			});

			// Function to click all the links below images (block/unblock, hold/unhold) in the current ad row
			var clickImageActionLinks = function(eventSrc, linkText) {
				getImageActionLinks(eventSrc, linkText).click();
			};

			// Set the click event on the block/unblock links to block images
			$('a.actn-blckAllImg').click(function() { clickImageActionLinks(this,   'block'); });
			$('a.actn-ublkAllImg').click(function() { clickImageActionLinks(this, 'unblock'); });
		};

		// Make the "Next" button at the bottom of the page so actually take you to the next page
		var fixNextButton = function() {

			// Current page number (zero-indexed!)
			var pageNum = Number($('#srch-pgnum').val());

			// Number of ads per page
			var adsPerPage = Number($('#searchForm :[name="searchRequest.adsPerPage"][checked]').attr('value'));

			// Number of results
			var totalResults = Number($('#ads-srchfrm-hits').text().match(/\d+/));

			// Number of result pages
			var totalPages = Math.ceil(totalResults / adsPerPage);

			// If there are more pages of results to see, turn on the "next" button
			if ((pageNum + 1) < totalPages) {

				// The page defined a click handler for the "Next" button. It is useless.
				// Undefine it and create our own, which actually works.
				$('#ads-pager a.next').unbind('click').click(function(e){
					e.preventDefault();

					// Just take the page number already in the form, increment it, and put it back
					$('#srch-pgnum').val(pageNum + 1);

					// Submit the search
					$('#srch-frmactn').val('submitSearch');
					$('#searchForm').submit();
					$('#pg-ldr').fadeIn('fast'); 

					// Reset the value in the search form in case the user goes back and clicks "next" again
					$('#srch-pgnum').val(pageNum);
				}).attr("title", "Go to page " + (pageNum + 2));
			}

			// No more result pages; disable the next button
			else {
				var nextButton = $('#ads-pager a.next');
				nextButton.unbind('click').click(function(e) { e.preventDefault(); });
				nextButton.css("cursor", "default").css("opacity", "0.7");
				nextButton.attr("title", "No more pages");
			}
		};

		// Adds some visual cues to the scoring summary tooltip:
		// Positive (bad) scores are highlighted in red; negative (good) scores are highlighted in green
		var highlightScoringSummary = function() {

			// Event handler for DOMNodeInserted
			var handleTooltip = function(event) {
				var el = event.target;

				// If the insertion was a tooltip and it has children...
				if ($(el).hasClass("c-tooltip") && $(el).children().length > 0) {

					// And the first child is a tooltip body that contains the text of the scoring summary...
					var tooltip = $(el).children().first();
					if (tooltip.hasClass("c-tooltip-bdy") && tooltip.text().indexOf("TOTAL (RISK + POLICY)") >= 0) {

						// Split it up by lines and deal with each line in turn
						var scoreLines = tooltip.html().split("<br>");

						var regularDiv = $("<div></div>");
						var hiddenDiv  = $("<div></div>").css("color", "#CCC");

						var tooltipNewHTML = "";

						// Function to highlight filters entries in the scoring summary
						var highlightMatchingFilters = function(wrapElement, lineText, highlightColour, boldFlag) {

							// We only care about lines that start with four spaces (the rest are section headers)
							if (lineText.match(/^&nbsp;&nbsp;&nbsp;&nbsp;/)) {
								SET_HIGHLIGHT(wrapElement, highlightColour);

								if (boldFlag == FLAG_BOLD) {
									wrapElement.css("font-weight", "bold");
								}
							}
						}

						// For each line in the scoring summary, wrap it in a div, highlight if necessay, and add to the HTML for the new tooltip we're building
						$.each(scoreLines, function() {
							var scoreLine = $.trim(this);

							if (scoreLine.length > 0) {
								var wrapDiv;

								if (scoreLine.match(/\(\+0\)/)) {
									wrapDiv = hiddenDiv.clone();
								}
								else if (scoreLine.match(/\(\+\d{3,}\)/)) {
									wrapDiv = regularDiv.clone();
									highlightMatchingFilters(wrapDiv, scoreLine, COLOUR_RED_HIGHLIGHT, FLAG_BOLD);
								}
								else if (scoreLine.match(/\(\+\d{1,2}\)/)) {
									wrapDiv = regularDiv.clone();
									highlightMatchingFilters(wrapDiv, scoreLine, COLOUR_RED_HIGHLIGHT, FLAG_NO_BOLD);
								}
								else if (scoreLine.match(/\(\-\d+\)/)) {
									wrapDiv = regularDiv.clone();
									highlightMatchingFilters(wrapDiv, scoreLine, COLOUR_GREEN_HIGHLIGHT, FLAG_NO_BOLD);
								}
								else {
									wrapDiv = regularDiv.clone();
								}

								wrapDiv[0].innerHTML = scoreLine;
								tooltipNewHTML += wrapDiv[0].outerHTML;
							}
						});

						// Set our tooltip to the HTML with the pretty highlighting
						tooltip.html(tooltipNewHTML);
					}
				}
			}

			// Wait for new DOM nodes and deal with them
			$(document).bind('DOMNodeInserted', handleTooltip);
		}

		// Set borders between ad rows to improve visual separation
		var addAdSeparators = function() {
			$("tr.adRow").css("border-bottom", "#888 4px solid");
			$("tr.adRow > td").css("padding", "15px 5px");
		};

		// Fix things in the header and search box
		createPermalink();
		extendKeywordField();
		addResetIcon();

		// Add borders between ads
		addAdSeparators();

		// Add links in ads
		linkifyAds();
		addBlockImageLinks();

		// Add highlighting in ads
		hlAdRisks();
		hlSearchTerms();
		highlightScoringSummary();

		// Fix things in the footer
		fixNextButton();
	}

	// Do the stuff in ReplyTS
	else if (location.pathname == PATH_REPLY_TS) {

		// Set the "ad ID" link to show all replies from that ad, not just the ones from the past day
		var fixIdLinks = function() {

			$('#rts-tbl td:first-child p:nth-child(2) a:first-child').attr('href', function() {
				return $(this).attr('href') + "&daterange=" + SEARCH_DATERANGE;
			});
		};

		// Add links to message IDs (note that they will only work with this extension installed)
		var linkifyReplies = function() {

			$('#rts-tbl td:first-child p:nth-child(2)').contents().filter(function() {
				return $(this).text().trim().match(/^Message ID: \d+$/); }).replaceWith(function() {
					var m = $(this).text().match(/\d+/)[0];
					return 'Message ID: <a href=\'?srch-jumptomessage-id=' + m + '\' target=\'_blank\'>' + m + '</a>';
				});
		};

		// Highlight the bad stuff in replies
		var hlReplyRisks = function() {

			SET_HIGHLIGHT($('span.j-block-status :first-child').filter(function() {
				return FREEMAIL_REGEX.test( $(this).text() );
			}), COLOUR_RED_HIGHLIGHT);
		};

		// Hide Gumtree boilerplate in replies
		var hideBoilerplate = function() {

			var repliesWithBoilerplate = $('div.rts-mail-body').filter(function() {
				return ($(this).text().trim().indexOf('Someone has replied to your ad!') == 0);
			});

			// Make a little function to replace a bunch of text with an inconspicuous ellipsis
			var collapse = function(el, regex) {

				el.innerHTML = el.innerHTML.replace(regex, function(matched) {
					return "<span style='color: #AAA;'>[ ... ]</span>";
				});
			}

			repliesWithBoilerplate.each(function() {
				collapse(this, REPLY_BEGIN_REGEX);
				collapse(this, REPLY_END_REGEX);
			});
		};

		// Fix all the things in replies
		var initReplies = function() {

			// If the results table is not flagged as fixed, immediately set the flag to fixed and then fix all the replies
			// Conveniently, every time a new search is performed, we get a new results table (with the flag not set, of course)
			if ($('#rts-tbl').length > 0 && $('#rts-tbl').data('fixed') != true) {
				$('#rts-tbl').data('fixed', true);

				fixIdLinks();
				linkifyReplies();
				hlReplyRisks();
				hideBoilerplate();
			}
		};

		// Watch for elements being added to the reply screening container
		$('#replyts-screening-results').bind('DOMNodeInserted', initReplies);
		initReplies();
	}

	// Do the stuff in the spam reports
	else if (location.pathname == PATH_SPAM_REPORT) {

		// Add links to message IDs, ad IDs, and IPs in the spam report
		var linkifySpamReport = function() {
			// Wrap message IDs and ad IDs in links
			$('tr.record td:nth-child(3)').wrapInner(function() {
				return "<a href='" + PATH_REPLY_TS + "?srch-jumptomessage-id=" + $(this).text() + "' target='_blank'>";
			});
			$('tr.record td:nth-child(4)').wrapInner(function() {
				return "<a href='" + PATH_MANAGE_ADS + "?formAction=submitSearch&idAndEmailField=" + $(this).text() + "' target='_blank'>";
			});
			$('tr.record td:nth-child(7)').wrapInner(function() {
				return "<a href='" + PATH_REPLY_TS + "?ip=" + $(this).text() + "&daterange=LAST_DAY' target='_blank'>";
			});
		}

		// No jQuery by default, so add it in and pass our linkify function in as a callback
		injectJQuery(linkifySpamReport);
	}
};

// Main function
(function() {

	// If we have an unsafeWindow and it has a jQuery, we are in business...
	if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') {

		// Just grab our jQuery object from the unsafeWindow and pull it into our script
		jQuery = unsafeWindow.jQuery;
		$      = unsafeWindow.jQuery;
		Belen  = unsafeWindow.Belen;

		initJQueryHook();
		initApplication();
	}

	// If we don't have an unsafeWindow, we will have to inject the script into the page and run it in the page context to get access to the page's jQuery (which hopefully exists)
	else {

		// Create a script element, stuff the text of initApplication inside an anonymous function and immediately call it, and add all that to the end of the document body
		runInPageContext(initJQueryHook);
		runInPageContext(initApplication);
	}

})();
