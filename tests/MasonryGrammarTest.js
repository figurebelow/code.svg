/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var MasonryGrammar = require ("../src/grammars/MasonryGrammar.js");

describe ("MasonryGrammar", function () {

  it ("parses an empty string", function () {
    var str = "";
    var defs = MasonryGrammar.parse(str);
    assert.deepEqual(defs,[]);
  });

  it ("parses |", function () {
    var str = "|";
    assert.deepEqual([{op:"|", splits:2, pos:0, values:[]}], MasonryGrammar.parse(str));
  });

  it ("parses ||", function () {
    var str = "||";
    var expected = [{op:"|", splits:2, pos:0, values:[]}, {op:"|", splits:2, pos:0, values:[]}];
    assert.deepEqual(expected, MasonryGrammar.parse(str));
  });

  it ("parses -", function () {
    var str = "-";
    assert.deepEqual([{op:"-", splits:2, pos:0, values:[]}], MasonryGrammar.parse(str));
  });

  it ("parses --", function () {
    var str = "--";
    var expected = [{op:"-", splits:2, pos:0, values:[]}, {op:"-", splits:2, pos:0, values:[]}];
    assert.deepEqual(expected, MasonryGrammar.parse(str));
  });

  it ("parses |4", function () {
    var str = "|4";
    assert.deepEqual([{op:"|", splits:4, pos:0, values:[]}], MasonryGrammar.parse(str));
  });

  it ("parses |4,3", function () {
    var str = "|4,3";
    assert.deepEqual([{op:"|", splits:4, pos:3, values:[]}], MasonryGrammar.parse(str));
  });

  it ("parses -5", function () {
    var str = "-5";
    assert.deepEqual([{op:"-", splits:5, pos:0, values:[]}], MasonryGrammar.parse(str));
  });

  it ("parses -5,2", function () {
    var str = "-5,2";
    assert.deepEqual([{op:"-", splits:5, pos:2, values:[]}], MasonryGrammar.parse(str));
  });

  it ("parses |-5,2", function () {
    var str = "|-5,2";
    var defs = MasonryGrammar.parse(str);
    assert.deepEqual({op:"|", splits:2, pos:0, values:[]}, defs[0]);
    assert.deepEqual({op:"-", splits:5, pos:2, values:[]}, defs[1]);
  });

  it ("parses >", function () {
    var str = ">";
    assert.deepEqual([{op:">", pos:1}], MasonryGrammar.parse(str));
  });

  it ("parses >4", function () {
    var str = ">4";
    assert.deepEqual([{op:">", pos:4}], MasonryGrammar.parse(str));
  });

  it ("parses |[50,50]", function () {
    var str = "|[50,50]";
    assert.deepEqual([{op:"|", splits:2, values:[50,50], pos:0}], MasonryGrammar.parse(str));
  });

  it ("parses -[50,50]", function () {
    var str = "-[50,50]";
    assert.deepEqual([{op:"-", splits:2, values:[50,50], pos:0}], MasonryGrammar.parse(str));
  });

  it ("parses |[50,50],1", function () {
    var str = "|[50,50],1";
    assert.deepEqual([{op:"|", splits:2, values:[50,50], pos:1}], MasonryGrammar.parse(str));
  });

  it ("parses -[50,50],1", function () {
    var str = "-[50,50],1";
    assert.deepEqual([{op:"-", splits:2, values:[50,50], pos:1}], MasonryGrammar.parse(str));
  });

  it ("parses -[30,40,30],2", function () {
    var str = "-[30,40,30],2";
    assert.deepEqual([{op:"-", splits:3, values:[30,40,30], pos:2}], MasonryGrammar.parse(str));
  });

});
