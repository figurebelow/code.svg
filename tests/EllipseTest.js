/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Ellipse = require ("../svg/Ellipse.js").Ellipse;

describe ("Ellipse", function ()
{
  var ellipse;
  beforeEach(function() {
    ellipse = new Ellipse ({cx:50, cy:60, rx:10, ry:15}, {fill:"red"});
  });

  it ("initializes with parameter", function ()
  {
    assert.equal (50, ellipse.getAttr("cx"));
    assert.equal (60, ellipse.getAttr("cy"));
    assert.equal (10, ellipse.getAttr("rx"));
    assert.equal (15, ellipse.getAttr("ry"));
    assert.equal ("red", ellipse.style["fill"]);
    //assert.equal (3, ellipse.getZIndex());
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:50,y:60}, ellipse.getCenter());
  });

  it ("sets its position", function ()
  {
    ellipse.moveTo(80, 90);
    assert.deepEqual ({x:80,y:90}, ellipse.getCenter());
  });

  it ("clones", function () {
    var newEllipse = ellipse.clone();
    assert.deepEqual (ellipse, newEllipse);
  });

  // it ("clones to coords", function () {
  //   var coords = [{x:100, y:100, r:45}, {x:200, y:200, r:90}];
  //   var ellipses = ellipse.cloneToCoords(coords);
  //   assert.equal (ellipses.length, 2);
  //   ellipse.setPos (100, 100);
  //   assert.deepEqual ({x:100, y:100}, ellipse.getCenter());
  //   ellipse.setPos (200, 200);
  //   assert.deepEqual ({x:200, y:200}, ellipse.getCenter());
  // });

});
