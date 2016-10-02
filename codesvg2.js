
"use strict";

GLOBAL.Scene = require     ( "./src/Scene.js").Scene;
GLOBAL.Rect = require      ( "./src/Rect.js").Rect;
GLOBAL.Circle = require    ( "./src/Circle.js").Circle;
GLOBAL.Line = require      ( "./src/Line.js").Line;
GLOBAL.Path = require      ( "./src/Path.js").Path;
GLOBAL.Ellipse = require   ( "./src/Ellipse.js").Ellipse;
GLOBAL.Polyline = require  ( "./src/Polyline.js").Polyline;
GLOBAL.Rnd = require       ( "./src/utils/Rnd.js").Rnd;
GLOBAL.Layout = require    ( "./src/utils/Layout.js").Layout;
GLOBAL.Gradients = require ( "./src/utils/Gradients.js");
GLOBAL.Filters = require   ( "./src/utils/Filters.js");
GLOBAL.PS = require ( "./src/utils/node-particles/js/ParticleSystem.js");
GLOBAL.Colors    = require ( "./src/utils/Colors.js").Colors;

var fs = require ("fs");

class CodeSvg {

  showInfoHelp () {
    console.log ("Syntax: node file.js");
    console.log ("        node file.js -o out.svg");
  }

  compressSource (src) {
    var algorithm = compressjs.Bzip2;
    var data = new Buffer(src, 'utf8');
    var compressed = algorithm.compressFile(data);
    return new Buffer(compressed).toString('base64');
  }

  uncompressAndPrint (svgFile) {
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
      console.log(ex.stack);
    }
  }

  constructor () {
    var params = process.argv;
    var mainFile = params[1];
    this.outputFile = params[3];
    if (params.length != 2 &&             // node file.js
       (params.length == 3 || params[2] != "-o"))
    {
      this.showInfoHelp();
      process.exit(1);
    }
    /*if (params[2] == "view") {
      mainFile = params[3];
      if (mainFile === undefined) {
        this.showInfoHelp();
        return;
      }
      else {
        this.uncompressAndPrint (mainFile);
      }
      return;
    }*/
    if (this.outputFile === undefined) {
      var dot = mainFile.lastIndexOf(".");
      if (dot == -1)
        this.outputFile = mainFile + ".svg";
      else
        this.outputFile = mainFile.substr (0, dot) + ".svg";
    }
  }

  save (svgContent) {
    fs.writeFileSync(this.outputFile, svgContent.exportContent());
    var raw = svgContent.exportContent();
    var srcLength = (raw.length/1000).toFixed(2);
    var svgLength = (raw.length/1000).toFixed(2);
    console.log("Src file size    : " + srcLength + " KB");
    console.log("SVG content size : " + (svgLength - srcLength).toFixed(2) + " KB");
    console.log("Total: " + svgLength + " KB written to " + this.outputFile);
  }
};

module.exports = new CodeSvg();
