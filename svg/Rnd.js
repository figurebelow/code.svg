/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var D3 = require ("../d3/d3.v3.min.js");

module.exports.Rnd = class Rnd {

  constructor (seed) {
    this.seed = seed;
  }

  val (lower, upper) {
    if (upper == undefined)
    {
      upper = lower; // consider [0,lower]
    }
    var s = Math.sin(this.seed) * 10000;
    this.seed = s - Math.floor(s);
    return Math.floor(this.seed * upper);
  }

  pick (list) {
    let numElems = list.length;
    if (!numElems)
      return null;
    return list[Math.round(this.val(numElems))];
  }

  colorIn (scale, start, end) {
    return D3.scale.linear().domain([1, 16^6]).range(["#000000","#FFFFFF"])(scale);
  }
};
