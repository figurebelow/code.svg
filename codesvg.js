
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
var compressjs = require('compressjs');

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

  constructor () {
    var params = process.argv;
    var mainFile = params[1];
    this.mainFile = mainFile;
    this.outputFile = params[3];
    if (params.length != 2 &&             // node file.js
       (params.length == 3 || params[2] != "-o"))
    {
      this.showInfoHelp();
      process.exit(1);
    }
  
    if (this.outputFile === undefined) {
      var dot = mainFile.lastIndexOf(".");
      if (dot == -1)
        this.outputFile = mainFile + ".svg";
      else
        this.outputFile = mainFile.substr (0, dot) + ".svg";
    }
  }

  save (scene) {
    var inputSrcCode = fs.readFileSync(this.mainFile);
    scene.setAttr({"xmlns:description": this.compressSource(inputSrcCode)});
    fs.writeFileSync(this.outputFile, scene.exportContent());
    var raw = scene.exportContent();
    var srcLength = (raw.length/1000).toFixed(2);
    var svgLength = (raw.length/1000).toFixed(2);
    console.log("Src file size    : " + srcLength + " KB");
    console.log("SVG content size : " + (svgLength - srcLength).toFixed(2) + " KB");
    console.log("Total: " + svgLength + " KB written to " + this.outputFile);
  }
};

module.exports = new CodeSvg();
