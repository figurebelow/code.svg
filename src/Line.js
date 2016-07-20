/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;
let PointsParser = require ("./grammars/PathGrammar.js");

class Line extends Path {

  constructor (x1, y1, x2, y2, style) {
    var d = "M" + x1 + "," + y1 + " " + "L" + x2 + "," + y2;
    var procParams = {"d":d};
    super (procParams, style);
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }

  moveTo (p1, p2) {
    if (p2 == undefined)
      super.moveTo(p1);
    else {
      var d = "M" + p1.x + "," + p1.y + " " + "L" + p2.x + "," + p2.y;
      this.parsedPoints = PointsParser.parse (d);
    }
  }
};

module.exports.Line = Line;
