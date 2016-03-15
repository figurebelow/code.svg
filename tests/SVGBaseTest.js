/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var SVGBase = require ("../SVGBase.js").SVGBase;
var Circle = require ("../Circle.js").Circle;
var Rect = require ("../Rect.js").Rect;

describe ("SVG", function () {

  it ("initializes zindex", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1);
    assert.equal (1, svg.getZIndex());
  });

  it ("initializes default definedByPoints", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1);
    assert.equal (false, svg.isDefinedByPoints());
  });

  it ("initializes definedByPoints when defined", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1, true);
    assert.equal (true, svg.isDefinedByPoints());
  });

  it ("initializes default definedByPoints", function ()
  {
    var svg = new SVGBase (Circle.type);
    assert.equal (0, svg.getZIndex());
  });

  it ("sets attribute", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1);
    var strings = ["height", "HEIGHT", "HeIGHT"];
    strings.forEach (function (attr) {
      svg.setAttribute (attr, 90);
      assert.equal (90, svg.getAttribute("height")); // always height
      assert.equal (90, svg.getAttribute(attr));
    });
  });

  it ("sets generator", function ()
  {
    var svg = new SVGBase (Rect.type, "", 1);
    svg.setAttribute ("width", 10);
    svg.setAttribute ("height", 20);
    svg.setGenerator ("width", "50+150");
    svg.setGenerator ("height", "Math.max(10, 20)");
    assert.deepEqual ([ "style","width", "height"], svg.content.properties)
    assert.deepEqual ({"width":"50+150", "height": "Math.max(10, 20)"},
                      svg.content.generators)
    assert.equal (200, svg.content["width"]); // attrs didn't change
    assert.equal (20, svg.content["height"]);
  });

  it ("clones", function ()
  {
    var svg = new SVGBase (Rect.type, "", 1);
    svg.setAttribute ("width", 50);
    svg.setAttribute ("height", 60);
    svg.setGenerator ("width", "50+150");
    svg.setGenerator ("height", "Math.max(10, 20)");
    var newSvg = svg.clone();
    assert.equal (200, newSvg.getAttribute ("width"));
    assert.equal (20, newSvg.getAttribute ("height"));
  });

  it ("clones and generates", function ()
  {
    var svg = new SVGBase (Rect.type, 1);
    svg.setAttribute ("width", 50);
    svg.setAttribute ("height", 60);
    svg.setGenerator ("width", "Math.random()");
    svg.setGenerator ("height", "Math.random()");
    var newSvg = svg.clone();
    assert.notEqual (svg.getAttribute("width"), newSvg.getAttribute ("width"));
    assert.notEqual (svg.getAttribute("height"), newSvg.getAttribute ("height"));
  });

  it ("returns the type", function ()
  {
    var svg = new SVGBase (Rect.type, 1);
    assert.equal (Rect.type, svg.getType());
  });

  it ("sets an attribute", function ()
  {
    var svg = new SVGBase (Rect.type, "", 1);
    assert.deepEqual (["style"], svg.content.properties);
    svg.setAttribute ("width", 40);
    assert.deepEqual (["style", "width"], svg.content.properties);
    assert.equal (40, svg.getAttribute ("width"));
    try {
      svg.getAttribute ("nonExistantAttr");
    }
    catch (msg)
    {
      assert.equal (true, true); // got the exception right
    }
  });

  it ("gets the zindex", function () {
    var svg = new SVGBase (Rect.type, "", 10);
    assert.equal (10, svg.getZIndex());
  });

  it ("returns a SVG string", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    var svgStr = svg.toSVG();
    assert.equal (true, svgStr.length != 0);
    assert.notEqual (-1, svgStr.indexOf ("<rect"));
    assert.notEqual (-1, svgStr.indexOf ("rect>"));
    assert.notEqual (-1, svgStr.indexOf ("fill:red"));
  });

  it ("returns a SVG string and its content", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    svg.setFilter ("withFilter");
    svg.setAttribute ("filter", "url(#id33)");
    var svgStr = svg.toSVG("withContent");
    assert.equal (true, svgStr.length != 0);
    assert.notEqual (-1, svgStr.indexOf("withContent"));
    assert.notEqual (-1, svgStr.indexOf("withFilter"));
  });

  it ("returns the transforms", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    assert.equal (0, svg.getTransforms().length);
    svg.applyTransform ({rotate : {r:45, x:100, y:100}});
    assert.equal (1, svg.getTransforms().length);
  });

  it ("applies the translate transform", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    assert.equal (0, svg.getTransforms().length);
    svg.applyTransform ({translate : {x:100, y:100}});
    assert.equal (1, svg.getTransforms().length);
  });

  it ("applies the scale transform", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    svg.applyTransform ({skewX : {x:100}});
    assert.equal (1, svg.getTransforms().length);
    assert.deepEqual ({op : "skewX", val: 100}, svg.getTransforms()[0]);
    svg.applyTransform ({skewY : {y:200}});
    assert.deepEqual ({op : "skewY", val: 200}, svg.getTransforms()[1]);
  });

  it ("applies the skew transforms", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    svg.applyTransform ({scale : {x:100, y:100}});
    assert.equal (1, svg.getTransforms().length);
  });

  it ("sets the filter", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    svg.setFilter ("filterString");
    assert.equal ("filterString", svg.getFilter());
  });

  it ("clones to coords is not implemented in the base object", function () {
    var svgbase = new SVGBase (Rect.type, "fill:red", 1);
    try {
      svgbase.cloneToCoords ([{x:10,y:10}]);
      asssert.equal (true, false);
    }
    catch (msg) {
      assert.equal (true, true);
    }
  });

  it ("setPos is not implemented in the base object", function () {
    var svgbase = new SVGBase (Rect.type, "fill:red", 1);
    try {
      svgbase.setPos ([{x:10,y:10}]);
      asssert.equal (true, false);
    }
    catch (msg) {
      assert.equal (true, true);
    }
  });

  it ("sets the style", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    assert.equal ("", svg.getAttribute ("filter"));
  });

  it ("applyPoints calls cloneToCoords correctly", function () {
    var svg = new SVGBase (Rect.type, "fill:red", 1);
    var cloneToCoordsIsCalled = false;
    svg.cloneToCoords = function () {
      cloneToCoordsIsCalled = true;
    };
    svg.applyPoints ([{x:0,y:0}]);
    // not DefinedByPoints, not segmented, cloneToCoords gets called
    assert.equal (true, cloneToCoordsIsCalled);
  });

  it ("applyPoints calls updateCoords correctly", function () {
    // now setting DefinedByPoints to true
    var svg = new SVGBase (Rect.type, "fill:red", 1, true);
    var cloneToCoordsIsCalled = false;
    var updateCoordsIsCalled = false;
    svg.cloneToCoords = function () {
      cloneToCoordsIsCalled = true;
    };
    svg.updateCoords = function () {
      updateCoordsIsCalled = true;
    };
    svg.applyPoints ([{x:0,y:0}]);
    assert.equal (true, updateCoordsIsCalled & !cloneToCoordsIsCalled);
  });

  it ("applyPoints calls cloneToCoords if segmented", function () {
    // now setting DefinedByPoints to true
    var svg = new SVGBase (Rect.type, "fill:red", 1, true);
    var cloneToCoordsIsCalled = false;
    var updateCoordsIsCalled = false;
    svg.cloneToCoords = function () {
      cloneToCoordsIsCalled = true;
    };
    svg.updateCoords = function () {
      updateCoordsIsCalled = true;
    };
    svg.applyPoints ([{x:0,y:0}], true);
    assert.equal (true, cloneToCoordsIsCalled & !updateCoordsIsCalled);
  });
});
