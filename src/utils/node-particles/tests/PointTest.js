/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Point = require ("../js/Point.js").Point;

describe ("Point", function () {

  it ("initializes a new Point", function () {
    var point = new Point(20,20);
  });

  it ("gets the magnitude", function () {
    var point = new Point(4,4);
    assert.equal(Math.sqrt(32), point.getMagnitude());
  });

  it ("multiplies the Point position", function () {
    var point = new Point (100,100);
    point.multiply(0.5);
    assert.deepEqual (point, {x:50, y:50});
  });

  it ("translates the Point", function () {
    var point = new Point (100, 100);
    point.add ({x:20, y:20});
    assert.deepEqual(point, {x:120, y:120});
  });

});
