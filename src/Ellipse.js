/**
* @license
* Copyright 2018 Ruben Afonso, rubenaf.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;
let Functions = require ("./utils/Functions.js").Functions;

/**
 * Class Ellipse
 * @extends Path
 */
class Ellipse extends Path {

  /**
   * Class constructor
   * @param {map} values - initial values
   */
  constructor (values) {
    var cx = Functions.resolve (values, "cx", 0);
    var cy = Functions.resolve (values, "cy", 0);
    var rx = Functions.resolve (values, "rx", 5);
    var ry = Functions.resolve (values, "ry", 5);
    var p0 = "M" + cx + "," + cy + " ";
    var p1 = "m" + (-rx) + "," + 0 + " ";
    var p2 = "a" + rx + "," + ry + " " + 0 + " " + "1,0 " + (rx * 2) + ",0 ";
    var p3 = "a" + rx + "," + ry + " " + 0 + " " + "1,0 " + -(rx * 2) + ",0 ";
    var d = p0 + " " + p1 + " " + p2 + " " + p3;
    var procParams = values;
    procParams["d"] = d;
    super (procParams);
  }

  /**
   * Returns the center of the Ellipse
   * @return {map} xy position
   */
  getCenter () {
    return this.parsedPoints[0].values[0];
  }

  /**
   * Moves the Ellipse to the given position
   * @param {ma} xyPos - xy position to move the Ellipse to
   */
  moveTo (xyPos) {
    this.parsedPoints[0].values[0].x = xyPos.x;
    this.parsedPoints[0].values[0].y = xyPos.y;
    return this;
  }
};

module.exports.Ellipse = Ellipse;
