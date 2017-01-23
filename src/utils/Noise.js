/**
* @license
* Copyright 2017 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

class Noise {

  static x (Rnd, val) {
    return ( function f () {
      return {x: Rnd.random(val), y:0};
    });
  }

  static y (Rnd, val) {
    return ( function f () {
      return {x: 0, y: Rnd.random(val)};
    });
  }


};

module.exports.Noise = Noise;
