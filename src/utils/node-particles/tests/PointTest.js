/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
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

  it ("adds a constant value", function () {
    var point = new Point (10, 10);
    assert.deepEqual (point.add(10), {x:20,y:20});
  });

  it ("substracts a constant value", function () {
    var point = new Point (10, 10);
    assert.deepEqual (point.dec(3), {x:7,y:7});
  });

  it ("substracts a Point", function () {
    var point1 = new Point (10, 30);
    var point2 = new Point (8, 10);
    assert.deepEqual (point1.dec(point2), {x:2,y:20});
  });

  it ("multiplies by a constant value", function () {
    var point = new Point (10, 30);
    assert.deepEqual (point.multiply(3), {x:30,y:90});
  });

  it ("multiplies by a Point", function () {
    var point1 = new Point (10, 30);
    var point2 = new Point (20, 9);
    assert.deepEqual (point1.multiply(point2), {x:200,y:270});
  });

  it ("returns the power of the Point", function () {
    var point = new Point (10, 20);
    assert.deepEqual (point.pow(point), 500);
  });
});
