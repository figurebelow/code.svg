/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Layout = require ("../src/utils/Layout.js").Layout;

describe ("Layout tests", function () {
  
  it ("Calculates the Rule of Third points from 0,0", function () {
    var points = Layout.RuleOfThirds (0,0, 90, 150);
    assert.deepEqual ({x: 30, y:50}, points[0]);
    assert.deepEqual ({x: 60, y:50}, points[1]);
    assert.deepEqual ({x: 60, y:100}, points[2]);
    assert.deepEqual ({x: 30, y:100}, points[3]);
  });

  it ("Calculates the Rule of Third points from 40,50", function () {
    var points = Layout.RuleOfThirds (40,50, 90, 150);
    assert.deepEqual ({x: 70, y:100}, points[0]);
    assert.deepEqual ({x: 100, y:100}, points[1]);
    assert.deepEqual ({x: 100, y:150}, points[2]);
    assert.deepEqual ({x: 70, y:150}, points[3]);
  });

});
