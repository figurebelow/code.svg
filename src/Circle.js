/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;

class Circle extends Path {

  constructor (values, style) {
    var cx = values["cx"] || 0;
    var cy = values["cy"] || 0;
    var r = values["r"] || 5;
    var p0 = "M" + cx + "," + cy + " ";
    var p1 = "m" + (-r) + "," + 0 + " ";
    var p2 = "a" + r + "," + r + " " + 0 + " " + "1,0 " + (r * 2) + ",0 ";
    var p3 = "a" + r + "," + r + " " + 0 + " " + "1,0 " + -(r * 2) + ",0 ";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    var procParams = {"d":d};
    super (procParams, style);
  }

  getCenter () {
    return this.parsedPoints[0].values[0];
  }

  moveTo (xyPos) {
    this.parsedPoints[0].values[0].x = xyPos.x;
    this.parsedPoints[0].values[0].y = xyPos.y;
  }
};

module.exports.Circle = Circle;
