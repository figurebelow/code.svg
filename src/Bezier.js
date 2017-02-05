/**
* @license
* Copyright 2017 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict"

let Path = require ("./Path.js").Path;
let Functions = require ("./utils/Functions.js").Functions;

class Bezier extends Path {

  constructor(params) {
    params["d"] = "M0,0 C0,0,0,0,0,0z";
    super(params);
  }

  offsetInit (point, rel) {
    this.parsedPoints[0].values[0].x += point.x; // reset the init to the point
    this.parsedPoints[0].values[0].y += point.y;
    this.updateD();
    return this;
  }

  close() {
    this.parsedPoints.push({type:"z", values:[]});
  }

  setEnd (end, off) {
    this.parsedPoints[1].values[0].x = end.x + off.x;
    this.parsedPoints[1].values[0].y = end.y + off.y;
    this.updateD();
    return this;
  }

  appendControl (oc1, oc2) {
    let endPoint = this.parsedPoints[this.parsedPoints.length-2];
    let startPoint = this.parsedPoints[0];
    // this.parsedPoints.push({type:"M", values:[{x: endPoint.values[0].x,
    //                                   y: endPoint.values[0].y}]});
    let middle = Functions.NonIntersecPolCenter([{x:startPoint.values[0].x,
                                                  y:startPoint.values[0].y},
                                                {x:endPoint.values[0].x,
                                                 y:endPoint.values[0].y}]);
    let newPoint = {type:"C", values:[{x1: middle.x+oc1.x, y1: middle.y+oc1.y,
                                       x2: middle.x+oc2.x, y2: middle.y-oc2.y,
                                       x:startPoint.values[0].x, y:startPoint.values[0].y+40}]};
    this.parsedPoints.push(newPoint);
    this.close();
    this.updateD();
    return this;
  }

  setControl (oc1, oc2) {
    this.parsedPoints[1].values[0].x1 += oc1.x;
    this.parsedPoints[1].values[0].y1 += oc1.y;
    this.parsedPoints[1].values[0].x2 += oc2.x;
    this.parsedPoints[1].values[0].y2 += oc2.y;
    this.updateD();
    return this;
  }
};

module.exports.Bezier = Bezier;
