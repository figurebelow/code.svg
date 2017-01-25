"use strict";

global.Scene         = require ( "./src/Scene.js").Scene;
global.Rect          = require ( "./src/Rect.js").Rect;
global.Circle        = require ( "./src/Circle.js").Circle;
global.Line          = require ( "./src/Line.js").Line;
global.Path          = require ( "./src/Path.js").Path;
global.Ellipse       = require ( "./src/Ellipse.js").Ellipse;
global.Polyline      = require ( "./src/Polyline.js").Polyline;
global.Rnd           = require ( "./src/utils/Rnd.js").Rnd;
global.Layout        = require ( "./src/utils/Layout.js").Layout;
global.Gradients     = require ( "./src/utils/Gradients.js");
global.Filters       = require ( "./src/utils/Filters.js");
global.Pattern       = require ( "./src/Pattern.js").Pattern;
global.PS            = require ( "./src/utils/node-particles/js/ParticleSystem.js");
global.Colors        = require ( "./src/utils/Colors.js").Colors;
global.Curves        = require ("./src/utils/Parametrics.js").Parametrics;
global.Functions     = require ("./src/utils/Functions.js");
global.Boids         = require ("./src/utils/node-particles/js/Boids.js");
global.Noise         = require ("./src/utils/Noise.js").Noise;
global.PathBuilder   = require ("./src/utils/PathBuilder.js").PathBuilder;

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
    var srcLength = inputSrcCode;
    scene.setDesc({"xmlns:description": this.compressSource(inputSrcCode)});
    fs.writeFileSync(this.outputFile, scene.exportContent());
    var raw = scene.exportContent();
    var srcLength = (inputSrcCode.length/1000);
    var svgLength = (raw.length/1000);
    console.log("Src file size    : " + srcLength.toFixed(2) + " KB");
    console.log("SVG content size : " + svgLength.toFixed(2) + " KB");
    console.log("Total: " + (svgLength + srcLength).toFixed(2) + " KB written to " + this.outputFile);
  }
};

module.exports = new CodeSvg();
