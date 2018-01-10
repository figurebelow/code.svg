/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict"

let Parametrics = require ("../src/utils/Parametrics.js").Parametrics;
let assert = require ("assert");

describe ("Parametric functions", function () {

  it ("generates Butterfly points", function () {
    let points = Parametrics.ButterflyCurve({x:200, y:200}, 200, 1, 0.4);
    assert (points.length > 0);
  });

  it ("generates Hypocycloid points", function () {
    let points = Parametrics.Hypocycloid ({x:200, y:200}, 200, 2, 3, 4);
    assert (points.length > 0);
  });

  it ("generates Rose points", function () {
    let points = Parametrics.Rose({x:200, y:200}, 200, (6/2));
    assert (points.length > 0);
  });

  it ("generates Rossler points", function () {
    let points = Parametrics.Rossler({x:200, y:200}, 200, 1000, 0.2, 0.2, 0.4, 3);
    assert.equal(points.length, 1000);
  });

  it ("generates Lorentz points", function () {
    let points = Parametrics.Lorentz({x:200, y:200}, 200, 1000, 0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 3);
    assert.equal(points.length, 1000);
  });
});
