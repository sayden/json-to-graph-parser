// JSON to use for testing
var testFiles = require('./test/jsonTestFiles.js');

// JSON parsers
var parser = require('./parsers');

// OrientDB writer
var orient = require("./orientdb");
orient.init("localhost", "test", "root", "root");

//Cayley writer
var cayley = require('./cayley');

parser.parse("origin", testFiles.simple, orient.add, orient.finish);
// parser.parse("origin", testFiles.simple, cayley.add, cayley.finish);
