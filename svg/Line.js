/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";
let SVGBase = require ("./SVGBase.js").SVGBase;

module.exports.Line = class Line extends SVGBase {

  constructor (values, style) {
    super ("line", values, style);
  }

  clone () {
    var newElem = new Line (this.attributes, this.style);
    return newElem;
  }

  getCenter () {
    return ({x: (this.getAttr ("x1") + this.getAttr ("x2"))/2,
             y: (this.getAttr ("y1") + this.getAttr ("y2"))/2});
  }

  moveTo (xyPos1, xyPos2) {
    this.setAttr({x1: xyPos1.x, y1:xyPos1.y, x2:xyPos2.x, y2:xyPos2.y})
    return this;
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }
};
