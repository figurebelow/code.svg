/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;
let Utils = require ("./utils/Functions.js");

/**
 * Rect class
 * @extends Path
 */
class Rect extends Path {

  /**
   * Class constructor
   */
  constructor (values) {
    var x = Rect.resolve (values, "x", 0);
    var y = Rect.resolve (values, "y", 0);
    let width = Rect.resolve (values, "width", 10);
    let height = Rect.resolve (values, "height", 5);
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
    var height = Rect.resolve(values, "height", 5);
    var vector = {x: point2.x - point1.x, y: point2.y - point1.y};
    var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    var p0 = "M" + point1.x + "," + (point1.y - height/2);
    var p1 = "L" + (point1.x + length) + "," + (point1.y - height/2);
    var p2 = "L" + (point1.x + length) + "," + (point1.y + height/2);
    var p3 = "L" + point1.x + "," + (point1.y + height/2) + "z";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    var procParams = values;
    procParams["d"] = d;
    var rect = new Rect (procParams);
    var angle = Utils.calculateAngle(point1, point2);
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
