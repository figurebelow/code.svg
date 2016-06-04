/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Functions = require ("../src/utils/Functions.js");

describe ("Functions", function () {

  it ("gets the NonIntersecPolCenter of a bunch of figures", function () {
    // a line
    assert.deepEqual ({x:25, y:0}, Functions.NonIntersecPolCenter ([{x:0, y:0}, {x:50, y:0}]));
    // a square
    assert.deepEqual ({x:25, y:25}, Functions.NonIntersecPolCenter ([{x:0, y:0}, {x:50, y:0}, {x:50, y:50}, {x:0, y:50}]));
    // a vertical rectangle
    assert.deepEqual ({x:100, y:125}, Functions.NonIntersecPolCenter ([{x:50, y:50}, {x:150, y:50}, {x:150, y:200}, {x:50, y:200}]));
    // a triangle
    var center = Functions.NonIntersecPolCenter ([{x:50, y:200}, {x:100, y:200}, {x:50, y:100}]);
    assert.deepEqual ({x:67, y:167}, {x: Math.round(center.x), y: Math.round(center.y)});
    // an empty input
    try {
      Functions.NonIntersecPolCenter ([]);
      assert.equal (false, true); // always fail here because an exception should take place
    }
    catch (msg)
    {
      // Success, there was an exception and it was catched here
      assert.equal (true, true);
      return;
    }
    try {
      Functions.NonIntersecPolCenter ();
      assert.equal (false, true); // always fail here because an exception should take place
    }
    catch (msg)
    {
      // Success, there was an exception and it was catched here
      assert.equal (true, true);
      return;
    }
  });

  it ("calculates the angle of two given points", function () {
    assert.equal (0, Functions.calculateAngle ({x:0, y:0}, {x:0, y:0}));
    assert.equal (0, Functions.calculateAngle ({x:0, y:0}, {x:100, y:0}));
    assert.equal (45, Functions.calculateAngle ({x:0, y:0}, {x:10, y:10}));
    assert.equal (90, Functions.calculateAngle ({x:0, y:0}, {x:0, y:100}));
  });
});
