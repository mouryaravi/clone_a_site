var HtmlPage = require("./html_page"),
    url = require("url"),
    store = require("./store");

exports.archive = function(httpUrl) {
  var page = new HtmlPage(httpUrl);
  var self = this;
  store.store(httpUrl.href);
  page.loadAndParseLinks(function() {
    page.writeContentToDisk();
    for (var idx = 0; idx < page.links.length; idx++) {
      var newUrl = url.parse(page.links[idx]);
      if (newUrl.hostname === httpUrl.hostname) {
        if (!store.isDuplicateData(newUrl.href)) {
          self.archive(newUrl);
        }
      }
    }
  });
}
