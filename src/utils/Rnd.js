/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

//var D3 = require ("../d3/d3.v3.min.js");

class Rnd {

  constructor (seed) {
    if (typeof(seed) === "string") {
      var i = seed.length;
      while (i--) {
        this.seed += seed[i];
      }
    }
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

  getId () {
    var id = "id-";
    for (let i = 0; i < 8; i++)
    {
      id += String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }
    return id;
  }
};

module.exports.Rnd = Rnd;
