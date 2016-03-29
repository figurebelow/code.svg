/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Circle = require ("../svg/Circle.js").Circle;

describe ("Circle", function ()
{

  var circle;
  beforeEach(function() {
    circle = new Circle ({r:10, cx:100, cy:200}, {fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal (10, circle.getAttr("r"));
    assert.equal (100, circle.getAttr("cx"));
    assert.equal (200, circle.getAttr("cy"));
    assert.equal ("red", circle.style["fill"]);
    //assert.equal (3, circle.getZIndex());
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:100,y:200}, circle.getCenter());
  });

  it ("sets its position", function ()
  {
    circle.moveTo(80, 90);
    assert.deepEqual ({x:80,y:90}, circle.getCenter());
  });

  it ("clones", function () {
    var newCircle = circle.clone();
    assert.deepEqual (circle, newCircle);
  });

})
