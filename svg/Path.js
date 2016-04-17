/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let assert = require ("assert");
let SVGBase = require ("../svg/SVGBase.js").SVGBase;
let NonIntersecPolCenter = require ("../utils/Functions.js").NonIntersecPolCenter;
let PointsParser = require ("../grammars/PathGrammar.js");

class Path extends SVGBase {

  constructor (values, style) {
    super ("path", values, style);
    if ("d" in values)
      this.parsedPoints = PointsParser.parse (values["d"]);
    else {
      this.setAttr({d:""});
      this.parsedPoints = [];
    }
  }

  clone () {
    var newElem = new Path (this.attributes, this.style);
    return newElem;
  }

  getCenter () {
    var vertices = [];
    this.parsedPoints.forEach (function (instruction) {
      if (instruction.values != undefined) {
         vertices = vertices.concat (instruction.values)
       }
     });
     return NonIntersecPolCenter (vertices);
  }

  moveTo (xyPos1, xyPos2) {
    this.setAttr({x1: xyPos1.x, y1:xyPos1.y, x2:xyPos2.x, y2:xyPos2.y});
    return this;
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }
};

module.exports.Path = Path;
