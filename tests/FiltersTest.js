/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Filters = require ("../src/Filters.js");

describe ("DiffuseLight", function () {

  it ("returns a SimpleLight filter", function () {
    var filter = Filters.SimpleLight ({id:"light"});
    assert (filter != undefined && filter.getAttr("id") != undefined);
  });

  it ("returns a DropShadow filter", function () {
    var shadow = Filters.DropShadow ();
    assert (shadow != undefined && shadow.getAttr("id") != undefined);
  });
});
