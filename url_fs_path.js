var fs = require("fs"),
    mkpath = require("mkpath"),
    path = require("path"),
    _s = require("underscore.string");

function UrlFSPath(filePath) {
  this.filePath = filePath;
  this.directory = path.dirname(filePath);
  this.fileName = _s.endsWith(filePath, "/")? "index.html" : 
                  path.basename(filePath);
}

UrlFSPath.prototype.createIfDoesntExist = function(callback) {
  var self = this;
  fs.exists(this.directory, function(exists) {
    console.log("Directory: ", self.directory, " exists? ", exists);
    if (!exists) {
      mkpath(self.directory, function(err) {
        if (err) throw err;
        callback();
      });
    }
    else {
      callback();
    }
  });
}

UrlFSPath.prototype.write = function(data) {
  var fileRelativePath = path.join(this.directory, this.fileName);
  fs.writeFile(fileRelativePath, data, function(err) {
    if (err) throw err;
    console.log("Wrote data to file: ", fileRelativePath);
  });
}

module.exports = exports = UrlFSPath;