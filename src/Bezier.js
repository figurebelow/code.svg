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
    let d = Functions.resolve (params, "d", "M0,0 C0,0,0,0,0,0z");
    if (params === undefined)
      params = {d:d};
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

  setEnd (end) {
    this.parsedPoints[1].values[0].x = end.x;
    this.parsedPoints[1].values[0].y = end.y;
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

  static createLine (p1, p2, values) {
    let bezier = new Bezier();
    let procParams = {};
    for (let key in values)
      procParams[key] = values[key];
    delete procParams["height"];
    var height = Functions.resolve(values, "height", 100);
    var vector = {x: p2.x - p1.x, y: p2.y - p1.y};
    var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    //var p0 = "M" + point1.x + "," + (point1.y - height/2);
    //var p1 = "L" + (point1.x + length) + "," + (point1.y - height/2);
    //var p2 = "L" + (point1.x + length) + "," + (point1.y + height/2);
    //var p3 = "L" + point1.x + "," + (point1.y + height/2) + "z";
    //var d = p0 + " " + p1 + " " + p2 + " " + p3;
    var c0 = "M" + p1.x + "," + (p1.y-height/2) + " ";
    var c1 = "C" + (p1.x + length) + "," + (p2.y - height/2) + "," + p1.x + "," + (p1.y-height/2) + "," + p2.x + "," + (p2.y - height/2);
    c1 += " v" + height + " ";
    c1 += "C" + (p1.x + length) + "," + (p2.y + height/2) + "," + p1.x + "," + (p1.y+height/2) + "," + p1.x + "," + (p1.y + height/2);
    var c2 = "z";
    procParams["d"] = c0 + c1 + c2;
    var rect = new Bezier (procParams);
    var angle = Functions.calculateAngle(p1, p2);
    rect.rot(angle, p1);
    return rect;
  }
};

module.exports.Bezier = Bezier;
