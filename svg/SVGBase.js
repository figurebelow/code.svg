/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Functions = require ("./utils/Functions.js").Functions;

class SVGBase {

  constructor (type, values, style) {
    this.type = type;
    this.attributes = {};
    this.style = {};
    this.transform = {};
    this.transform.rotate = {}; // {x,y,deg}
    this.transform.scale = {};  // {x:xdegs, y:ydegs}
    this.transform.skew = {};
    var that = this;
    for (var attr in values) {
      this.attributes[attr] = values[attr];
    }
    for (var opt in style) {
      this.style[opt] = style[opt];
    }
  }

  append (svg) {
    var svgNode = svg.append (this.type);
    for (var key in this.attributes) {
      svgNode.attr (key, this.attributes[key])
    }
    this.genTransform (svgNode);
    for (var style in this.style) {
      svgNode.style (style, this.style[style]);
    }
    return svgNode;
  }

  genTransform (svgNode) {
      var transformStr = "";
      var rotString = this.genRotate ();
      var scaleString = this.genScale ();
      var skeString = this.genSkew ();
      if (!rotString.length && !scaleString.length && !skeString.length)
        return; // do nothing
      else {
        svgNode.attr("transform", rotString + " " + scaleString + " " + skeString);
      }
  }

  genRotate (svgNode) {
    if (this.isRotated())
    {
      return "rotate(" + this.transform.rotate.deg + " " + this.transform.rotate.x + " " + this.transform.rotate.y + ")";
    }
    return "";
  }

  genScale (svgNode) {
    let xscale = 0, yscale = 0, scaleString = "";
    if (this.transform.scale.x != undefined) {
      xscale = this.transform.scale.x;
    }
    if (this.transform.scale.y != undefined) {
      yscale = this.transform.scale.y;
    }
    if (!xscale && !yscale)
      return scaleString; // skip the rest
    if (xscale && yscale) {
      scaleString = "scale(" + xscale + "," + yscale + ")";
    }
    else {
      if (xscale)
        scaleString = "scale(" + xscale + ")";
      else {
          if (yscale)
            scaleString = "scale(" + yscale + ")";
        }
    }
    return scaleString;
  }

  genSkew (svgNode) {
    let skewStr = "";
    if (this.transform.skewX != undefined)
      skewStr = "skewX (" + this.transform.skewX + ") ";
    if (this.skewY != undefined)
      skewStr += "skewY (" + this.transform.skewY + ") ";
    return skewStr;
  }
  // public methods

  removeAttr (attr) {
    delete(this.attributes[attr]);
    return this;
  }

  setAttr (attrs) {
    for (var attr in attrs) {
      this.attributes[attr] = attrs[attr];
    }
    return this;
  }

  sty(attr, val) {
    this.style[attr] = val;
    return this;
  }

  getAttr(attr) {
    return this.attributes[attr];
  }

  clone () {
    throw ("Missing clone() implementation in " + this.type);
  }

  getCenter () {
    throw ("Missing center() implementation in " + this.type);
  }

  moveTo (xyPos, xdif, ydif) {
    throw ("Missing moveTo() implementation in " + this.type);
  }

  cloneToCoords (points) {
    var elems = [];
    var that = this;
    points.forEach (function (point) {
      var cloned = that.clone();
      cloned.moveTo(point.x, point.y);
      elems.push (cloned);
    });
    return elems;
  }

  rotate (xyPos, deg) {
    this.transform.rotate.x = xyPos.x;
    this.transform.rotate.y = xyPos.y;
    this.transform.rotate.deg = deg;
  }

  isRotated () { return this.transform.rotate.deg != undefined; }
  getRotate () { return this.transform.rotate };

  sca (xfactor, yfactor) {
    this.transform.scale.x = xfactor;
    this.transform.scale.y = yfactor;
    return this;
  }

  ske (xfactor, yfactor) {
    this.transform.skewX = xfactor;
    this.transform.skewY = yfactor;
    return this;
  }
};

module.exports.SVGBase = SVGBase;
