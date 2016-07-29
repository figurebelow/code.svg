/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Rnd = require ("../src/utils/Rnd.js").Rnd;

describe ("Utils", function () {

  it ("Instantiates a random gen from a number", function () {
    var rnd = new Rnd(45);
    assert (typeof(rnd.val(1,10) == Number));
  });

  it ("Instantiates a random gen from a string seed", function () {
    var rnd = new Rnd("afpo");
    assert (typeof(rnd.val(1,10) == Number));
  });
});
