/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Line = require ("../Line.js").Line;

describe ("Line", function ()
{
  var line;
  beforeEach(function() {
    line = new Line (10, 10, 50, 50, "fill:red", 3);
  });

  it ("should initialize smoothly", function ()
  {
    (function () {
      assert.equal (3, line.getZIndex());
    }).should.not.throw();
  })

  it ("initializes with parameter", function ()
  {
    assert.equal (10, line.getAttribute("x1"));
    assert.equal (10, line.getAttribute("y1"));
    assert.equal (50, line.getAttribute("x2"));
    assert.equal (50, line.getAttribute("y2"));
    assert.equal ("fill:red", line.getAttribute("style"));
    assert.equal (3, line.getZIndex());
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:30,y:30}, line.getCenter());
  });

  it ("sets its position", function ()
  {
    line.setPos({x:60, y:90}, {x:100, y:120})
    assert.deepEqual ({x:80,y:105}, line.getCenter());
  });

  it ("clones", function () {
    var newLine = line.clone();
    assert.deepEqual (line, newLine);
  });

  it ("clones to coords", function () {
    var coords = [{x:100, y:100}, {x:200, y:200}, {x:300, y:300}];
    var lines = line.cloneToCoords(coords);
    assert.equal (lines.length, 2);
    line.setPos ({x:100, y:100}, {x:200, y:200});
    assert.deepEqual (lines[0], line);
    line.setPos ({x:200, y:200}, {x:300, y:300});
    assert.deepEqual (lines[1], line);
  });
});
