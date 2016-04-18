/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var PolygonGrammar = require ("../svg/grammars/PolygonGrammar.js");

describe ("PolygonGrammar", function () {

  it ("parses a list of points", function () {
    assert.deepEqual ([{x:0, y:0}], PolygonGrammar.parse("0,0"));
    assert.deepEqual ([{x:0, y:0},{x:10, y:10},{x:10, y:50}],
      PolygonGrammar.parse("0 0 10 10 10 50"));
    assert.deepEqual ([{x:0, y:0},{x:10, y:10},{x:10, y:50}],
      PolygonGrammar.parse("0,0 10,10 10,50"));
  });
});
