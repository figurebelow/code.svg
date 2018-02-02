/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict"

var assert = require ("assert");
var Scene = require ("../src/Scene.js").Scene;
var Rect  = require ("../src/Rect.js").Rect;
var Path  = require ("../src/Path.js").Path;

describe ("Scene", function ()
{

  it ("initializes without parameter", function ()
  {
    var scene = new Scene (null, {});
  })

  it ("clips an object to a target object", function () {
    var scene = new Scene ({width:800, height:600});
    var rect = new Rect ({x:50, y:50, fill:"red"});
    var path = new Path ({d:"M0,0 L20,20z"});
    scene.add(path);
    scene.add(rect);
    scene.clip(path, rect);
    assert.equal (1, scene.defs.children.length);
    assert.equal (4, scene.children.length);
    assert.equal (1, scene.defs.children[0].children.length);
  });
})
