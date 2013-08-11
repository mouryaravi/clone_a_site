var request = require("request"),
    fs = require('fs'),
    url = require("url");

var data = {};

exports.isDuplicateData = function(input) {
  return (data[input] === 1)? true: false;
}

exports.store =  function(input) {
  console.log("Storing: " + input);
  data[input] = 1;
};

function renderPageAsPDF(url) {
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      console.log("Opening file: file://localhost/" + process.cwd() + "/out.html");
      page.open("file://localhost/" + process.cwd() + "/out.html", function(status) {
        console.log("Status:  " + status);
        page.render('out.pdf', function() {
          console.log("Rendered!");
          ph.exit();
        });
      });
    });
  });
}

function addContentToFile(httpUrl, callback) {
  createDirectoryIfNotExists();
  request(httpUrl.href, function(err, response, body) {
    if (err && response.statusCode != 200) {
      console.log("Error opening url: " + httpUrl.href + ", error: " + err);
      return;
    }
    console.log("Adding content of ", httpUrl.href, " to file: ", httpUrl.pathname);
    fs.writeFile(httpUrl.pathname, body, function(err) {
      console.log("Added ", httpUrl.href, " to ", httpUrl.pathname);
      callback();
    });
  });
}
