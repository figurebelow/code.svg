/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let assert = require ("assert");
let SVGBase = require ("./SVGBase.js").SVGBase;
let NonIntersecPolCenter = require ("./utils/Functions.js").NonIntersecPolCenter;
let PointsParser = require ("./grammars/PathGrammar.js");

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

  moveTo (xyPos) {
    var currentCenter = this.getCenter();
    var distance = {x: xyPos.x - currentCenter.x, y: xyPos.y - currentCenter.y};
    this.parsedPoints.forEach (function (point) {
      if (point.values != undefined) {
        point.values[0].x += distance.x;
        point.values[0].y += distance.y;
      }
    });
    this.updateD();
    return this;
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }

  updateD () {
    var newD = "";
    this.parsedPoints.forEach (function (point) {
      newD += point.type + point.values[0].x + "," + point.values[0].y + " ";
    });
    this.setAttr ({"d":newD});
  }
};

module.exports.Path = Path;
