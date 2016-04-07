/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("../svg/SVGBase.js").SVGBase;

// Private class
class Stop extends SVGBase {

  constructor (values, style) {
    super ("stop", values, style);
    this.stops = [];
  }

  clone () {
    var newElem = new Stop (this.attributes, this.style);
    return newElem;
  }
};

class LinearGradient extends SVGBase {

  constructor (values, style) {
    super ("linearGradient", values, style);
    this.stops = [];
  }

  clone () {
    var newElem = new LinearGradient (this.attributes, this.style);
    return newElem;
  }

  addStop (values, style) {
    var newStop = new Stop (values, style);
    this.stops.push (newStop);
    return this;
  }

  append (svg) {
    var newNode = super.append(svg);
    this.stops.forEach (function (stop) {
        stop.append (newNode);
    });
  };
  //<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
  //    <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
  //    <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
  //  </linearGradient>

};
module.exports.LinearGradient = LinearGradient;
