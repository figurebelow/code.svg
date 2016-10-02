/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let Functions = require ("./utils/Functions.js").Functions;
let Rnd = require ("./utils/Rnd.js").Rnd;

/**
 * @class
 * @abstract
 * @description The SVGBase contains all the common SVG functionality inherited by the SVG elements
 */
class SVGBase {

  /**
   * @constructor
   * @param {type} type containig the type
   * @param {values} map with the SVG attributes
   * @param {style} map with the style attributes
   */
  constructor (type, values, style) {
    this.type = type;
    this.attributes = {};
    this.style = {};
    this.children = [];
    this.transform = {};
    this.transform.rotate = {}; // {x,y,deg}
    this.transform.scale = {};  // {x:xdegs, y:ydegs}
    this.transform.skew = {};
    if (values !== undefined)
      for (var attr in values) {
        this.attributes[attr] = values[attr];
      }
    if (style != undefined)
      for (var opt in style) {
        if (typeof(style[opt]) === 'object')
          this.style[opt] = style[opt].getRef();
        else
          this.style[opt] = style[opt];
      }
  }

  append (child) {
    this.children.push(child);
    return this;
  }

  /**
   * Appends the SVG content to the SVG DOM root
   *
   * @ignore
   * @param {object} svg the SVG root
   * @return {object} reference to this
   */
  toSVG () {

    this.genTransform ();
    var svgStr = "<" + this.type + " ";
    for (var key in this.attributes) {
      svgStr += key + "=\"" + this.attributes[key] + "\" ";
    }
    for (var key in this.style) {
      svgStr += key + "=\"" + this.style[key] + "\" ";
    }
    svgStr += ">";

    this.children.forEach(child => svgStr += child.toSVG());

    svgStr += "</" + this.type + ">";
    return svgStr;
  }

  /**
   * Generates the SVG transform string
   *
   * @ignore
   * @return {object} string
   */
  genTransform () {
      var transformStr = "";
      var rotString = this.genRotate ();
      var scaleString = this.genScale ();
      var skeString = this.genSkew ();
      if (!rotString.length && !scaleString.length && !skeString.length)
        return; // do nothing
      else {
        this.setAttr({"transform":rotString + " " + scaleString + " " + skeString});
      }
  }

  /**
   * Appends the SVG rotate to the SVG DOM root
   *
   * @ignore
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
   * @ignore
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
   * @ignore
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
   * Set the value for a set of attributes
   * @param {object} attrs {key:value} map with the attributes
   * @example
   * circle.setAttr({fill:"red"});
   */
  setAttr (attrs) {
    for (var attr in attrs) {
      this.attributes[attr] = attrs[attr];
    }
    return this;
  }

  /**
   * Set the value for a style attribute
   * @param {string} attr style attribute
   * @param {object} val value
   * @return the object
   * @example
   * circle.sty("fill", "red");
   */
  sty(attr, val) {
    if (typeof(val) === 'object')
        this.style[attr] = val.getRef();
      else
        this.style[attr] = val;
    return this;
  }

  /**
   * Returns the attribute's value
   * @param {object} attr style attribute
   * @return the value for 'attr' key
   * @example
   * var color = circle.getAttr("fill");
   */
  getAttr(attr) {
    return this.attributes[attr];
  }

  /**
   * @ignore
   */
  clone () {
    throw ("Missing clone() implementation in " + this.type);
  }

  /**
   * @ignore
   */
  getCenter () {
    throw ("Missing center() implementation in " + this.type);
  }

  /**
   * @ignore
   */
  moveTo (xyPos, xdif, ydif) {
    throw ("Missing moveTo() implementation in " + this.type);
  }

  /**
   * Returns a url(#<id>) reference to the object
   * @return url(#<id>) string.
   * @ignore
   */
  getRef () {
    if (!this.attributes.id)
      this.attributes.id = Rnd.genId();
    return "url(#" + this.attributes.id + ")";
  }

  /**
   * Checks whether two objects contains the same type, attribues and style
   * @ignore
   */
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

  /**
   * Rotates the object
   * @param {map} xyPos XY position center of the rotation
   * @param {number} deg degrees to rotate, clockwise
   * @returns the object
   * @ignore
   */
  rotate (xyPos, deg) {
    this.transform.rotate.x = xyPos.x;
    this.transform.rotate.y = xyPos.y;
    this.transform.rotate.deg = deg;
    return this;
  }

  /**
   * Returns whether the object has been rotated
   * @ignore
   */
  isRotated () {
    return this.transform.rotate.deg != undefined;
  }

  /**
   * Returns the rotate info
   * @ignore
   */
  getRotate () {
    return this.transform.rotate
  };

  /**
   * Scales the object
   * @param {number} xfactor x-axis scale factor
   * @param {number} yfactor y-axis scale factor
   * @return the object
   */
  sca (xfactor, yfactor) {
    this.transform.scale.x = xfactor;
    this.transform.scale.y = yfactor;
    return this;
  }

  /**
   * Skews the object
   * @param {number} xfactor x-axis skew factor
   * @param {number} yfactor y-axis skew factor
   * @return the object
   */
  ske (xfactor, yfactor) {
    this.transform.skewX = xfactor;
    this.transform.skewY = yfactor;
    return this;
  }
};

module.exports.SVGBase = SVGBase;
