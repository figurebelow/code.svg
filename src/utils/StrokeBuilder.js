/**
* @license
* Copyright 2017 Ruben Afonso, rubenaf.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Circle = require ("../Circle.js").Circle;
let Functions = require ("./Functions.js").Functions;
let Rnd = require ("./Rnd.js").Rnd;
let Bezier = require ("../Bezier.js").Bezier;

class StrokeBuilder {

  constructor (seed) {
    this.strokes = [];
    this.points = [];
    this.drawPoints = false;
    this.groupSize = 2;
    this.rnd = new Rnd(seed || 1);
  }

  fromPoints (points) {
    let that = this;
    this.points = points.slice(0);
    return this;
  }

  asRects (params) {
    let that = this;
    this.points.forEach (function (point, i) {
      if (i > 0) {
        that.strokes.push(Rect.RectFromTwoPoints(that.points[i-1], that.points[i], params));
      }
    });
    return this;
  };

  asStroke (pathGen) {
    this.pathGen = pathGen;
    return this;
  }

  asSmoothBezier (params) {
    let that = this;
    this.points.forEach (function (point, i) {
      if (i > 0) {
        that.strokes.push (Functions.genSmoothBezier(that.points[i-1], that.points[i], params));
      }
    });
    return this;
  }

  groupBy (value) {
    this.groupSize = value;
    return this;
  }

  showPoints(flag) {
    this.drawPoints = flag;
    return this;
  }

  build(scene) {
    let genStrokes = Functions.group(this.points, this.groupSize, this.pathGen);
    genStrokes.forEach(s => this.strokes.push(s));

    // drawing part
    this.strokes.forEach(f => scene.add(f));
    if (this.drawPoints)
      this.points.forEach(p => scene.add(new Circle({cx:p.x, cy:p.y, r:5, fill:"red"})));
  }


};

module.exports.StrokeBuilder = StrokeBuilder;
