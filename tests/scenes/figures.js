var assert = require ("assert");
var scene = require ("../../src/Scene.js").Scene

var s = new scene ({width:800, height:600, fill:"#f2eeec"})
var rect = s.rect({x:46, y:45, width:200, height:50, fill:"red"})
var circle = s.circle({cx:100, cy:100, r:25, fill:"yellow"})
svgOutput = s.exportContent()

describe ("Scene tests", function () {

  it ("renders rect", function () {
    assert.ok(svgOutput.indexOf("d=\"M46,45 L246,45 L246,95 L46,95 z\"") > -1)
  });

  it ("renders circle", function () {
    assert.ok(svgOutput.indexOf("d=\"M100,100 m-25,0 a25,25,0,1,0,50,0 a25,25,0,1,0,-50,0\"") > -1)
    assert.ok(svgOutput.indexOf("r=\"25\"") > -1)
  });

});

