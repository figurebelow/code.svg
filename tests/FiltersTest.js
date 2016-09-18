/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Filters = require ("../src/utils/Filters.js");

describe ("DiffuseLight", function () {

  it ("returns a filter string", function () {
    var filter = Filters.SimpleLightFilter ({id:"light"});
    assert.notEqual (0, filter.length);
  });
});
