/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var jsdom = require ('jsdom');
var dom = require('xmldom');
var fs = require ("fs");
var vm = require("vm");
var compressjs = require('compressjs');

function compressSource (src) {
  var algorithm = compressjs.Bzip2;
  var data = new Buffer(src, 'utf8');
  var compressed = algorithm.compressFile(data);
  return new Buffer(compressed).toString('base64');
}

function uncompressAndPrint (svgFile) {
  try {
    var svgContent = fs.readFileSync(svgFile);
    var plainText = new Buffer(svgContent).toString();
    var dom2 = new dom.DOMParser().parseFromString(plainText);
    var bzip = dom2.getElementsByTagName("svg")[0].getAttribute("xmlns:description");
    if (bzip != undefined && bzip != "") {
      var algorithm = compressjs.Bzip2;
      var data = new Buffer (bzip, 'base64');
      try {
        var uncompressed = algorithm.decompressFile (data);
        console.log (new Buffer(uncompressed).toString('utf8'))
      }
      catch (ex) {
        console.log("Error: the source format is invalid, unable to extract")
      }
    }
  }
  catch (ex) {
    console.log(ex.stack)
  }
}

function showInfoHelp () {
  console.log ("Syntax: node codesvg-mon.js mainFile -o outputFile");
  console.log ("        node codesvg-mon.js view svgFile");
}

jsdom.env(
  "<html><body><div id=\"codesvg\"></div></body></html>", ['./src/d3/d3.v3.min.js'],
  function (err, window) {

  var mainFile = process.argv[2];
  var outputFile = process.argv[4];
  if (process.argv.length != 3 && process.argv.length != 5 && process.argv.length != 4 && process.argv[3] != "-o")
  {
    showInfoHelp();
    return;
  }
  if (process.argv[2] == "view") {
    mainFile = process.argv[3];
    if (mainFile === undefined) {
      showInfoHelp();
      return;
    }
    else {
      uncompressAndPrint (mainFile);
    }
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
    var comp = compressSource(data);
    var functionText = "\"use strict\"; \
    var results = null;  \
    let Scene = require     (\"./src/Scene.js\").Scene; \
    let Rect = require      (\"./src/Rect.js\").Rect; \
    let Circle = require    (\"./src/Circle.js\").Circle; \
    let Ellipse = require   (\"./src/Ellipse.js\").Ellipse; \
    let Polyline = require  (\"./src/Polyline.js\").Polyline; \
    let Rnd = require       (\"./src/utils/Rnd.js\").Rnd; \
    let Layout = require    (\"./src/utils/Layout.js\").Layout; \
    let Gradients = require (\"./src/utils/Gradients.js\");\
    let Filters = require   (\"./src/utils/Filters.js\");\
    let console = require   (\"console\"); \
    let D3 = require        (\"./src/d3/d3.v3.min.js\"); \
    let PS = require (\"./src/utils/node-particles/js/ParticleSystem.js\");\
    let Colors = require (\"./src/utils/Colors.js\").Colors; \
    var scene  = function(){ \"use strict\"; "+ data + "\n}(); \
    scene.attributes[\"desc\"] = \"" + comp +"\";\
    results = scene.exportContent()";
    var sandbox = {require: require, root: window.d3.select("body>div"), results: null, e:null};
    vm.runInNewContext(functionText, sandbox, {columnOffset:true, lineOffset:true, displayErrors:true});
    fs.writeFileSync(outputFile, sandbox.results);
    var srcLength = (comp.length/1000).toFixed(2);
    var svgLength = (sandbox.results.length/1000).toFixed(2);
    console.log("Src file size    : " + srcLength + " KB");
    console.log("SVG content size : " + (svgLength - srcLength).toFixed(2) + " KB");
    console.log("Total: " + svgLength + " KB written to " + outputFile);
  }
  catch (ex) {
    console.log(ex.stack)
  }
});
