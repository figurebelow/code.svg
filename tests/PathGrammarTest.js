/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var PathGrammar = require ("../src/grammars/PathGrammar.js");

describe ("PathGrammar", function () {

  it ("parses a point", function () {
    assert.deepEqual ([{type:'M', values:[{x:0, y:0}]}], PathGrammar.parse("M0,0"));
  });

  it ("parses a list of points", function () {
    var points = PathGrammar.parse("M0,0 5,10 20,20Z");
    assert.equal (3, points[0].values.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x:5, y:10}, points[0].values[1]);
    assert.deepEqual ({x:20, y:20}, points[0].values[2]);
    assert.equal ("Z", points[1].type);
  });

  it ("parses a list of negative points", function () {
    var points = PathGrammar.parse("M-0,0 -5,-10 20,-20Z");
    assert.equal (3, points[0].values.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x:-5, y:-10}, points[0].values[1]);
    assert.deepEqual ({x:20, y:-20}, points[0].values[2]);
    assert.equal ("Z", points[1].type);
  });

  it ("parses a list of line points", function () {
    var points = PathGrammar.parse("M0,0 L5,10 L20,20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x:5, y:10}, points[1].values[0]);
    assert.deepEqual ({x:20, y:20}, points[2].values[0]);
    assert.equal ("M", points[0].type);
    assert.equal ("L", points[1].type);
    assert.equal ("L", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("parses a list of horizontal points", function () {
    var points = PathGrammar.parse("M0,0 H10 H20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.equal (10, points[1].values);
    assert.equal (20, points[2].values);
    assert.equal ("M", points[0].type);
    assert.equal ("H", points[1].type);
    assert.equal ("H", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("parses a list of vertical points", function () {
    var points = PathGrammar.parse("M0,0 V10 V20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.equal (10, points[1].values);
    assert.equal (20, points[2].values);
    assert.equal ("M", points[0].type);
    assert.equal ("V", points[1].type);
    assert.equal ("V", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("parses a list of smooth points", function () {
    var points = PathGrammar.parse("M0,0 S1,2,3,4  s5,6,7,8 L0,20Z");
    assert.equal (5, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x2:1,y2:2,x:3,y:4}, points[1].values[0]);
    assert.deepEqual ({x2:5,y2:6,x:7,y:8}, points[2].values[0]);
    assert.equal ("M", points[0].type);
    assert.equal ("S", points[1].type);
    assert.equal ("s", points[2].type);
    assert.equal ("L", points[3].type);
    assert.equal ("Z", points[4].type);
  });

  it ("parses a list of bezier points", function () {
    var points = PathGrammar.parse("M10,10 T10,20 T30,40 Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:10, y:10}, points[0].values[0]);
    assert.deepEqual ({x:10,y:20}, points[1].values[0]);
    assert.deepEqual ({x:30,y:40}, points[2].values[0]);
    assert.equal ("M", points[0].type);
    assert.equal ("T", points[1].type);
    assert.equal ("T", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("parses a list of arcs", function () {
    var points = PathGrammar.parse("M10,10 A5,5,90,2,2,0,0 A10,10,90,3,3,0,0 Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:10, y:10}, points[0].values[0]);
    assert.deepEqual ({ "rx":5, "ry":5, "xrot":90, "arcflag":2, "sweep":2, "x":0, "y":0 }, points[1].values[0]);
    assert.deepEqual ({ "rx":10, "ry":10, "xrot":90, "arcflag":3, "sweep":3, "x":0, "y":0 }, points[2].values[0]);
    assert.equal ("M", points[0].type);
    assert.equal ("A", points[1].type);
    assert.equal ("A", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("parses a list of curves", function () {
    var points = PathGrammar.parse("M10,10 C5,5,10,10,1,1 C10,10,20,20,5,5 Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:10, y:10}, points[0].values[0]);
    assert.deepEqual ({"x1": 5, "y1":5, "x2":10, "y2":10, "x":1, "y":1 }, points[1].values[0]);
    assert.deepEqual ({"x1": 10, "y1":10, "x2":20, "y2":20, "x":5, "y":5 }, points[2].values[0]);
    assert.equal ("M", points[0].type);
    assert.equal ("C", points[1].type);
    assert.equal ("C", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("parses a list of quadratic curves", function () {
    var points = PathGrammar.parse("M10,10 Q5,5,10,10 Q10,10,20,20 Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:10, y:10}, points[0].values[0]);
    assert.deepEqual ({"x1":5, "y1": 5, "x":10, "y":10 }, points[1].values[0]);
    assert.deepEqual ({"x1": 10, "y1":10,  "x":20, "y":20 }, points[2].values[0]);
    assert.equal ("M", points[0].type);
    assert.equal ("Q", points[1].type);
    assert.equal ("Q", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("Upper and lower are valid point definitions", function () {
    assert.notDeepEqual (PathGrammar.parse("M0,0 V10 V20Z"), PathGrammar.parse("m0,0 v10 v20z"));
    assert.notDeepEqual (PathGrammar.parse("M0,0 V10 V20Z"), PathGrammar.parse("M0 0 V10 V20 z"));

    assert.notDeepEqual (PathGrammar.parse("M0,0 L5,10 L20,20Z"), PathGrammar.parse("m0,0 l5,10 l20,20z"));
    assert.notDeepEqual (PathGrammar.parse("M0,0 L5,10 L20,20Z"), PathGrammar.parse("m0 0 l5 10 l20 20z"));

    assert.notDeepEqual (PathGrammar.parse("M0,0 H10 H20Z"), PathGrammar.parse("m0,0 h10 h20z"));
    assert.notDeepEqual (PathGrammar.parse("M0,0 H10 H20Z"), PathGrammar.parse("m0 0 h10 h20z"));

    assert.notDeepEqual (PathGrammar.parse("M0,0 V10 V20Z"), PathGrammar.parse("m0,0 v10 v20z"));
    assert.notDeepEqual (PathGrammar.parse("M0,0 V10 V20Z"), PathGrammar.parse("m0 0 v10 v20z"));

    assert.notDeepEqual (PathGrammar.parse("M0,0 S1,2,3,4 S5,6,7,8 L0,20Z"),
                      PathGrammar.parse("m0,0 s1,2,3,4 s5,6,7,8 l0,20z"));
    assert.notDeepEqual (PathGrammar.parse("M0,0 S1,2,3,4 S5,6,7,8 L0,20Z"),
                      PathGrammar.parse("m0 0 s1 2 3 4 s5 6 7 8 l0 20z"));

    assert.notDeepEqual (PathGrammar.parse("M10,10 T10,20 T30,40 Z"),
                      PathGrammar.parse("m10,10 t10,20 t30,40 z"));
    assert.notDeepEqual (PathGrammar.parse("M10,10 T10,20 T30,40 Z"),
                      PathGrammar.parse("m10 10 t10 20 t30 40 z"));

    assert.notDeepEqual (PathGrammar.parse("M10,10 A5,5,90,2,2,0,0 A10,10,90,3,3,0,0 Z"),
                      PathGrammar.parse("m10,10 a5,5,90,2,2,0,0 a10,10,90,3,3,0,0 z"));
    assert.notDeepEqual (PathGrammar.parse("M10,10 A5,5,90,2,2,0,0 A10,10,90,3,3,0,0 Z"),
                      PathGrammar.parse("m10 10 a5 5 90 2 2 0 0 a10 10 90 3 3 0 0 z"));

    assert.notDeepEqual (PathGrammar.parse("M10,10 C5,5,10,10,1,1 C10,10,20,20,5,5 Z"),
                      PathGrammar.parse("m10,10 c5,5,10,10,1,1 c10,10,20,20,5,5 z"));
    assert.notDeepEqual (PathGrammar.parse("M10,10 C5,5,10,10,1,1 C10,10,20,20,5,5 Z"),
                      PathGrammar.parse("m10 10 c5 5 10 10 1 1 c10 10 20 20 5 5 z"));

    assert.notDeepEqual (PathGrammar.parse("M10,10 Q5,5,10,10 Q10,10,20,20 Z"),
                      PathGrammar.parse("m10,10 q5,5,10,10 q10,10,20,20 z"));
    assert.notDeepEqual (PathGrammar.parse("M10,10 Q5,5,10,10 Q10,10,20,20 Z"),
                      PathGrammar.parse("m10 10 q5 5 10 10 q10 10 20 20 z"));
  });

});
