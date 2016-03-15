/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var jsdom = require ('jsdom');
var fs = require ("fs");
var vm = require("vm");

// Generates all the requires to be injected to the final script
function genRequires () {
  // TODO
}

jsdom.env(
  "<html><body><div></div></body></html>",
  [ './d3/d3.v3.min.js' ],
  function (err, window) {

    if (process.argv.length < 3) {
      console.log ("Syntax: node jsdom mainFile");
      return;
    }
    var mainFile = process.argv[2];

    try {
      var inputFile = process.argv[1];
      var data = fs.readFileSync(process.argv[2]);
      var functionText = "\"use strict\"; \
          var results = null;  \
          let Scene = require (\"./svg/Scene.js\").Scene; \
          let Rect = require (\"./svg/Rect.js\").Rect; \
          let Circle = require (\"./svg/Circle.js\").Circle; \
          let Ellipse = require (\"./svg/Ellipse.js\").Ellipse; \
          let Rnd = require (\"./svg/Rnd.js\").Rnd; \
          let Layout = require (\"./utils/Layout.js\"); \
          let console = require (\"console\"); \
          let D3 = require (\"./d3/d3.v3.min.js\"); \
          results = function(){ \"use strict\"; "+ data + "\n}();";
      var sandbox = {require: require, root: window.d3.select("body>div"), results: null, e:null};
      vm.runInNewContext(functionText, sandbox, {columnOffset:true, lineOffset:true, displayErrors:true});
      fs.writeFileSync('out.svg', sandbox.results);
      console.log(sandbox.results.length/1000 + " Kbytes written to out.svg");
    }
    catch (ex) {
      console.log(ex.stack)
    }
  });
