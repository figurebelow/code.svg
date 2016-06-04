/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var jsdom = require ('jsdom');
var fs = require ("fs");
var vm = require("vm");
var xmlserializer = require('xmlserializer');

// Generates all the requires to be injected to the final script
function genRequires () {
  // TODO
}

jsdom.env(
  "<html><body><div id=\"codesvg\"></div></body></html>", ['./src/d3/d3.v3.min.js'],
  function (err, window) {
     
  var mainFile = process.argv[2];
  var outputFile = process.argv[4];
  if (process.argv.length != 3 && process.argv.length != 5 && process.argv[3] != "-o")
  {
    console.log ("Syntax: node codesvg-mon.js mainFile -o outputFile");
    return;
  }
  if (outputFile === undefined) {
    var dot = mainFile.lastIndexOf(".");
    if (dot == -1)
      outputFile = mainFile + ".svg";
    else
      outputFile = mainFile.substr (0, dot) + ".svg";
  }

  try {
    var inputFile = process.argv[1];
    var data = fs.readFileSync(process.argv[2]);
    var functionText = "\"use strict\"; \
    var results = null;  \
    let Scene = require     (\"./src/Scene.js\").Scene; \
    let Rect = require      (\"./src/Rect.js\").Rect; \
    let Circle = require    (\"./src/Circle.js\").Circle; \
    let Ellipse = require   (\"./src/Ellipse.js\").Ellipse; \
    let Polyline = require  (\"./src/Polyline.js\").Polyline; \
    let Rnd = require       (\"./src/utils/Rnd.js\").Rnd; \
    let Layout = require    (\"./src/utils/Layout.js\"); \
    let Gradients = require (\"./src/utils/Gradients.js\");\
    let console = require   (\"console\"); \
    let D3 = require        (\"./src/d3/d3.v3.min.js\"); \
    results = function(){ \"use strict\"; "+ data + "\n}();";
    var sandbox = {require: require, root: window.d3.select("body>div"), results: null, e:null};
    vm.runInNewContext(functionText, sandbox, {columnOffset:true, lineOffset:true, displayErrors:true});
    fs.writeFileSync(outputFile, sandbox.results);
    console.log(sandbox.results.length/1000 + " Kbytes written to " + outputFile);
  }
  catch (ex) {
    console.log(ex.stack)
  }
});
