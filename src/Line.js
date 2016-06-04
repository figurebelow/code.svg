/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("./SVGBase.js").SVGBase;

class Line extends SVGBase {

  constructor (x1, y1, x2, y2, style) {
    super ("line", {}, style);
    this.setAttr ({"x1":x1});
    this.setAttr ({"y1": y1});
    this.setAttr ({"x2": x2});
    this.setAttr ({"y2": y2});
  }

  clone () {
    var newElem = new Line (this.getAttr("x1"), this.getAttr("y1"), this.getAttr("x2"), this.getAttr("y2"), this.style);
    return newElem;
  }

  getCenter () {
    return ({x: (this.getAttr ("x1") + this.getAttr ("x2"))/2,
             y: (this.getAttr ("y1") + this.getAttr ("y2"))/2});
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

module.exports.Line = Line;
