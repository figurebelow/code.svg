/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("./SVGBase.js").SVGBase;
let Path = require ("./Path.js").Path;

// width, height, x, y
class Rect extends Path {

  constructor (values, style) {
    var x = values["x"] || 0;
    var y = values["y"] || 0;
    var width = values["width"] || 10;
    var height = values["height"] || 5;
    var p0 = "M" + x + "," + y;
    var p1 = "L" + (x + width) + "," + y;
    var p2 = "L" + (x + width) + "," + (y + height);
    var p3 = "L" + x + "," + (y + height);
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    var procParams = {"d":d};
    super (procParams, style);
  }

  /*clone () {
    var newRect = new Rect (this.attributes, this.style);
    return newRect;
  }*/

  /*getCenter () {
    var x = this.getAttr("x");
    var y = this.getAttr("y");
    var width = this.getAttr("width");
    var height= this.getAttr("height");
    return ({x: x + width/2, y: y + height/2});
  }

  moveTo (xyPos, x, y) {
    var width = this.getAttr("width");
    var height= this.getAttr("height");
    this.setAttr ({x: x+ xyPos.x - width/2, y: y+ xyPos.y - height/2});
    if (this.isRotated())
      this.rot (this.getRotate().deg);
    return this;
  }*/

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }
};

module.exports.Rect = Rect;
