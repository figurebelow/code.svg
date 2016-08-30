/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("../SVGBase.js").SVGBase;

// Private class
class Stop extends SVGBase {

  constructor (values, style) {
    super ("stop", values, style);
  }

  clone () {
    var newElem = new Stop (this.attributes, this.style);
    return newElem;
  }
};

class LinearGradient extends SVGBase {

  constructor (values, style) {
    var defaultValues = values || {};
    defaultValues.x1 = (values && values.x1) || "0%";
    defaultValues.y1 = (values && values.y1) || "0%";
    defaultValues.x2 = (values && values.y1) || "100%";
    defaultValues.y2 = (values && values.y2) || "0%";
    defaultValues["stop-opacity"] = (values && values["stop-opacity"]) || 1;
    super ("linearGradient", defaultValues, style);
    this.stops = [];
  }

  clone () {
    return new LinearGradient (this.attributes, this.style);
  }

  addStop (values, style) {
    var newStop = new Stop (values, style);
    this.stops.push (newStop);
    return this;
  }

  addPairStops (startColor, endColor) {
    var stop1 = new Stop ({offset:"0%"}, {"stop-color": startColor});
    this.stops.push(stop1);
    var stop2 = new Stop ({offset:"100%"}, {"stop-color": endColor});
    this.stops.push(stop2);
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
module.exports.Stop = Stop;
