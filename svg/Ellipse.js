/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("./SVGBase.js").SVGBase;

module.exports.Ellipse = class Ellipse extends SVGBase {

  constructor (values, style) {
    super ("ellipse", values, style);
  }

  clone () {
    var newElem = new Ellipse (this.attributes, this.style);
    return newElem;
  }

  getCenter () {
    return {x: this.attributes["cx"], y: this.attributes["cy"]};
  }

  moveTo (xyPos) {
    this.setAttr ({cx: xyPos.x, cy: xyPos.y});
    return this;
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }
};
