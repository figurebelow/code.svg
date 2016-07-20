/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Ellipse = require ("../src/Ellipse.js").Ellipse;

describe ("Ellipse", function ()
{
  var ellipse;
  beforeEach(function() {
    ellipse = new Ellipse ({cx:50, cy:60, rx:10, ry:15}, {fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal ("red", ellipse.style["fill"]);
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:50,y:60}, ellipse.getCenter());
  });

  it ("sets its position", function ()
  {
    ellipse.moveTo({x:80, y:90});
    assert.deepEqual ({x:80,y:90}, ellipse.getCenter());
  });

  it ("clones", function () {
    var newEllipse = ellipse.clone();
    assert.deepEqual (ellipse, newEllipse);
  });
});
