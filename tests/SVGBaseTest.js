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

describe ("SVGBase", function () {

  it ("instantiates an empty object", function () {
    let svgBase = new SVGBase();
    assert.notEqual (svgBase.getAttr("id"), "");
  });

  it ("two different objects get different Id", function () {
    assert.notEqual (new SVGBase().getRef(), new SVGBase().getRef())
  });

  it ("resolves an undefined value with the default one", function () {
    assert (50, SVGBase.resolve({}, "x", 50));
  });
  
  it ("resolves attribute value from map", function () {
    assert (10, SVGBase.resolve({x:10}, "x", 50));
  });

  it ("resolves numeric value", function () {
    assert (10, SVGBase.resolve(10, "x", 50));
  }); 

  it ("resolves the default value from undefined parameters", function () {
    assert (50, SVGBase.resolve(undefined, "x", 50));
  }); 

  it ("resolves a zero as numeric value", function () {
    var params = {x:0, y:0};
    assert.equal (0, SVGBase.resolve(params, "x", 50));
  });

  it ("resolves a function parameter", function () {
    function foo () { return 10; };
    assert (10, SVGBase.resolve({x: foo}, "x", 50));
  });
});
