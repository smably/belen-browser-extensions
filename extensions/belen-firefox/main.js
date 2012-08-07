const PageMod = require("page-mod").PageMod;
const self = require("self");

const SCRIPT_BELEN = 'Belen.user.js';
const SCRIPT_JQUERY_HOOK = 'jquery.hook.js';
const SCRIPT_REPLY_JUMP = 'replyts_jumptomessage.js';

const PATH_MANAGE_ADS = "http://cs.gumtree.com.au/searchAds.do";
const PATH_REPLY_TS = "http://cs.gumtree.com.au/replyts/screening.do";
const PATH_SPAM_REPORT = "http://cs.gumtree.com.au/spam-report.do";

exports.main = function() {
    console.log("Belen Enhancer installed");
        
    // At beginning of page load in replies, run jQuery and set up message jumping
    PageMod({
        include: PATH_REPLY_TS + "*",
        contentScriptFile: self.data.url(SCRIPT_REPLY_JUMP),
        contentScriptWhen: "start"
    });

    // At end of page load in spam report, ads, and replies, run the main script
    PageMod({
        include: [
            PATH_SPAM_REPORT + "*",
            PATH_MANAGE_ADS + "*",
            PATH_REPLY_TS + "*"
        ],
        contentScriptFile: [
            self.data.url(SCRIPT_JQUERY_HOOK),
            self.data.url(SCRIPT_BELEN)
        ],
        contentScriptWhen: "end"
    });
};
