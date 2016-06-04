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
    var path = new Path ({d:"M0,0 L10,20Z"}, {});
    assert.equal (3, path.parsedPoints.length);
  })

  it ("initializes a path with a non-closed line", function ()
  {
    var path = new Path ({d:"M0,0 L10,20"}, {});
    assert.equal (2, path.parsedPoints.length);
  })

  it ("initializes a path with a multiline", function ()
  {
    var path = new Path ({d:"M0,0 L10,20 L30,50Z"}, {});
    assert.equal (4, path.parsedPoints.length);
  })

  it ("gets the center of a square path correctly", function ()
  {
    var path = new Path ({d:"M0,0 L20,0 20,20 0,20Z"}, {});
    var center = path.getCenter();
    assert.deepEqual ({x:10, y:10}, center);
  })

  it ("gets the center of a line correctly", function ()
  {
    var path = new Path ({d:"M10,10 L20,10Z"}, {});
    var center = path.getCenter();
    assert.deepEqual ({x:15, y:10}, center);
  })

  it ("clones", function ()
  {
    var path = new Path ({d:"M10,10 L20,10Z"}, {});
    path.moveTo (40, 50);
    var path2 = path.clone();
    assert.deepEqual (path, path2);
  })
});
