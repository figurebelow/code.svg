/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;
let Functions = require ("./utils/Functions.js").Functions;

/**
 * Rect class
 * @extends Path
 */
class Rect extends Path {

  /**
   * Class constructor
   */
  constructor (values) {
    var x = Functions.resolve (values, "x", 0);
    var y = Functions.resolve (values, "y", 0);
    let width = Functions.resolve (values, "width", 10);
    let height = Functions.resolve (values, "height", 5);
    let p0 = "M" + x + "," + y;
    let p1 = "L" + (x + width) + "," + y;
    let p2 = "L" + (x + width) + "," + (y + height);
    let p3 = "L" + x + "," + (y + height) + " z";
    let d = p0 + " " + p1 + " " + p2 + " " + p3;
    let procParams = values;
    if (values["d"] == undefined)
      procParams["d"] = d;
    super (procParams);
  }

  static RectFromTwoPoints (point1, point2, values) {
    let procParams = {};
    for (let key in values)
      procParams[key] = values[key];
    delete procParams["height"];
    var height = Functions.resolve(values, "height", 5);
    var vector = {x: point2.x - point1.x, y: point2.y - point1.y};
    var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    var p0 = "M" + point1.x + "," + (point1.y - height/2);
    var p1 = "L" + (point1.x + length) + "," + (point1.y - height/2);
    var p2 = "L" + (point1.x + length) + "," + (point1.y + height/2);
    var p3 = "L" + point1.x + "," + (point1.y + height/2) + "z";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    procParams["d"] = d;
    var rect = new Rect (procParams);
    var angle = Functions.calculateAngle(point1, point2);
    rect.rot(angle, point1);
    return rect;
  }

  shrink (val) {
    let shrinkFunc = function (point, i) {
      if (i == 0)
        return {x:val, y:val};
      if (i == 1)
        return {x:-val, y:val};
      if (i == 2)
        return {x:-val, y:-val};
      if (i == 3)
        return {x:val, y:-val};
      else
        return {x:0, y:0};
    }
    this.noise(shrinkFunc);
    return this;
  }

  clone () {
    var newRect = new Rect (this.attributes);
    return newRect;
  }

};

module.exports.Rect = Rect;
