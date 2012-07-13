const PageMod = require("page-mod").PageMod;
const self = require("self");

const SCRIPT_BELEN = 'Belen.user.js';
const SCRIPT_JQUERY = 'jquery-1.7.2.min.js';
const SCRIPT_REPLY_JUMP = 'replyts_jumptomessage.js';

const PATH_MANAGE_ADS = "http://cs.gumtree.com.au/searchAds.do";
const PATH_REPLY_TS = "http://cs.gumtree.com.au/replyts/screening.do";
const PATH_SPAM_REPORT = "http://cs.gumtree.com.au/spam-report.do";

exports.main = function() {
    console.log("Belen Enhancer installed");
        
    // At beginning of page load in replies, run jQuery and set up message jumping
    PageMod({
        include: PATH_REPLY_TS + "*",
        contentScriptFile: [
            self.data.url(SCRIPT_JQUERY),
            self.data.url(SCRIPT_REPLY_JUMP)
        ],
        contentScriptWhen: "start"
    });

    // At end of page load in spam report, run jQuery and the main script
    PageMod({
        include: PATH_SPAM_REPORT + "*",
        contentScriptFile: [
            self.data.url(SCRIPT_JQUERY),
            self.data.url(SCRIPT_BELEN)
        ],
        contentScriptWhen: "end"
    });

    // At end of page load in ads and replies, just run the main script
    PageMod({
        include: [
            PATH_MANAGE_ADS + "*",
            PATH_REPLY_TS + "*"
        ],
        contentScriptFile: self.data.url(SCRIPT_BELEN),
        contentScriptWhen: "end"
    });
};
