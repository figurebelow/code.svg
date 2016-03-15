/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Rect = require ("../Rect.js").Rect;

describe ("Rect", function ()
{
  var rect;
  beforeEach(function() {
    rect = new Rect (5, 5, 10, 10, "fill:red", 3);
  });

  it ("initializes with parameter", function ()
  {
    assert.equal (10, rect.getAttribute("width"));
    assert.equal (10, rect.getAttribute("height"));
    assert.equal ("fill:red", rect.getAttribute("style"));
    assert.equal (3, rect.getZIndex());
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:5,y:5}, rect.getCenter());
  });

  it ("sets its position", function ()
  {
    rect.setPos(80, 90)
    assert.deepEqual ({x:80,y:90}, rect.getCenter());
  });

  it ("clones", function () {
    var newRect = rect.clone();
    assert.deepEqual (newRect, rect);
  });

  it ("clones to coords", function () {
    var coords = [{x:0, y:100}, {x:200, y:100}];
    var rects = rect.cloneToCoords(coords);
    assert.equal (rects.length, 1);
    assert.deepEqual ({x:95, y:90},rects[0].getCenter());
  });

  it ("updates the coords", function () {
    var coords = [{x:100, y:100}, {x:200, y:200}];
    var rects = rect.updateCoords(coords);
    assert.equal (rects.length, 2);
    rect.setPos (100, 100);
    assert.deepEqual (rects[0], rect);
    rect.setPos (200, 200);
    assert.deepEqual (rects[1], rect);
  });
});
