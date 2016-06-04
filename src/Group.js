/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";
let SVGBase = require ("./SVGBase.js").SVGBase;

class Group extends SVGBase {

  constructor (values, style) {
    super ("g", values, style);
  }

  clone () {
    var newElem = new Group (this.attributes, this.style);
    return newElem;
  }
}
