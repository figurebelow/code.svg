/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Rect = require ("./Rect.js").Rect;

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;
const DEFAULT_BACKGROUND_FILL = "#f0e9a4";

/**
 * This class represents the main SVG document where all SVG elements are appended to.
 * It creates a rect element that it's used as the document background
 * @class
 * @extends Rect
 */
class Scene extends Rect {

  constructor (root, attrs, style) {
    if (attrs["width"] === undefined)
      attrs["width"] = DEFAULT_WIDTH;
    if (attrs["height"] === undefined)
      attrs["height"] = DEFAULT_HEIGHT;
    super (attrs, style);
    this.svg = null;
    this.root = root;
    this.children = [];
    this.masks = {};
    this.defs = [];
    this.sceneAttr = {};
    this.sceneAttr["width"] = attrs["width"];
    this.sceneAttr["height"] = attrs["height"];
  }

  /**
   * Appends this element to the SVG root
   * @ignore
   */
  append () {
    this.svg = this.root.append("svg")
        .attr("xmlns:dc", "http://purl.org/dc/elements/1.1/")
        .attr("xmlns:cc", "http://creativecommons.org/ns#")
        .attr("xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
        .attr("xmlns:svg", "http://www.w3.org/2000/svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xmlns:description", this.attributes["desc"] || "")
        .attr("version", "1.1")
        .attr("encoding", "UTF-8")
        .attr("standalone", "no")
        .attr("width", this.sceneAttr["width"] || DEFAULT_WIDTH)
        .attr("height", this.sceneAttr["height"] || DEFAULT_HEIGHT)

    var defs = this.svg.append ("defs");
    this.defs.forEach (def => def.append(defs));

    for (var maskId in this.masks) {
      var maskRoot = defs.append ("mask").attr ("id", maskId);
      var mask = this.masks[maskId];
      mask.forEach (maskElem => maskElem.append(maskRoot));
    }

    super.append(this.svg);
    this.children.forEach (child => child.append(this.svg));
    console.log("SVG: " + this.children.length + " SVG elements");
  }

  /**
   * Returns the SVG
   * @ignore
   */
  getSvg() {
    return this.svg;
  }

  /**
   * Returns the content, replacing the SVG keywords that were
   * lowercased by its corresponding SVG text.
   * @ignore
   */
  exportContent () {
    this.append();
    var content = this.root.html();
    content = content.replace(/clippath/g, "clipPath");
    content = content.replace(/lineargradient/g, "linearGradient");
    content = content.replace(/radialgradient/g, "radialGradient");
    content = content.replace(/feturbulence/g, "feTurbulence");
    content = content.replace(/fediffuselighting/g, "feDiffuseLighting");
    content = content.replace(/fedistantlight/g, "feDistantLight");
    content = content.replace(/fefunca/g, "feFuncA");
    content = content.replace(/fecomponenttransfer/g, "feComponentTransfer");
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
        (arguments[i].type == "filter" || arguments[i].type == "mask" || arguments[i].type == "linearGradient" || arguments[i].type == "radialGradient"))
        this.defs.push(arguments[i]);
      else
        this.children.push(arguments[i]);
    }
  }

  addFrame (height, color) {
    this.add(new Rect({x:0, y:0, width:this.sceneAttr["width"], height: height}, {fill:color}));
    this.add(new Rect({x:this.sceneAttr["width"] - height, y:0, width:height, height: this.sceneAttr["height"]}, {fill:color}));
    this.add(new Rect({x:0, y:this.sceneAttr["height"] - height, width:this.sceneAttr["width"], height: height}, {fill:color}));
    this.add(new Rect({x:0, y:0, width:height, height: this.sceneAttr["height"]}, {fill:color}));
  }
};

module.exports.Scene = Scene;
