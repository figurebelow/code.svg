/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Path = require ("../src/Path.js").Path;

describe ("Path", function () {

  it ("initializes a path with a line", function ()
  {
    var path = new Path ({d:"M0,0 L10,20Z"});
    assert.equal (3, path.parsedPoints.length);
  })

  it ("initializes a path with a non-closed line", function ()
  {
    var path = new Path ({d:"M0,0 L10,20"});
    assert.equal (2, path.parsedPoints.length);
  })

  it ("initializes a path with a multiline", function ()
  {
    var path = new Path ({d:"M0,0 L10,20 L30,50Z"});
    assert.equal (4, path.parsedPoints.length);
  })

  it ("gets the center of a square path correctly", function ()
  {
    var path = new Path ({d:"M0,0 L20,0 20,20 0,20Z"});
    var center = path.getCenter();
    assert.deepEqual ({x:10, y:10}, center);
  })

  it ("gets the center of a line correctly", function ()
  {
    var path = new Path ({d:"M10,10 L20,10Z"});
    var center = path.getCenter();
    assert.deepEqual ({x:15, y:10}, center);
  })

  it ("moves a path", function () {
    var path = new Path ({d:'M10,10 L60,10 L60,30 L10,30'});
    path.moveTo({x:80, y:90});
    assert.deepEqual ({x:80,y:90}, path.getCenter());
    assert.equal (path.parsedPoints[0].values[0].x, 55);
    assert.equal (path.parsedPoints[0].values[0].y, 80);
    assert.equal (path.parsedPoints[1].values[0].x, 105);
    assert.equal (path.parsedPoints[1].values[0].y, 80);
    assert.equal (path.parsedPoints[2].values[0].x, 105);
    assert.equal (path.parsedPoints[2].values[0].y, 100);
    assert.equal (path.parsedPoints[3].values[0].x, 55);
    assert.equal (path.parsedPoints[3].values[0].y, 100);
  })

  it ("clones", function ()
  {
    var path = new Path ({d:"M10,10 L20,10Z"});
    var path2 = path.clone();
    assert (path.equals(path2));
  })

  it ("clones and moves", function () {
    var path = new Path ({d:'M10,10 L60,10 L60,30 L10,30'});
    path.moveTo({x:80, y:90});
    var path2 = path.clone();
    assert (path.equals(path2));
  });

  it ("noise applies a constant value", function () {
    var path = new Path ({d:'M10,10 L60,10 L60,30 L10,30'});
    var originalPath = path.clone();
    function addNoise () { return {x:10,y:10}};
    path.noise(addNoise);
    function removeNoise () { return {x:-10,y:-10}};
    path.noise(removeNoise);
    assert (path.equals(originalPath));
  });

  it ("UP returns the upmost point in a path", function () {
    var path = new Path ({d:'M10,10 L60,10 L60,4 L10,30'});
    assert.deepEqual({x:60, y:4}, path.pointAt(Path.UP));
  });

  it ("RIGHT returns the rightmost point in a path", function () {
    var path = new Path ({d:'M10,10 L80,10 L40,70 L10,30'});
    assert.deepEqual({x:80, y:10}, path.pointAt(Path.RIGHT));
  });

  it ("DOWN returns the downmost point in a path", function () {
    var path = new Path ({d:'M10,10 L60,10 L60,70 L10,130'});
    assert.deepEqual({x:10, y:130}, path.pointAt(Path.DOWN));
  });

  it ("LEFT returns the leftmost point in a path", function () {
    var path = new Path ({d:'M10,10 L60,10 L60,70 L1,30'});
    assert.deepEqual({x:1, y:30}, path.pointAt(Path.LEFT));
  });

  it ("returns the center of a bezier-defined path", function () {
    var path = new Path ({d:"M10 10 C20,20,40,20,50,10 "});
  });
});
