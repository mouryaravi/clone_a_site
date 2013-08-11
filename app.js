var cmdLineParser = require("./command_line_parser"),
    archiver = require("./archiver");

cmdLineParser.parse();
var httpUrl = cmdLineParser.getUrl();
console.log("Archiving url: " + httpUrl.href);

archiver.archive(httpUrl);
