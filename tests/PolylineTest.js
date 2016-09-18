/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Polyline = require ("../src/Polyline.js").Polyline;

describe ("Polyline", function () {

  it ("initializes correctly", function () {
    var polyline = new Polyline ({points:"0,0 10,10 20,40"}, {stroke: "red"});
    assert.equal ("red", polyline.style["stroke"]);
  });

  it ("stores the points correctly", function () {
    var polyline = new Polyline ({points:"0,0 10,10 20,40"}, {stroke: "red"});
    assert.equal (3, polyline.parsedPoints.length);
  });

  it ("gets the center correctly", function () {
    var polyline = new Polyline ({points:"0,0 10,0 10,10 0,10"}, {stroke: "red"});
    var center = polyline.getCenter();
    assert.deepEqual ({x:5, y: 5}, center);
  });

  it ("clones itself", function () {
    var polyline = new Polyline ({points:"0,0 10,0 10,10 0,10"}, {stroke: "red"});
    var poly2 = polyline.clone();
    assert (polyline.equals(poly2));
  });

  it ("translates to a new position up in the coords (x2 > x1, y2 > y1)", function () {
    var polyline = new Polyline ({points:"0,0 10,0 10,10 0,10"}, {stroke: "red"}, 1);
    polyline.moveTo ({x:50, y:50});
    assert.deepEqual ({x:50, y:50}, polyline.getCenter());
  });

  it ("translates to a new position down in the coords (x2 < x1, y2 < y1)", function () {
    var polyline = new Polyline ({points:"50,50 70,50 70,70 50,70"}, {stroke: "red"});
    polyline.moveTo ({x:20, y:20});
    assert.deepEqual ({x:20, y:20}, polyline.getCenter());
  });

  it ("subdivides", function () {
    var polyline = new Polyline ({points:"50,50 70,50 70,70 50,70"}, {stroke: "red"});
    polyline.subdivide(1);
    assert.equal (polyline.parsedPoints.length, 7);
  });
});
