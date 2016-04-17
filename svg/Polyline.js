/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";
let SVGBase = require ("./SVGBase.js").SVGBase;
let NonIntersecPolCenter = require ("../utils/Functions.js").NonIntersecPolCenter;
let PointsParser = require ("../grammars/PolygonGrammar.js");

class Polyline extends SVGBase {

  constructor (values, style) {
    super ("polyline", values, style);
    if ("points" in values)
      this.parsedPoints = PointsParser.parse(values["points"]);
    else {
      super.setAttr ("points", "");
      this.parsedPoints = [];
    }
  }

  clone () {
    var newElem = new Polyline (this.attributes, this.style);
    return newElem;
  }

  getCenter () {
    return NonIntersecPolCenter (this.parsedPoints);
  }

  moveTo (x,y) {
    var center = this.getCenter();
    var newStrPoints = "";
    var newX = (x - center.x);
    var newY = (y - center.y);
    for (var i = 0; i < this.parsedPoints.length; i++)
    {
      this.parsedPoints[i].x += newX;
      this.parsedPoints[i].y += newY;
      newStrPoints += this.parsedPoints[i].x + "," + this.parsedPoints[i].y + " ";
    }
    //this.parent.setAttribute.call (this, "points", newStrPoints);
    super.setAttr ({"points": newStrPoints});
    return this;
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }
};

module.exports.Polyline = Polyline;
