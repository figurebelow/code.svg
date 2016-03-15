/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Filters = require ("../Filters.js");

describe ("DiffuseLight", function () {

  it ("returns a filter string", function () {
    var filter = Filters.DiffuseLight ("red", "result", 1, 2, 3, 1);
    assert.notEqual (0, filter.length);
  });
});
