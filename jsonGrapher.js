// JSON to use for testing
var testFiles = require('./test/jsonTestFiles.js');

// JSON parsers
var parser = require('./parsers');

// OrientDB writer
var orient = require("./orientdb");
orient.init("localhost", "my_db_2", "root", "root");

//Cayley writer
var cayley = require('./cayley');

parser.parse(testFiles.simple, "origin", orient.add, orient.finish);
// parser.parse(testFiles.simple, "origin", cayley.add, cayley.finish);
