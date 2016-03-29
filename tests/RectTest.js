/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Rect = require ("../svg/Rect.js").Rect;

describe ("Rect", function ()
{
  var rect;
  beforeEach(function() {
    rect = new Rect ({width:50, height:20, x:10, y:10}, {fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal (50, rect.getAttr("width"));
    assert.equal (20, rect.getAttr("height"));
    assert.equal ("red", rect.style["fill"]);
    //assert.equal (3, rect.getZIndex());
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:35,y:20}, rect.getCenter());
  });

  it ("sets its position", function ()
  {
    rect.moveTo({x:80, y:90}, 0,0);
    assert.deepEqual ({x:80,y:90}, rect.getCenter());
  });

  it ("clones", function () {
    var newRect = rect.clone();
    assert.deepEqual (newRect, rect);
  });

  // it ("clones to coords", function () {
  //   var coords = [{x:0, y:100}, {x:200, y:100}];
  //   var rects = rect.cloneToCoords(coords);
  //   assert.equal (rects.length, 1);
  //   assert.deepEqual ({x:95, y:90},rects[0].getCenter());
  // });
  //
  // it ("updates the coords", function () {
  //   var coords = [{x:100, y:100}, {x:200, y:200}];
  //   var rects = rect.updateCoords(coords);
  //   assert.equal (rects.length, 2);
  //   rect.setPos (100, 100);
  //   assert.deepEqual (rects[0], rect);
  //   rect.setPos (200, 200);
  //   assert.deepEqual (rects[1], rect);
  // });
});
