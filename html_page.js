var jsdom = require("jsdom"),
    UrlFSPath = require("./url_fs_path");

function HtmlPage(httpUrl) {
  this.url = httpUrl;
  this.links = [];
  this.callback = null;
  this.content = null;
}

HtmlPage.prototype.loadAndParseLinks = function(callMeOnFinish) {
  this.callback = callMeOnFinish;
  console.log("Loading page: " + this.url.href);
  parseAllLinks(this.url, this);
}

function parseAllLinks(url, self) {
  jsdom.env({
    url: url.href,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function(errors, window) {
      if (errors) {
        console.log("Error while loading page: " + url.href , errors);
        return;
      }
      var $ = window.$;
      self.content = window.document.innerHTML;
      $("a[href]").each(function() {
        //console.log(" -", $(this).text(), " ", $(this).attr('href'));
        var newLink = $(this).attr('href');
        if (newLink.indexOf("/") === 0) {
          newLink = url.protocol + "//" + url.hostname + newLink;
        }
        self.links.push(newLink);
      });
      self.callback();
    }
  });
}

HtmlPage.prototype.writeContent = function(urlFsPath) {
  console.log("Writing content for: " + this.url.href, " into ",
                urlFsPath.fileName);
  urlFsPath.write(this.content);
}

HtmlPage.prototype.writeContentToDisk = function() {
  var urlFsPath = new UrlFSPath(this.url.hostname + "/" + 
                      this.url.pathname);
  var self = this;
  urlFsPath.createIfDoesntExist(function() {
    self.writeContent(urlFsPath);
  });
}

module.exports =  exports = HtmlPage;
