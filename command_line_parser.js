var url = require("url");

function CommandLineParser() {
}

CommandLineParser.prototype.getUrl = function() {
  return url.parse(process.argv[2]);
}

CommandLineParser.prototype.parse = function() {
  if (process.argv.length < 3) {
    console.log("Usage: node app.js <http-url>");
    process.exit(-1);
  }
}

module.exports = new CommandLineParser();
