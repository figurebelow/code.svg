/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Polyline = require ("../Polyline.js").Polyline;

describe ("Polyline", function () {

  it ("initializes correctly", function () {
    var polyline = new Polyline ("0,0 10,10 20,40", "stroke: red", 1);
    assert.equal (1, polyline.getZIndex());
    assert.equal ("stroke: red", polyline.getAttribute("style"));
    assert.equal ("0,0 10,10 20,40", polyline.getAttribute ("points"));
  });

  it ("stores the points correctly", function () {
    var polyline = new Polyline ("0,0 10,10 20,40", "stroke: red", 1);
    assert.equal (3, polyline.content.polyPoints.length);
  });

  it ("gets the center correctly", function () {
    var polyline = new Polyline ("0,0 10,0 10,10 0,10", "stroke: red", 1);
    var center = polyline.getCenter();
    assert.deepEqual ({x:5, y: 5}, center);
  });

  it ("clones itself", function () {
    var polyline = new Polyline ("0,0 10,0 10,10 0,10", "stroke: red", 1);
    var poly2 = polyline.clone();
    assert.deepEqual (poly2, polyline);
  });

  it ("translates to a new position up in the coords (x2 > x1, y2 > y1)", function () {
    var polyline = new Polyline ("0,0 10,0 10,10 0,10", "stroke: red", 1);
    polyline.setPos (50, 50);
    assert.deepEqual ({x:50, y:50}, polyline.getCenter());
  });

  it ("translates to a new position down in the coords (x2 < x1, y2 < y1)", function () {
    var polyline = new Polyline ("50,50 70,50 70,70 50,70", "stroke: red", 1);
    polyline.setPos (20, 20);
    assert.deepEqual ({x:20, y:20}, polyline.getCenter());
  });

  it ("clones to coords", function () {
    var polyline = new Polyline ("50,50 70,50 70,70 50,70", "stroke: red", 1);
    var coords = [{x:20, y:30}, {x:0, y:0}, {x:10, y:10}];
    var polys = polyline.cloneToCoords (coords);
    assert.equal (3, polys.length);
    polys.forEach (function (elem, i) {
      assert.deepEqual (elem.getCenter(), coords[i]);
    });
  });

  it ("updates its coords given a list of points", function () {
    var polyline = new Polyline ("50,50 70,50 70,70 50,70", "stroke: red", 1);
    var coords = [{x:100, y:100}, {x:150, y:100}, {x:150, y:150}, {x:100, y:150}];
    polyline.updateCoords (coords);
    assert.deepEqual ({x:125, y:125}, polyline.getCenter());
  });
});
