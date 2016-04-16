/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Path = require ("../svg/Path.js").Path;

describe ("Path", function () {

  var path;
  beforeEach(function() {
    path = new Path ("", "fill:red", 3);
  });

  it ("initializes a path with a line", function ()
  {
    var path = new Path ("M0,0 L10,20Z", "", 1);
  })

  it ("initializes a path with a non-closed line", function ()
  {
    var path = new Path ("M0,0 L10,20", "", 1);
  })

  it ("initializes a path with a multiline", function ()
  {
    var path = new Path ("M0,0 L10,20 L30,50Z", "", 1);
  })

  xit ("gets the center of a square path correctly", function ()
  {
    var path = new Path ("M0,0 L20,0 20,20 0,20Z", "", 1);
    var center = path.getCenter();
    assert.deepEqual ({x:10, y:10}, center);
  })

  xit ("gets the center of a line correctly", function ()
  {
    var path = new Path ("M10,10 L20,10Z", "", 1);
    var center = path.getCenter();
    assert.deepEqual ({x:15, y:10}, center);
  })

  xit ("clones", function ()
  {
    var path = new Path ("M10,10 L20,10Z", "", 1);
    path.setPos (40, 50);
    var path2 = path.clone();
    assert.deepEqual (path, path2);
  })
});
