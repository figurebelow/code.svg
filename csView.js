/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var dom = require('xmldom');
var fs = require ("fs");
var vm = require("vm");
var compressjs = require('compressjs');

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
        console.log("Error: SVG xmlns:description field not found")
      }
    }
  }
  catch (ex) {
    console.log("Error: unable to open " + svgFile);
  }
}

function showInfoHelp () {
  console.log ("Syntax: node csView file.svg");
}

if (process.argv.length == 3) {
  var mainFile = process.argv[2];
  uncompressAndPrint (mainFile);
}
else {
  showInfoHelp();
}
