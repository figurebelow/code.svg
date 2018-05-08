/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

var fs = require ("fs");

let SVGBase = require ("./SVGBase.js").SVGBase;
let Filter = require("./Filters.js").Filter;
let Rect  = require ( "./Rect.js").Rect;
let Circle = require ( "./Circle.js").Circle;
let Line = require ( "./Line.js").Line;
let Path = require ( "./Path.js").Path;
let Ellipse = require ( "./Ellipse.js").Ellipse;
let Polyline = require ( "./Polyline.js").Polyline;
let Rnd = require ("./utils/Rnd.js").Rnd;

// Global function to return random numbers
global.Rand          = new Rnd(new Date().getMilliseconds());

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;
const DEFAULT_BACKGROUND_FILL = "#f0e9a4";

/**
 * This class represents the main SVG document where all SVG elements are appended to.
 * It creates a rect element that it's used as the document background
 * @class
 * @extends Rect
 */
class Scene extends SVGBase {

  constructor (attrs, codesvg) {
    var baseAttrs = attrs || {};
    if (baseAttrs["width"] === undefined)
      baseAttrs["width"] = DEFAULT_WIDTH;
    if (baseAttrs["height"] === undefined)
      baseAttrs["height"] = DEFAULT_HEIGHT;
    if (baseAttrs["z"] === undefined)
      baseAttrs["z"] = 1000;
    let scale = baseAttrs["scale"];
    if (scale !== undefined)
      Functions.remove(baseAttrs, "scale")
    super ("svg", baseAttrs);
    this.codesvg = codesvg;
    this.background = new Rect(baseAttrs);
    this.masks = {};
    this.defs = new SVGBase("defs");
    this.sceneAttr = {};
    this.sceneAttr["width"] = baseAttrs["width"];
    this.sceneAttr["height"] = baseAttrs["height"];
    this.sceneAttr["scale"] = scale
    this.initScene();
  }

  /**
   * Appends this element to the SVG root
   * @ignore
   */
  initScene () {
    super.setAttr({"xmlns:dc": "http://purl.org/dc/elements/1.1/"});
    super.setAttr({"xmlns:cc": "http://creativecommons.org/ns#"});
    super.setAttr({"xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"});
    super.setAttr({"xmlns:svg": "http://www.w3.org/2000/svg"});
    super.setAttr({"xmlns": "http://www.w3.org/2000/svg"});
    super.setAttr({"xmlns:xlink": "http://www.w3.org/1999/xlink"});
    super.setAttr({"xmlns:description": this.attributes["desc"] || "empty"});
    super.setAttr({"version": "1.1"});
    super.setAttr({"encoding": "UTF-8"});
    super.setAttr({"standalone": "no"});
    super.setAttr({"width": this.sceneAttr["width"] || DEFAULT_WIDTH});
    super.setAttr({"height": this.sceneAttr["height"] || DEFAULT_HEIGHT});
    if (this.sceneAttr["scale"] !== undefined) {
      let scale = this.sceneAttr["scale"];
      let width = this.getAttr("width");
      let height = this.getAttr("height");
      super.setAttr({"viewBox": "0 0 " + width + " " + height})
      super.setAttr({"width": width * scale, "height": height * scale});
    }
    for (var maskId in this.masks) {
      var maskRoot = defs.append ("mask").attr ("id", maskId);
      var mask = this.masks[maskId];
      mask.forEach (maskElem => maskElem.append(maskRoot));
    }

    this.append(this.defs);
    this.append(this.background);
  }

  setDesc (values) {
    super.setAttr(values);
  }

  setAttr (values) {
    this.background.setAttr(values);
  }

  clip (target, clippedBy) {
    var clipDef = new SVGBase("clipPath");
    this.defs.append(clipDef);
    if (clippedBy.getAttr("stroke-width"))
    {
      var border = clippedBy.getAttr("stroke-width");
      clipDef.append(clippedBy.clone().shrink(border/2));
    }
    else
      clipDef.append(clippedBy.clone());
    target.setAttr({"clip-path": clipDef.getRef()});
  }

  /**
   * Returns the content, replacing the SVG keywords that were
   * lowercased by its corresponding SVG text.
   * @ignore
   */
  exportContent () {
    var content = this.toSVG();
    content = content.replace(/clippath/g, "clipPath");
    content = content.replace(/lineargradient/g, "linearGradient");
    content = content.replace(/radialgradient/g, "radialGradient");
    content = content.replace(/fegaussianblur/g, "feGaussianBlur");
    content = content.replace(/feoffset/g, "feOffset");
    content = content.replace(/feturbulence/g, "feTurbulence");
    content = content.replace(/fediffuselighting/g, "feDiffuseLighting");
    content = content.replace(/fedistantlight/g, "feDistantLight");
    content = content.replace(/fefunca/g, "feFuncA");
    content = content.replace(/fecomponenttransfer/g, "feComponentTransfer");
    content = content.replace(/femerge/g, "feMerge");
    return content;
  };

  // This function takes arguments, so the real parameters are irrelevant
  /**
   * Adds element to the Scene
   * @param {array} _ list of elements to add
   */
  add (_) {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof (arguments[i]) === 'object' &&
        (arguments[i].type == "filter" || arguments[i].type == "mask" || arguments[i].type == "linearGradient" || arguments[i].type == "radialGradient" ||
          arguments[i].type == "pattern"))
          this.defs.append(arguments[i]);
      else
        this.children.push(arguments[i]);
      arguments[i].innerAttributes.innerDefs.forEach (elem => this.add(elem));
    }
    this.children.sort(function (a,b) {
      let fa = a.getAttr("z") || 0;
      let fb = b.getAttr("z") || 0;
      if (fa > fb)
        return -1;
      else if (fa < fb)
        return +1;
      return 0;
    });
  }

  addFrame (height, color) {
    this.add(new Rect({x:0, y:0, width:this.sceneAttr["width"], height: height, fill:color, z:-1}));
    this.add(new Rect({x:this.sceneAttr["width"] - height, y:0, width:height, height: this.sceneAttr["height"], fill:color, z:-1}));
    this.add(new Rect({x:0, y:this.sceneAttr["height"] - height, width:this.sceneAttr["width"], height: height, fill:color, z:-1}));
    this.add(new Rect({x:0, y:0, width:height, height: this.sceneAttr["height"], fill:color, z:-1}));
  }

  rect (params) {
    let rect = new Rect(params)
    this.add(rect)
    return rect
  }

  circle (params) {
    let circle = new Circle(params)
    this.add(circle)
    return circle
  }

  save () {
    var svgContent = this.exportContent()
    this.codesvg.save(svgContent)
  }

  setSeed(seed) {
    global.Rand = new Rnd(seed);
  }
};

module.exports.Scene = Scene;
module.exports.Filter = Filter;
