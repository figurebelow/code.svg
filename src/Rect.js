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
    var width = Rect.resolve (values, "width", 10);
    var height = Rect.resolve (values, "height", 5);
    var p0 = "M" + x + "," + y;
    var p1 = "L" + (x + width) + "," + y;
    var p2 = "L" + (x + width) + "," + (y + height);
    var p3 = "L" + x + "," + (y + height) + "z";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    var procParams = values;
    procParams["d"] = d;
    super (procParams);
    this.setInnerAttr({x:x, y:y, width:width, height:height})
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
    var rect = new Path (procParams);
    var angle = Utils.calculateAngle(point1, point2);
    rect.rot(angle, point1);
    return rect;
  }

  clone () {
    var newRect = new Rect (this.attributes);
    newRect.setInnerAttr(this.innerAttributes);
    return newRect;
  }

  shrink (val) {
    var x = this.getInnerAttr("x");
    var y = this.getInnerAttr("y");
    var width = this.getInnerAttr("width");
    var height = this.getInnerAttr("height");
    x += val;
    y += val;
    width -= val * 2;
    height -= val * 2;
    this.setInnerAttr({x: x});
    this.setInnerAttr({y: y});
    this.setInnerAttr({width: width});
    this.setInnerAttr({height: height});
    var p0 = "M" + x + "," + y;
    var p1 = "L" + (x + width) + "," + y;
    var p2 = "L" + (x + width) + "," + (y + height);
    var p3 = "L" + x + "," + (y + height) + "z";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    this.setAttr({"d":d});
    this.parsePoints(d);
    return this;
  }
};

module.exports.Rect = Rect;
