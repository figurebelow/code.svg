/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("./SVGBase.js").SVGBase;


class Rect extends SVGBase {

  constructor (values, style) {
    super ("rect", values, style);
  }

  clone () {
    var newRect = new Rect (this.attributes, this.style);
    return newRect;
  }

  getCenter () {
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
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }
};

module.exports.Rect = Rect;
