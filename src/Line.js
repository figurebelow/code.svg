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
   * @param {x1} x1 - initial x coord
   * @param {y1} y1 - initial y coord 
   * @param {x2} x2 - end x coord
   * @param {y2} y2 - end y coord
   */
  constructor (x1, y1, x2, y2, style) {
    var d = "M" + x1 + "," + y1 + " " + "L" + x2 + "," + y2;
    var procParams = {"d":d};
    super (procParams, style);
  }

  /**
   * Rotates the Line
   * @param {number} deg - degrees to rotate the Line
   */ 
  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
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
