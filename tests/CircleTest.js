/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict"

var assert = require ("assert");
var Circle = require ("../src/Circle.js").Circle;

describe ("Circle", function ()
{

  var circle;
  beforeEach(function() {
    circle = new Circle ({r:10, cx:100, cy:200, fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal ("red", circle.attributes["fill"]);
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:100,y:200}, circle.getCenter());
  });

  it ("sets its position", function ()
  {
    circle.moveTo({x:80, y:90});
    assert.deepEqual ({x:80,y:90}, circle.getCenter());
  });

  it ("clones", function () {
    var newCircle = circle.clone();
    assert (circle.equals(newCircle));
  });

})
