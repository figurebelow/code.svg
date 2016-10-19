/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict"

var assert = require ("assert");
var Layout = require ("../src/utils/Layout.js").Layout;

describe ("Masonry", function ()
{
  it ("creates one brick for an empty input string", function () {
    var masonry = Layout.Masonry (800, 600, "");
    assert.deepEqual (masonry[0], {x:0, y:0, width:800, height:600});
  });

  it ("creates one vertical split from |", function () {
    var masonry = Layout.Masonry (800, 600, "|");
    assert.deepEqual (masonry[0], {x:0, y:0, width:400, height:600});
    assert.deepEqual (masonry[1], {x:400, y:0, width:400, height:600});
  });

  it ("creates one horizontal split from -", function () {
    var masonry = Layout.Masonry (800, 600, "-");
    assert.deepEqual (masonry[0], {x:0, y:0, width:800, height:300});
    assert.deepEqual (masonry[1], {x:0, y:300, width:800, height:300});
  });

  it ("parses --", function () {
    var masonry = Layout.Masonry (800, 600, "--");
    assert.deepEqual (masonry[0], {x:0, y:0, width:800, height:150});
    assert.deepEqual (masonry[1], {x:0, y:150, width:800, height:150});
    assert.deepEqual (masonry[2], {x:0, y:300, width:800, height:300});
  });

  it ("parses ->-", function () {
    var masonry = Layout.Masonry (800, 600, "->-");
    assert.deepEqual (masonry[0], {x:0, y:0, width:800, height:300});
    assert.deepEqual (masonry[1], {x:0, y:300, width:800, height:150});
    assert.deepEqual (masonry[2], {x:0, y:450, width:800, height:150});
  });

  it ("parses |-", function () {
    var masonry = Layout.Masonry (800, 600, "|-");
    assert.deepEqual (masonry[0], {x:0, y:0, width:400, height:300});
    assert.deepEqual (masonry[1], {x:0, y:300, width:400, height:300});
    assert.deepEqual (masonry[2], {x:400, y:0, width:400, height:600});
  });

  it ("parses ||", function () {
    var masonry = Layout.Masonry (800, 600, "||");
    assert.deepEqual (masonry[0], {x:0, y:0, width:200, height:600});
    assert.deepEqual (masonry[1], {x:200, y:0, width:200, height:600});
    assert.deepEqual (masonry[2], {x:400, y:0, width:400, height:600});
  });

  it ("parses |>-", function () {
    var masonry = Layout.Masonry (800, 600, "|>-");
    assert.deepEqual (masonry[0], {x:0, y:0, width:400, height:600});
    assert.deepEqual (masonry[1], {x:400, y:0, width:400, height:300});
    assert.deepEqual (masonry[2], {x:400, y:300, width:400, height:300});
  });

  it ("parses |-3,0", function () {
    var masonry = Layout.Masonry (800, 600, "|-3,0");
    assert.deepEqual (masonry[0], {x:0, y:0, width:400, height:200});
    assert.deepEqual (masonry[1], {x:0, y:200, width:400, height:200});
    assert.deepEqual (masonry[2], {x:0, y:400, width:400, height:200});
    assert.deepEqual (masonry[3], {x:400, y:0, width:400, height:600});
  });

  it ("parses |-3,0>-2", function () {
    var masonry = Layout.Masonry (800, 600, "|-3,0>-2,0");
    assert.deepEqual (masonry[0], {x:0, y:0, width:400, height:200});
    assert.deepEqual (masonry[1], {x:0, y:200, width:400, height:200});
    assert.deepEqual (masonry[2], {x:0, y:400, width:400, height:200});
    assert.deepEqual (masonry[3], {x:400, y:0, width:400, height:300});
    assert.deepEqual (masonry[4], {x:400, y:300, width:400, height:300});
  });

  it ("parses |>|->>|->--", function () {
    var masonry = Layout.Masonry (800, 600, "|>|->>|->--");
  });

  it ("parses ->|5", function () {
    var masonry = Layout.Masonry (1000, 1000, "->|5,0");
    assert.deepEqual (masonry[0], {x:0, y:0, width:1000, height:500});
    assert.deepEqual (masonry[1], {x:0, y:500, width:200, height:500});
    assert.deepEqual (masonry[2], {x:200, y:500, width:200, height:500});
    assert.deepEqual (masonry[3], {x:400, y:500, width:200, height:500});
    assert.deepEqual (masonry[4], {x:600, y:500, width:200, height:500});
    assert.deepEqual (masonry[5], {x:800, y:500, width:200, height:500});
  });

  it ("parses |[40,60]", function () {
    var masonry = Layout.Masonry (1000, 1000, "|[40,60]");
    assert.deepEqual (masonry[0], {x:0, y:0, width:400, height:1000});
    assert.deepEqual (masonry[1], {x:400, y:0, width:600, height:1000});
  });
});
