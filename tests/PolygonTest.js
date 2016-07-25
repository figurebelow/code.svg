/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Polygon = require ("../src/Polygon.js").Polygon;

describe ("Polygon", function () {

  it ("initializes smoothly", function ()
  {
    var polygon = new Polygon ({points:"0,0 40,0 40,40 0,40"}, {});
  });

  it ("calculates the center", function ()
  {
    var polygon = new Polygon ({points:"0,0 40,0 40,40 0,40"}, {});
    var center = polygon.getCenter();
    assert.deepEqual ({x:20, y:20}, center);
  });

  it ("sets the position", function ()
  {
    var polygon = new Polygon ({points:"0,0 40,0 40,40 0,40"}, {});
    polygon.moveTo ({x:60, y:60});
    var center = polygon.getCenter();
    assert.deepEqual ({x:60, y:60}, center);
  });

  it ("clones", function () {
    var polygon = new Polygon ({points:"0,0 40,0 40,40 0,40"}, {});
    var pol2 = polygon.clone();
    assert.deepEqual (polygon, pol2);
  });

  it ("clones to coords", function () {
    var polygon = new Polygon ({points:"50,50 70,50 70,70 50,70"}, {stroke: "red"});
    var coords = [{x:20, y:30}, {x:0, y:0}, {x:10, y:10}];
    var polys = polygon.cloneToCoords (coords);
    assert.equal (3, polys.length);
    polys.forEach (function (elem, i) {
      assert.deepEqual (elem.getCenter(), coords[i]);
    });
  });

  it ("subdivides", function () {
    var polygon = new Polygon ({points:"0,0 40,0 40,40 0,40"}, {});
    polygon.subdivide(1);
    assert.equal (polygon.parsedPoints.length, 9);
  });
});
