/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var SVGBase = require ("../src/SVGBase.js").SVGBase;

describe ("SVGBase", function () {

  it ("instantiates an empty object", function () {
    var svgBase = new SVGBase();
    assert.notEqual (svgBase.getAttr("id"), "");
  });

  it ("two different objects get different Id", function () {
    assert.notEqual (new SVGBase().getRef(), new SVGBase().getRef())
  });
});
