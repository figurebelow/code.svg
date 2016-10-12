/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var LinearGradient = require ("../src/utils/Gradients.js").LinearGradient;
var RadialGradient = require ("../src/utils/Gradients.js").RadialGradient;

describe ("Gradients", function () {

  it ("creates an stop", function () {
    var stop = new LinearGradient.Stop ();
  });

  it ("creates a linear gradient", function () {
    var lg = new LinearGradient ();
    assert.equal (lg.getAttr("x1"), "0%");
    assert.equal (lg.getAttr("y1"), "0%");
    assert.equal (lg.getAttr("x2"), "100%");
    assert.equal (lg.getAttr("y2"), "0%");
  });

  it ("creates a simple gradient given two colors", function () {
    var lg = new LinearGradient({x1:10, y1:10, x2:50, y2:50, "stop-opacity": "#ffffff"})
      .addStop("0%", "red")
      .addStop("100%", "blue");
    assert (lg.children.length, 2);
    assert (lg.getAttr("x1"), 10);
    assert (lg.getAttr("y1"), 10);
    assert (lg.getAttr("x2"), 50);
    assert (lg.getAttr("y2"), 50);
    assert (lg.getAttr("stop-opacity"), "#ffffff");
    assert (lg.children[0].getAttr("offset"), "0%");
    assert (lg.children[1].getAttr("offset"), "100%");
    assert (lg.children[0].getAttr("stop-color"), "red");
    assert (lg.children[1].getAttr("stop-color"), "blue");
  });

  it ("creates stops from addStop method", function () {
    var lg = new LinearGradient().addStop("10%", "blue").addStop("50%", "red");
    var stop1 = new LinearGradient.Stop({offset:"10%", "stop-color":"blue", "stop-opacity": 1});
    var stop2 = new LinearGradient.Stop({offset:"50%", "stop-color":"red", "stop-opacity": 1});
    assert.deepEqual (lg.children[0], stop1);
    assert.deepEqual (lg.children[1], stop2);
  });
});
