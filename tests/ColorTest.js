/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict"

var assert = require ("assert");
var Colors = require ("../src/utils/Colors.js").Colors;


describe ("Colors", function () {

 it ("appends # to a color string", function () {
  var str = "FFFFFF";
  var colorStr = Colors.setColor(str);
  assert.equal ("#FFFFFF", colorStr);
 });

 it ("gets a random Palette", function () {
  var palette = Colors.getRndPalette();
  assert.notEqual (palette.id, undefined);
  assert.notEqual (palette.colors, undefined);
 });

  it ("gets 2 top palettes", function () {
    var palettes = Colors.getTopPalettes(2);
    assert.equal(palettes.length, 2);
    assert.notEqual (palettes[0].id, undefined);
    assert.notEqual (palettes[1].id, undefined);
    assert.notEqual (palettes[0].colors, undefined);
    assert.notEqual (palettes[1].colors, undefined);
    assert.notEqual (palettes[0].id, palettes[1].id);
  });

  it ("gets 2 latest palettes", function () {
    this.timeout(5000);
    var palettes = Colors.getLatestPalettes(2);
    assert.equal(palettes.length, 2);
    assert.notEqual (palettes[0].id, undefined);
    assert.notEqual (palettes[1].id, undefined);
    assert.notEqual (palettes[0].colors, undefined);
    assert.notEqual (palettes[1].colors, undefined);
    assert.notEqual (palettes[0].id, palettes[1].id);
  });

  it ("gets a palette given its ID", function () {
    this.timeout(5000);
    var palette = Colors.getPalette("4323486");
    assert.notEqual (palette.id, undefined);
    assert.notEqual (palette.colors, undefined);
  });

});
