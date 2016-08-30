/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Functions = require ("./utils/Functions.js").Functions;
let Rnd = require ("./utils/Rnd.js").Rnd;

/**
 * @description The SVGBase contains all the common SVG functionality inherited by the SVG elements
 */
class SVGBase {

  /**
   * @constructor
   * @param {type} String containig the type
   * @param {values} map with the SVG attributes
   * @param {style} map with the style attributes
   */
  constructor (type, values, style) {
    this.type = type;
    this.attributes = {};
    this.style = {};
    this.transform = {};
    this.transform.rotate = {}; // {x,y,deg}
    this.transform.scale = {};  // {x:xdegs, y:ydegs}
    this.transform.skew = {};
    for (var attr in values) {
      this.attributes[attr] = values[attr];
    }
    for (var opt in style) {
      this.style[opt] = style[opt];
    }
  }

  /**
   * Appends the SVG content to the SVG DOM root
   *
   * @param {object} svg the SVG root
   * @return {object} reference to this
   */
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

  /**
   * Generates the SVG transform string
   *
   * @param {object} svgNode the SVG root
   * @return {object} string
   */
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

  /**
   * Appends the SVG rotate to the SVG DOM root
   *
   * @param {object} svgNode the SVG root
   */
  genRotate (svgNode) {
    if (this.isRotated())
    {
      return "rotate(" + this.transform.rotate.deg + " " + this.transform.rotate.x + " " + this.transform.rotate.y + ")";
    }
    return "";
  }

  /**
   * Appends the SVG scale to the SVG DOM root
   *
   * @param {object} svgNode the SVG root
   */
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

  /**
   * Appends the SVG skew to the SVG DOM root
   *
   * @param {object} svgNode the SVG root
   */
  genSkew (svgNode) {
    let skewStr = "";
    if (this.transform.skewX != undefined)
      skewStr = "skewX (" + this.transform.skewX + ") ";
    if (this.skewY != undefined)
      skewStr += "skewY (" + this.transform.skewY + ") ";
    return skewStr;
  }

  /**
   * Removes and attribute from the attributes map
   * @parameter{object} attr attr string to be removed
   */
  removeAttr (attr) {
    delete(this.attributes[attr]);
    return this;
  }

  /**
   * Set the value for a set of attributes
   * @parameter{object} attrs key:value map with the attributes
   */
  setAttr (attrs) {
    for (var attr in attrs) {
      this.attributes[attr] = attrs[attr];
    }
    return this;
  }

  /**
   * Set the value for a style attribute
   * @parameter{object} attr style attribute
   * @paraneter{object} val value
   */
  sty(attr, val) {
    this.style[attr] = val;
    return this;
  }

  /**
   * Returns the attribute value
   * @parameter{object} attr style attribute
   */
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

  getRef () {
    if (!this.attributes.id)
      this.attributes.id = Rnd.genId();
    return "url(#" + this.attributes.id + ")";
  }

  equals (obj) {
    var equals = false;
    if (this.type == obj.type && this.attributes.length == obj.attributes.length &&
        this.style.length == obj.style.length) 
    {
      for (var key in this.attributes) {
        if (this.attributes[key] != obj.attributes[key])
          break;
      };
      for (var key in this.style) {
        if (this.style[key] != obj.style[key])
          break;
      };
      equals = true;
    }
    return equals;
  }
  
  cloneToCoords (points) {
    var elems = [];
    var that = this;
    points.forEach (function (point) {
      var cloned = that.clone();
      cloned.moveTo({x:point.x, y:point.y});
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
