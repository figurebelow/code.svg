/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict";

var assert = require ("assert");
var Layout = require ("../src/utils/Layout.js").Layout;

describe ("Layout tests", function () {

  it ("Calculates the Rule of Third points from 0,0", function () {
    let points = Layout.RuleOfThirds (0,0, 90, 150);
    assert.deepEqual ({x: 30, y:50}, points[0]);
    assert.deepEqual ({x: 60, y:50}, points[1]);
    assert.deepEqual ({x: 60, y:100}, points[2]);
    assert.deepEqual ({x: 30, y:100}, points[3]);
  });

  it ("Calculates the Rule of Third points from 40,50", function () {
    let points = Layout.RuleOfThirds (40,50, 90, 150);
    assert.deepEqual ({x: 70, y:100}, points[0]);
    assert.deepEqual ({x: 100, y:100}, points[1]);
    assert.deepEqual ({x: 100, y:150}, points[2]);
    assert.deepEqual ({x: 70, y:150}, points[3]);
  });

  it ("Grid returns 16 values for a 4x4 grid on 800x600", function () {
    let points = Layout.Grid (4, 4, 800, 600);
    assert.equal(9, points.length);
    assert.deepEqual ({x: 200, y:150 }, points[0]);
    assert.deepEqual ({x: 400, y:300 }, points[4]);
    assert.deepEqual ({x: 600, y:450 }, points[8]);
  });

  it ("returns 2 columns", function () {
    let points = Layout.Cols({x:100, y:100}, 400, 900);
    assert.equal (2, points.length);
    assert.deepEqual ({x:100, y:100}, points[0]);
    assert.deepEqual ({x:500, y:100}, points[1]);
  });

  it ("returns 2 rows", function () {
    let points = Layout.Rows({x:100, y:100}, 400, 900);
    assert.equal (2, points.length);
    assert.deepEqual ({x:100, y:100}, points[0]);
    assert.deepEqual ({x:100, y:500}, points[1]);
  });

  it ("generates Butterfly points", function () {
    let points = Layout.ButterflyCurve({x:200, y:200}, 200, 1, 0.4);
    assert (points.length > 0);
  });

  it ("generates Hypocycloid points", function () {
    let points = Layout.Hypocycloid ({x:200, y:200}, 200, 2, 3, 4);
    assert (points.length > 0);
  });

  it ("generates Rose points", function () {
    let points = Layout.Rose({x:200, y:200}, 200, (6/2));
    assert (points.length > 0);
  });

  it ("generates Rossler points", function () {
    let points = Layout.Rossler({x:200, y:200}, 200, 1000, 0.2, 0.2, 0.4, 3);
    assert.equal(points.length, 1000);
  });

  it ("generates Lorentz points", function () {
    let points = Layout.Lorentz({x:200, y:200}, 200, 1000, 0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 3);
    assert.equal(points.length, 1000);
  });
});
