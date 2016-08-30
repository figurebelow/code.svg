/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var LinearGradient = require ("../src/utils/Gradients.js").LinearGradient;
var Stop = require ("../src/utils/Gradients.js").Stop;

describe ("Gradients", function () {

  it ("creates an stop", function () {
    var stop = new Stop ();
  });

  it ("clones an stop", function () {
    var stop = new Stop ({offset:"50%"}, {"stop-color": "#ffffff"});
    assert (stop.equals (stop.clone()));
  });

  it ("creates a linear gradient", function () {
    var lg = new LinearGradient ();
    assert.equal (lg.getAttr("x1"), "0%");
    assert.equal (lg.getAttr("y1"), "0%");
    assert.equal (lg.getAttr("x2"), "100%");
    assert.equal (lg.getAttr("y2"), "0%");
  });

  it ("clones a linear gradient", function () {
    var lg = new LinearGradient({x1:10, y1:10, x2:50, y2:50}, {"stop-opacity": "#ffffff"});
    assert (lg.equals(lg.clone()));
  });

  it ("creates a simple gradient given two colors", function () {
    var lg = new LinearGradient().addPairStops("red", "blue");
    assert (lg.stops.length, 2);
    assert (lg.stops[0].style["offset"] = "0%");
    assert (lg.stops[1].style["offset"] = "100%");
    assert (lg.stops[0].style["stop-color"] = "red");
    assert (lg.stops[1].style["stop-color"] = "blue");
  });
});
