/**
* @license
* Copyright 2017 Ruben Afonso, rubenaf.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict"

let Functions = require ("./Functions.js").Functions;

class PListBuilder {

  constructor (seed) {
    this.seed = seed;
    this.points = [];
    this.pathPoints = [];
  }

  fromPoints (points, subdivideN) {
    let subdiv = subdivideN || 0;
    this.points = points.slice(0);
    for (let it = 0; it < subdiv; it++) {
      let newPoints = this.points.slice(0);
      for (let i = 1; i < newPoints.length; i++) { // subdivide
        let intermediatePoint = Functions.NonIntersecPolCenter ([newPoints[i-1], newPoints[i]]);
        this.points.splice(i+(i-1), 0, intermediatePoint);
      }
    }
    return this;
  }

  build () {
    return this.points;
  }
}

module.exports.PListBuilder = PListBuilder;
