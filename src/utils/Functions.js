/**
* @license
* Copyright 2017 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

class Functions {

  /**
   * Checks the set of values for the attribute.
   * If values is a map, it returns the attr field, values itself it its a
   * primitive object, and defValue if values is undefined.
   * @param {object} values - set of objects
   * @param {string} attr - attr to look for in the values
   * @param {number} defValue - default value
   * @ignore
   */
  static resolve (values, at, defValue) {
    var retValue = defValue;
    if (values && values[at] != undefined) {
      if (typeof(values[at]) === "function")
        retValue = values[at];
      else if (typeof(values[at]) === 'object')
        retValue = values[at][at];
      else
        retValue = values[at];
    }
    return retValue;
  }

  static funct (p) {
    if (typeof(p) === "function")
      return p();
    return p;
  }

  /*
  * Center of a non-intersecting polygon,
  * as described in http://en.wikipedia.org/wiki/Centroid#Centroid_of_polygon
  * - parameters: vertices: {x,y} vertices list
  */
  static NonIntersecPolCenter (points) {
    let pts = [];
    if (points != undefined)
    pts = points.slice(0);
    if (pts.length)
    {
      if (pts.length == 1)
      return points;
      if (pts.length == 2)
      {
        // Having two points we need the center
        return ({x: (pts[0].x + pts[1].x)/2, y: (pts[0].y + pts[1].y)/2});
      }
      else // more than two points
      {
        let x = 0, y = 0;
        pts.forEach(function (p) {
          x += p.x;
          y += p.y;
        });
        return { x:x/pts.length, y:y/pts.length };
      }
    }
    throw ("Warning: return empty NonIntersecPolCenter");
  };

  /*
  * Determines the angle of a straight line drawn between point one and two.
  * The number returned, which is a float in degrees, tells us how much we have
  * to rotate a horizontal line clockwise for it to match the line between the
  * two points.
  */
  static calculateAngle (point1, point2)
  {
    let xDiff = point2.x - point1.x;
    let yDiff = point2.y - point1.y;
    return Math.atan2 (yDiff, xDiff) * (180 / Math.PI);
  }

  static group (arr, groupSize, f) {
    let returnVals = [];
    arr.forEach (function (point, i) {
      if (i >= (groupSize-1)) {
        returnVals.push(f([arr[i-(groupSize-1)],arr[i]], i));
      }
    });
    return returnVals;
  }

  /*
  * Calculates the center of a list of Path instructions
  */
  static getPathCenter (instList) {
    let centerList = [];
    instList.forEach (function (inst) {
      let type = inst.type;
      switch (type) {
        case 'L': case 'l':
          inst.values.forEach (v => centerList.push(v));
          break;
        case 'M': case 'm':
        case 'T': case 't':
          centerList.push({x:inst.values[0].x, y:inst.values[0].y});
          break;
        case 'C': case 'c':
          centerList.push(Functions.NonIntersecPolCenter([
            {x:inst.values[0].x1, y:inst.values[0].y1},
            {x:inst.values[0].x2, y:inst.values[0].y2},
            {x:inst.values[0].x, y:inst.values[0].y}
          ]));
          break;
        case 'S': case 's':
          centerList.push(Functions.NonIntersecPolCenter([
            {x:inst.values[0].x2, y:inst.values[0].y2},
            {x:inst.values[0].x, y:inst.values[0].y},
          ]));
          break;
        case 'Q': case 'q':
          centerList.push(Functions.NonIntersecPolCenter([
            {x:inst.values[0].x1, y:inst.values[0].y1},
            {x:inst.values[0].x, y:inst.values[0].y},
          ]));
          break;
        default:
        // none, this applies to Z,z
      };
    });
    return centerList;
  }

  /*
  * Applies a function to each instruction of a Path
  */
  static moveInsts (instList, distance) {
    instList.forEach (function (inst) {
      Functions.moveInst(inst, distance);
    });
  };

  static moveInst (inst, distance) {
    let type = inst.type;
    switch (type) {
      case 'L': case 'l':
      case 'T': case 'l':
        inst.values[0].x += distance.x;
        inst.values[0].y += distance.y;
        break;
      case 'M': case 'm':
        inst.values[0].x += distance.x;
        inst.values[0].y += distance.y;
        break;
      case 'C' : case 'c':
        inst.values[0].x += distance.x;
        inst.values[0].x1 += distance.x;
        inst.values[0].x2 += distance.x;
        inst.values[0].y += distance.y;
        inst.values[0].y1 += distance.y;
        inst.values[0].y2 += distance.y;
        break;
      case 'S': case 's':
        inst.values[0].x2 += distance.x;
        inst.values[0].x += distance.x;
        inst.values[0].y2 += distance.y;
        inst.values[0].y += distance.y;
        break;
      case 'Q': case 'q':
        inst.values[0].x1 += distance.x;
        inst.values[0].x += distance.x;
        inst.values[0].y1 += distance.y;
        inst.values[0].y += distance.y;
        break;
      case 'V' : case 'v':
        inst.values[0].y += distance.y;
        break;
      case 'H' : case 'h':
        inst.values[0].y += distance.y;
        break;
      default:
    }
  };

  static rotateInst (inst, deg, around) {
    if (inst.type != 'z') {
      Functions.rotateAttrs(inst.values[0], "x", "y", deg, around);
      switch (inst.type) {
        case "C" : case "c" :
          Functions.rotateAttrs(inst.values[0], "x1", "y1", deg, around);
          Functions.rotateAttrs(inst.values[0], "x2", "y2", deg, around);
          break;
      }
    }
  }

  static rotateAttrs (inst, at1, at2, deg, around) {
    let radians = deg * Math.PI / 180.0,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    let val1 = inst[at1];
    let val2 = inst[at2];
    let dx = val1 - around.x,
        dy = val2 - around.y;
    let newx = cos * dx - sin * dy + around.x;
    let newy = sin * dx + cos * dy + around.y;
    inst[at1] = newx;
    inst[at2] = newy;
  }

  // S x1,y1 x,y
  static genSmoothBezier (p1, p2, params) {
    let height = Functions.resolve(params, "height",10);
    var vector = {x: p2.x - p1.x, y: p2.y - p1.y};
    var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    var p0 = "M" + p1.x + "," + (p1.y - height/2) + " ";
    var x1 = "S"+(p1.x + 4) + "," + (p1.y + 30) + " ";
    var x2 = p2.x + "," + p2.y + "z";
    var d = p0 + x1 + x2;
    params.d = d;
    return new Path (params);
  }
};

module.exports.Functions = Functions;
