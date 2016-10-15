/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var Rnd = require ("./Rnd.js").Rnd;
var Masonry = require ("./Masonry.js").Masonry;

/**
 * @classdesc This module contains functions to generate layout points
 * @class
 */
class Layout {
/**
 * Returns the points from an attractor
 * http://struct.cc/blog/2011/08/15/strange-attractors/
 * @param {number} numPoints number of points to generate
 * @param {string} entryString initial configuration string
 * @param {number} width maximum width
 * @param {number} height maximum height
 * @return a list of xy points
 */
static Attractor (numPoints, entryString, width, height)
{
  // Fractal pattern and coefficients.
  var a = [];
  var res = [];

  // Parameters.
  var x = 0.1, y = 0.1;
  var r = 360 % entryString.length;

  // Initialize coefficients.
  for (i = 0; i < entryString.length; i++)
  {
    a[i] = (entryString.charCodeAt(i) - 65 - 12) / 10;
  }
  res.push ({x:(width/2) + 50 * Math.cos(r),y:(height/2) + 58 * Math.sin(r), r:0});
  for (i = 0; i < numPoints; i++)
  {
    var nx = a[0] + a[1]  * x + a[2]  * x * x
            + a[3] * x * y + a[4]  * y + a[5]  * y * y;
    var ny = a[6] + a[7]  * x + a[8]  * x * x
            + a[9] * x * y + a[10] * y + a[11] * y * y;
    x = nx; y = ny;
    var xvalue = (width/2)*x;
    xvalue += width/2;
    var yvalue = (height/2)*y;
    yvalue += height/2;
    var previousPoint = res[res.length-1];
    res.push ({x:xvalue, y:yvalue,
               r: Functions.calculateAngle (previousPoint, {x:xvalue, y:yvalue})});
  }
  return res;
}


/**
 * Returns the points from the Rossler attractor
 * @param {number} numPoints number of points to generate
 * @param {string} a a value
 * @param {number} b b value
 * @param {number} c c value
 * @param {number} h h value
 * @param {number} x0 initial point x
 * @param {number} y0 initial point y
 * @param {number} scale scale value
 * @param {number} width maximum width
 * @param {number} height maximum height
 * @return a list of xy points
 *
 *  Rossler Attractor code.
 *  http://paulbourke.net/fractals/rossler/
 */
//function Rossler (numPoints, a, b, c, h, x0, y0, scale, width, height)
static Rossler (params)
{
  function rosslerPoint (x, y, z, a, b, c) {
    var dx = -(y + z);
    var dy = x + a * y;
    var dz = b + z * (x - c);
    return {x:dx, y:dy, z:dz};
  };

  var x0 = params.x0 || params.width/2;
  var y0 = params.y0 || params.height/2;
  var center = {x: x0, y: y0};   // center in the screen
  var x = 0.1;
  var y = 0.1;
  var z = 0.1;
  var tmpx = 0, tmpy = 0, tmpz =0;
  var res = [];
  for (var i = 0; i < params.points; i++)
  {
    var dt = rosslerPoint (x, y, z, params.a, params.b, params.c);
    tmpx = x + params.h * dt.x;
    tmpy = y + params.h * dt.y;
    tmpz = z + params.h * dt.z;
    //if (Math.abs(tmpx*20 - x*20) > 5 || Math.abs(tmpy*20 - y*20) > 5)
    res.push ({x: tmpx * params.scale + center.x, y: tmpy * params.scale + center.y, z:tmpz});
    x = tmpx;
    y = tmpy;
    z = tmpz;
  }
  return res;
}

/**
 * Returns the Lorent attractor points
 * @param {number} x numerical value
 * @param {number} y numerical value
 * @param {number} z numerical value
 * @param {number} a numerical value
 * @param {number} b numerical value
 * @param {number} c numerical value
 * @param {number} width maximum width
 * @param {number} height maximum height
 * @return a list of xypoints
  Lorentz Attractor code.
  http://www.algosome.com/articles/lorenz-attractor-programming-code.html
*/
static Lorentz (params)
{
  function rosslerPoint (x, y, z, a, b, c) {
    var dx = a * (y - x);
    var dy = x * (b - z) - y;
    var dz = x * y - c * z;
    return {x:dx, y:dy, z:dz};
  };

  var center = {x: params.width/2, y: params.height/2};   // center in the screen
  var x = params.x0 || 0.1;
  var y = params.y0 || 0.1;
  var z = 0.1;
  var tmpx = 0, tmpy = 0, tmpz =0;
  var res = [];
  for (var i = 0; i < params.points; i++)
  {
    var dt = rosslerPoint (x, y, z, params.a, params.b, params.c);
    tmpx = x + params.h * dt.x;
    tmpy = y + params.h * dt.y;
    tmpz = z + params.h * dt.z;
    res.push ({x: tmpx * params.scale + center.x, y: tmpy * params.scale + center.y, z:tmpz});
    x = tmpx;
    y = tmpy;
    z = tmpz;
  }
  return res;
}

/**
 * Returns a grid of x,y values
 * @param {number} xrows - number of points in x
 * @param {number} yrows - number of points in y
 * @param {number} width - total width
 * @param {number} height - total height
 * @return {array} list of xy values {x:val, y:val}
 */
static Grid (xrows, yrows, width, height)
{
  var points = [];
  var xrows = xrows || 10;
  var yrows = yrows || 10;
  var xspan = width / xrows;
  var yspan = height / yrows;
  for (var ypoints = 1; ypoints < yrows ; ypoints++)
    for (var xpoints = 1;  xpoints < xrows; xpoints++)
    {
      points.push ({x: xpoints * xspan, y: ypoints * yspan});
    }
  return points;
}

/**
*  Returns a Spiral of points centered at x,y
* @param {number} points - number of points
* @param {number} x - initial x coord
* @param {number} y - initial y
* @param {number} radius - radio
* @param {number} coils - number of coils
* @param {number} chord - chord value
* @return {array} list of xy values {x:val, y:val}
*/
static Spiral (params)
{
  var points = [];
  var centerX = params.x,
      centerY = params.y,
      radius = params.radius,
      coils = params.coils,
      chord = params.chord;

  var rotation = 2 * Math.PI;
  var thetaMax = coils * 2 * Math.PI;
  var awayStep = radius / thetaMax;

  for (var theta = chord / awayStep, i = 0; theta <= thetaMax && i < params.points; i++) {
    var away = awayStep * theta;
    var around = theta + rotation;
    var x = centerX + Math.cos ( around ) * away;
    var y = centerY + Math.sin ( around ) * away;
    theta += chord / away;
    points.push({x: x, y: y, r: theta});
  }
  return points;
}

/**
 * Returns the intersecting points after dividing the input area in three sections,
 * following the principles of the Rule Of Thirds.
 * @param {number} x0 - top leftmost x coord
 * @param {number} y0 - top leftmost y coord
 * @param {number} width - width of the area
 * @param {number} length - length of the area
 * @return {array} list containg the four {x,y} points of the intersections
 */
static RuleOfThirds (x0, y0, width, height) {
  var rulePoints = [];
  var thirdWidth = width / 3;
  var thirdHeight = height / 3;
  rulePoints.push ({x: thirdWidth + x0, y: thirdHeight + y0});
  rulePoints.push ({x: thirdWidth * 2 + x0, y: thirdHeight + y0});
  rulePoints.push ({x: thirdWidth * 2 + x0, y: thirdHeight * 2 + y0});
  rulePoints.push ({x: thirdWidth + x0, y: thirdHeight * 2 + y0});
  return rulePoints;
}

/**
 * Returns a list of points along x-axis
 * @param {number} x0 initial x0 coord
 * @param {number} y0 initial y0 coord
 */
static Cols (x0, y0, distance, width) {
  var points = [];
  for (var i = x0; i < width; i += distance) {
    points.push({x:i, y:y0});
  }
  return points;
}

static Rows (x0, y0, distance, height) {
  var points = [];
  for (var i = y0; i < height; i += distance) {
    points.push({x: x0, y: i});
  }
  return points;
}

static Masonry (x, y, configStr) {
  return new Masonry (x, y, configStr);
}

}; // end Layout

module.exports.Layout = Layout;
