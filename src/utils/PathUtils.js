
"use strict"

let D3 = require ("d3");

class PathUtils {

  static d(points, fun) {
    let input = points;
    if (points.getPoints != undefined)
      input = points.getPoints();
    var gen = D3.line()
      .x (function (d) { return d.x})
      .y (function (d) { return d.y})
      .curve(fun);
    return gen(input);
  }
}

module.exports.PathUtils = PathUtils
module.exports.PathUtils.UP = -1;
module.exports.PathUtils.RIGHT = -2;
module.exports.PathUtils.DOWN = -3;
module.exports.PathUtils.LEFT = -4;

module.exports.PathUtils.Type = {}
module.exports.PathUtils.Type.BASIS = D3.curveBasis
module.exports.PathUtils.Type.BASIS_OPEN = D3.curveBasisOpen
module.exports.PathUtils.Type.BASIS_CLOSED = D3.curveBasisClosed
module.exports.PathUtils.Type.BUNDLE= D3.curveBundle
module.exports.PathUtils.Type.CARDINAL_CLOSED = D3.curveCardinalClosed
module.exports.PathUtils.Type.CARDINAL_OPEN = D3.curveCardinalOpen
module.exports.PathUtils.Type.CARDINAL = D3.curveCardinal
module.exports.PathUtils.Type.CATMUL_CLOSED = D3.curveCatmullRomClosed
module.exports.PathUtils.Type.CATMUL_OPEN = D3.curveCatmullRomOpen
module.exports.PathUtils.Type.CATMUL = D3.curveCatmullRom
module.exports.PathUtils.Type.LINEAR_CLOSED = D3.curveLinearClosed
module.exports.PathUtils.Type.LINEAR = D3.curveLinear
module.exports.PathUtils.Type.LINEAR_OPEN = D3.curveLinearOpen
module.exports.PathUtils.Type.NATURAL = D3.curveNatural
