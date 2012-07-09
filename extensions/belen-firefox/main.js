var pageMod = require("page-mod");
var self = require("self");

pageMod.PageMod({
  include: "http://cs.gumtree.com.au/*",
  contentScriptFile: [self.data.url("Belen.user.js")]
});
