/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let PointsParser = require ("./grammars/PolygonGrammar.js");
let Path = require ("./Path.js").Path;

/**
 * Polyline class
 * @extends Path
 */
class Polyline extends Path {

  /**
   * Class constructor
   */
  constructor (values) {
    var points  = PointsParser.parse(values["points"]);
    var d = "";
    d += "M" + points[0].x + "," + points[0].y;
    points.forEach (function (point, i) {
      if (i > 0) {
        d += "L" + point.x + "," + point.y + " "
      }
    });
    var procParams = values;
    procParams["d"] = d;
    super (procParams);
  }
};

module.exports.Polyline = Polyline;
