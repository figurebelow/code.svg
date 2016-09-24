/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Path = require ("./Path.js").Path;
let PointsParser = require ("./grammars/PathGrammar.js");

/**
 * Class Line
 * @extends Path
 */
class Line extends Path {

  /**
   * Class constructor
   * @param {xy1} x1 initial xypoint
   * @param {xy2} x2 end xypoint
   * @param {object} style style attributes
   */
  constructor (params, style) {
    var d = "M" + params.x1 + "," + params.y1 + " " + "L" + params.x2 + "," + params.y2;
    var procParams = {"d":d};
    super (procParams, style);
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
