/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Rect = require ("../src/Rect.js").Rect;

describe ("Rect", function ()
{
  var rect;

  beforeEach(function() {
    rect = new Rect ({width:50, height:20, x:10, y:10, fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal ("red", rect.attributes["fill"]);
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:35,y:20}, rect.getCenter());
  });

  it ("sets its position", function ()
  {
    rect.moveTo({x:80, y:90});
    assert.deepEqual ({x:80,y:90}, rect.getCenter());
  });

  it ("clones", function () {
    var newRect = rect.clone();
    assert.deepEqual (newRect, rect);
  });

  it ("subdivides", function () {
    rect.subdivide(1);
    assert.equal (rect.parsedPoints.length, 9);
    assert.equal(rect.parsedPoints[0].values[0].x, 10);
    assert.equal(rect.parsedPoints[0].values[0].y, 10);
    assert.equal(rect.parsedPoints[1].values[0].x, 35);
    assert.equal(rect.parsedPoints[1].values[0].y, 10);
    assert.equal(rect.parsedPoints[2].values[0].x, 60);
    assert.equal(rect.parsedPoints[2].values[0].y, 10);
  });

  it ("creates a new Rectangle between two points", function () {
    var p1 = {x:20, y:20};
    var p2 = {x:100, y:60};
    var rect = Rect.RectFromTwoPoints (p1, p2, {});
    assert.equal (rect.parsedPoints.length, 5);
  });

  it ("shrink of zero has no effect", function () {
    var rect2 = rect.clone();
    assert.deepEqual (rect, rect2.shrink(0));
  });

  it ("shrinks", function () {
    rect.shrink (5);
    assert.equal(rect.parsedPoints[0].values[0].x, 15);
    assert.equal(rect.parsedPoints[0].values[0].y, 15);
    assert.equal(rect.parsedPoints[1].values[0].x, 55);
    assert.equal(rect.parsedPoints[1].values[0].y, 15);
    assert.equal(rect.parsedPoints[2].values[0].x, 55);
    assert.equal(rect.parsedPoints[2].values[0].y, 25);
    assert.equal(rect.parsedPoints[3].values[0].x, 15);
    assert.equal(rect.parsedPoints[3].values[0].y, 25);
  });

  it ("moves, clones", function() {
	var rect2 = new Rect ({x:0, y:0, width:40, height:40});
	rect2.moveTo({x:100, y:100});
	var rect3 = rect2.clone();
	assert.deepEqual (rect3, rect2);
	assert.deepEqual({x:100, y:100}, rect3.getCenter());
  });
});
