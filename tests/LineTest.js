/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Line = require ("../src/Line.js").Line;

describe ("Line", function ()
{

  var line;
  beforeEach(function() {
    line = new Line (10, 10, 50, 50, {fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal ("red", line.style["fill"]);
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:30,y:30}, line.getCenter());
  });

 it ("sets its position given the center", function ()
  {
    line.moveTo({x:30,y:45});
    assert.deepEqual ({x:30,y:45}, line.getCenter());
  });

  it ("sets its position given two points", function ()
   {
     line.moveTo({x:60, y:90}, {x:0, y:0});
     assert.deepEqual ({x:30,y:45}, line.getCenter());
   });

  it ("clones", function () {
    line = new Line (10, 10, 50, 50, {fill:"red"});
    var newLine = line.clone();
    assert (line.equals(newLine));
  });

  it ("subdivides", function () {
    line.subdivide(1);
    assert.equal (line.parsedPoints.length, 3);
    line.subdivide(1);
    assert.equal (line.parsedPoints.length, 5);
  });
});
