/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("../svg/SVGBase.js").SVGBase;

class Filter extends SVGBase {

  constructor (values, style) {
    super ("filter", values, style);
  }

  clone () {
    var newElem = new Filter (this.attributes, this.style);
    return newElem;
  }
}

DiffuseLight = function (color, result, x, y, z, intensity)
{
  var filterString = "";
  filterString += "<filter id=\"id" + 33 + "\">";
  filterString += "<feDiffuseLighting in=\"SourceGraphic\" result=\"" + result + "\" lighting-color=\"" + color + "\" diffuseConstant=\"" + intensity + "\">";
  filterString += "<fePointLight y=\"" + 50 + "\" x=\"" + 100 + "\" z=\"" + z + "\"/>";
  filterString += "</feDiffuseLighting>";
  filterString += "<feComposite in=\"SourceGraphic\" in2=\"light\" operator=\"arithmetic\" k1=\"1\" k2=\"0\" k3=\"0\" k4=\"0\"/>";
  filterString += "</filter>";
  return filterString;
}

module.exports.Filter = Filter;
module.exports.DiffuseLight = DiffuseLight;
