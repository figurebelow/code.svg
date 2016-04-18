/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Filters = require ("../svg/utils/Filters.js").Filter;
var DiffuseLight = require ("../svg/utils/Filters.js").DiffuseLight;

describe ("DiffuseLight", function () {

  it ("returns a filter string", function () {
    var filter = DiffuseLight ("red", "result", 1, 2, 3, 1);
    assert.notEqual (0, filter.length);
  });
});
