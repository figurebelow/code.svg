/**
* @license
* Copyright 2017 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let PointsParser = require ("./grammars/PathGrammar.js");
let SVGBase = require("./SVGBase.js").SVGBase;

/**
 * Class Line
 * @extends Path
 */
class Pattern extends SVGBase {

  /**
   * Class constructor
   * @param {xy1} x1 initial xypoint
   * @param {xy2} x2 end xypoint
   * @param {object} params attributes
   */
  constructor (objects, par) {
    // id, x, y, width, height, patternUnits
    let params = par || {};
    params.patternUnits = (par != null && par.patternUnits) || "userSpaceOnUse";
    params.x = (par != null && par.x != null) || "0";
    params.y = (par != null && par.y != null) || "0";
    params.width = (par != null && par.width != null) ? par.width : 15;
    params.height = (par != null && par.height != null) ? par.height : 15;
    super ("pattern", params);
    this.append(objects);
  }

  /**
   * Moves the Line.
   * If only p1 is provided the line is moved to that point.
   * Otherwise the Line is redefined to start, end parameters
   * @param {number} p1 - initial point to move the Line to
   * @param {number} p2 - end point to move the Line to
   */
};

module.exports.Pattern = Pattern;
