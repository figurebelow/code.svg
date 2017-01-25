/**
* @license
* Copyright 2017 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

class Functions {

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
          centerList.push({x:inst.values[0].x,y:inst.values[0].y});
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
  static moveInst (instList, distance) {
    instList.forEach (function (inst) {
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
        default:
      }
    });
  };
};

module.exports.Functions = Functions;
