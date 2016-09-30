/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let D3 = require ("../d3/d3.v4.min.js");
let Random = require ("./node-particles/js/Random.js").Random;

class Rnd extends Random {

  pick (list) {
    let numElems = list.length;
    if (!numElems)
      return null;
    var index = Math.floor(this.random(numElems));
    return list[index];
  }

  colorIn (scale, start, end, initColor, endColor) {
    return D3.scaleLinear().domain([1, end]).range([initColor, endColor])(scale);
  }

  static genId () {
    var id = "id-";
    for (let i = 0; i < 10; i++)
    {
      id += String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }
    return id;
  }
};

module.exports.Rnd = Rnd;
