"use strict";

let Scene = require ( "./src/Scene.js").Scene;

global.Layout        = require ( "./src/utils/Layout.js").Layout;
global.PS            = require ( "node-particles");
global.Colors        = require ( "./src/utils/Colors.js").Colors;
global.Functions     = require ("./src/utils/Functions.js").Functions;
global.Noise         = require ("./src/utils/Noise.js").Noise;
global.StrokeBuilder = require ("./src/utils/StrokeBuilder.js").StrokeBuilder;
global.PListBuilder  = require ("./src/utils/PListBuilder.js").PListBuilder;
global.Bezier        = require ("./src/Bezier.js").Bezier;
global.Paths         = require ("./src/utils/PathUtils.js").PathUtils;
global.Cfg           = require ("./src/utils/Cfg.js").Cfg;

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
    if (params.length != 2 && // node file.js
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

  save (svgContent) {
    var inputSrcCode = fs.readFileSync(this.mainFile);
    var srcLength = inputSrcCode;
    this.baseScene.setDesc({"xmlns:description": this.compressSource(inputSrcCode)});
    fs.writeFileSync(this.outputFile, svgContent);
    var srcLength = (inputSrcCode.length/1000);
    var svgLength = (svgContent.length/1000);
    console.log("Src file size    : " + srcLength.toFixed(2) + " KB");
    console.log("SVG content size : " + svgLength.toFixed(2) + " KB");
    console.log("Total: " + (svgLength + srcLength).toFixed(2) + " KB written to " + this.outputFile);
  }

  scene(attrs) {
    let scene = new Scene(attrs, this)
    this.baseScene = scene
    return scene
  }

};

module.exports = new CodeSvg();
