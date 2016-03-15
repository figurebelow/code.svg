/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Circle = require ("../Circle.js").Circle;

describe ("Circle", function ()
{
  var circle;
  beforeEach(function() {
    circle = new Circle (5, 6, 10, "fill:red", 3);
  });

  it ("should initialize smoothly", function ()
  {
    (function () {
      assert.equal (3, circle.getZIndex());
    }).should.not.throw();
  })

  it ("initializes with parameter", function ()
  {
    assert.equal (10, circle.getAttribute("r"));
    assert.equal (5, circle.getAttribute("cx"));
    assert.equal (6, circle.getAttribute("cy"));
    assert.equal ("fill:red", circle.getAttribute("style"));
    assert.equal (3, circle.getZIndex());
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:5,y:6}, circle.getCenter());
  });

  it ("sets its position", function ()
  {
    circle.setPos(80, 90)
    assert.deepEqual ({x:80,y:90}, circle.getCenter());
  });

  it ("clones", function () {
    var newCircle = circle.clone();
    assert.deepEqual (circle, newCircle);
  });

  it ("clones to coords", function () {
    var coords = [{x:100, y:100}, {x:200, y:200}];
    var circles = circle.cloneToCoords(coords);
    assert.equal (circles.length, 2);
    circle.setPos (100, 100);
    assert.deepEqual (circles[0], circle);
    circle.setPos (200, 200);
    assert.deepEqual (circles[1], circle);
  });
})
