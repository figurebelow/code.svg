/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;
let PointsParser = require ("./grammars/PathGrammar.js");
let Functions = require ("./utils/Functions.js").Functions;

/**
 * Class Line
 * @extends Path
 */
class Line extends Path {

  /**
   * Class constructor
   * @param {xy1} x1 initial xypoint
   * @param {xy2} x2 end xypoint
   * @param {object} params attributes
   */
  constructor (params) {
    var x1 = Functions.resolve (params, "x1", 0);
    var y1 = Functions.resolve (params, "y1", 0);
    var x2 = Functions.resolve (params, "x2", 0);
    var y2 = Functions.resolve (params, "y2", 0);
    var d = "M" + x1 + "," + y1 + " " + "L" + x2 + "," + y2;
    var procParams = params;
    procParams["d"] = d;
    super (procParams);
  }

  /**
   * Moves the Line.
   * If only p1 is provided the line is moved to that point.
   * Otherwise the Line is redefined to start, end parameters
   * @param {number} p1 - initial point to move the Line to
   * @param {number} p2 - end point to move the Line to
   */
  moveTo (p1, p2) {
    if (p2 == undefined)
      super.moveTo(p1);
    else {
      var d = "M" + p1.x + "," + p1.y + " " + "L" + p2.x + "," + p2.y;
      this.parsedPoints = PointsParser.parse (d);
    }
    return this;
  }
};

module.exports.Line = Line;
