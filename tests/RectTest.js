/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
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
    rect = new Rect ({width:50, height:20, x:10, y:10}, {fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal ("red", rect.style["fill"]);
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
  });
});
