/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

/*
 * Center of a non-intersecting polygon,
 * as described in http://en.wikipedia.org/wiki/Centroid#Centroid_of_polygon
 * - parameters: vertices: {x,y} vertices list
 */
function NonIntersecPolCenter (points) {
  let pts = [];
  if (points != undefined)
    pts = points.slice(0);
  if (pts.length)
  {
    if (pts.length == 2)
    {
      // Having two points we need the center
      return ({x: (pts[0].x + pts[1].x)/2, y: (pts[0].y + pts[1].y)/2});
    }
    else
    {
      let first = pts[0], last = pts[pts.length-1];
      if (first.x != last.x || first.y != last.y)
        pts.push(first);
      let twicearea = 0, x = 0, y = 0, nPts = pts.length, p1, p2, f;
      for (let i = 0, j = nPts-1 ; i < nPts ; j = i++ ) {
        p1 = pts[i];
        p2 = pts[j];
        f = p1.x*p2.y - p2.x*p1.y;
        twicearea += f;
        x += ( p1.x + p2.x ) * f;
        y += ( p1.y + p2.y ) * f;
      }
      f = twicearea * 3;
      return { x:x/f, y:y/f };
    }
  }
  throw ("Warning: return empty NonIntersecPolCenter");
};
module.exports.NonIntersecPolCenter = NonIntersecPolCenter;

/*
 * Determines the angle of a straight line drawn between point one and two.
 * The number returned, which is a float in degrees, tells us how much we have
 * to rotate a horizontal line clockwise for it to match the line between the
 * two points.
 */
function calculateAngle (point1, point2)
{
  let xDiff = point2.x - point1.x;
  let yDiff = point2.y - point1.y;
  return Math.atan2 (yDiff, xDiff) * (180 / Math.PI);
}
module.exports.calculateAngle = calculateAngle;
