/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;

/**
 * Circle class
 * @extends Path
 */
class Circle extends Path {

  /**
   * Constructor
   * @param {map} values - values to initialize the Circle
   */
  constructor (values) {
    var cx = Path.resolve(values, "cx", 0);
    var cy = Path.resolve(values, "cy", 0);
    var r = Path.resolve(values, "r", 5);
    var p0 = "M" + cx + "," + cy + " ";
    var p1 = "m" + (-r) + "," + 0 + " ";
    var p2 = "a" + r + "," + r + " " + 0 + " " + "1,0 " + (r * 2) + ",0 ";
    var p3 = "a" + r + "," + r + " " + 0 + " " + "1,0 " + -(r * 2) + ",0 ";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    var procParams = values;
    procParams["d"] = d;
    procParams["r"] = r;
    super (procParams);
  }

  /**
   * Returns the center of the Circle
   * @return {map} xy position of the Circle
   * @override
   */
  getCenter () {
    return this.parsedPoints[0].values[0];
  }

  /**
   * Moves the circle to the given position
   * @param {map} xyPos - the xy position
   * @override
   */
  moveTo (xyPos) {
    this.parsedPoints[0].values[0].x = xyPos.x;
    this.parsedPoints[0].values[0].y = xyPos.y;
    var r = this.getAttr("r");
    var p0 = "M" + xyPos.x + "," + xyPos.y + " ";
    var p1 = "m" + r + "," + 0 + " ";
    var p2 = "a" + r + "," + r + " " + 0 + " " + "1,0 " + (r * 2) + ",0 ";
    var p3 = "a" + r + "," + r + " " + 0 + " " + "1,0 " + -(r * 2) + ",0 ";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    this.setAttr({"d":d});
    return this;
  }
};

module.exports.Circle = Circle;
