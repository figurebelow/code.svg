/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";
let Polyline = require ("./Polyline.js").Polyline;

class Polygon extends Polyline {

  constructor (values, style) {
    super (values, style);
    super.setAttr("type", "polygon");
  }

  clone () {
    var newElem = new Polygon (this.attributes, this.style);
    return newElem;
  }
};

module.exports.Polygon = Polygon;
