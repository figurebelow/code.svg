/**
* @license
* Copyright 2017 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

class Noise {

  static x (val) {
    return ( function f () {
      return {x: Rand.random(val), y:0};
    });
  }

  static y (val) {
    return ( function f () {
      return {x: 0, y: Rand.random(val)};
    });
  }

  static xy (valx, valy) {
    return ( function f () {
      return {x: Rand.random(valx), y: Rand.random(valy)};
    });
  }

  static expand (refPoint) {
    function f (pathPoint) {
      let offset = 20;
      let distance = Math.sqrt(refPoint.x * refPoint.x + pathPoint.y * pathPoint.y);
      let forcex = offset * ((refPoint.x - pathPoint.x)) / Math.pow(distance,2);
      let forcey = offset * ((refPoint.y - pathPoint.y)) / Math.pow(distance,2);
      return {x:forcex, y:forcey};
    }
    return f;
  }

  static shrink (Rnd, point) {

  }
};

module.exports.Noise = Noise;
