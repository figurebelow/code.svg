/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var assert = require ("assert");
var SVGBase = require ("../svg/SVGBase.js").SVGBase;
var NonIntersecPolCenter = require ("../utils/Functions.js").NonIntersecPolCenter;

class Path extends SVGBase {

  constructor (values, style) {
    super ("path", values, style);
  }

  clone () {
    var newElem = new Path (this.attributes, this.style);
    return newElem;
  }

  getCenter () {
    return NonIntersecPolCenter ();
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
