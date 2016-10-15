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
});