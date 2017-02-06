/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict";

let assert = require ("assert");
let SVGBase = require ("../src/SVGBase.js").SVGBase;
let Functions = require ("../src/utils/Functions.js").Functions;

describe ("SVGBase", function () {

  it ("instantiates an empty object", function () {
    let svgBase = new SVGBase();
    assert.notEqual (svgBase.getAttr("id"), "");
  });

  it ("two different objects get different Id", function () {
    assert.notEqual (new SVGBase().getRef(), new SVGBase().getRef())
  });

  it ("resolves an undefined value with the default one", function () {
    assert (50, Functions.resolve({}, "x", 50));
  });

  it ("resolves attribute value from map", function () {
    assert (10, Functions.resolve({x:10}, "x", 50));
  });

  it ("resolves numeric value", function () {
    assert (10, Functions.resolve(10, "x", 50));
  });

  it ("resolves the default value from undefined parameters", function () {
    assert (50, Functions.resolve(undefined, "x", 50));
  });

  it ("resolves a zero as numeric value", function () {
    var params = {x:0, y:0};
    assert.equal (0, Functions.resolve(params, "x", 50));
  });

  it ("resolves a function parameter", function () {
    function foo () { return 10; };
    assert (10, Functions.resolve({x: foo}, "x", 50));
  });

  it ("resolves a function that returns a map with the value", function () {
	function foo () { return {x:10, y:20} };
	assert (20, Functions.resolve(foo, "y"));
  });

  it ("resolves a function from a function that returns map with the value", function () {
	function foo2 () { function foo () { return {x:10, y:20}}; return foo; };
	assert (20, Functions.resolve(foo2, "y"));
  });

});
