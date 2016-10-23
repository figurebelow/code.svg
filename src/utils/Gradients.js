/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("../SVGBase.js").SVGBase;

/**
 * @class
 * @classdesc Defines a BaseGradient object
 * @extends SVGBase
 * @abstract
 */
class BaseGradient extends SVGBase {

  constructor (type, values, style) {
    let defaultValues = values || {};
    defaultValues.x1 = (values && values.x1) ? values.x1 : "0%";
    defaultValues.y1 = (values && values.y1) ? values.y1 : "0%";
    defaultValues.x2 = (values && values.y1) ? values.x2 : "100%";
    defaultValues.y2 = (values && values.y2) ? values.y2 : "0%";
    defaultValues["stop-opacity"] = (values && values["stop-opacity"]) ? values["stop-opacity"] : 1;
    super (type, defaultValues, style);
  }

  /**
   * Adds a Stop to the gradient
   * @param {string} offset - offset string (percentage)
   * @param {string} stopColor - color string
   * @param {number} opacity - opacity
   * @return {Object} returns a reference to the LinearGradient
   */
  addStop (offset, stopColor, stopOpacity) {
    let off = offset || "50%";
    let sc = stopColor || "red";
    let so = stopOpacity || 1;
    let newStop = new LinearGradient.Stop ({offset:off, "stop-color":sc, "stop-opacity": so});
    this.append(newStop);
    return this;
  }
};

// Private class, there are not nested classes, this is a workaround in ES6
BaseGradient.Stop = class Stop extends SVGBase {

  constructor (values, style) {
    super ("stop", values, style);
  }
};

// Class LinearGradient

/**
 * @class
 * @augments BaseGradient
 * @classdesc Defines a LinearGradient object
 */
class LinearGradient extends BaseGradient {

  constructor (values, style) {
    super ("linearGradient", values, style);
  }
};

// Class RadialGradient

/**
 * @class
 * @augments BaseGradient
 * @example
 * var gradient = new RadialGradient ({cx:"50%", cy:"50%", fx:0, fy:0, r:1, spreadMethod:"pad"});   // spreadMethod:pad|repeat|reflect
 * @classdesc Defines a RadialGradient object
 */
class RadialGradient extends BaseGradient {

  constructor (values, style) {
    super ("radialGradient", values, style);
  }
};

module.exports.LinearGradient = LinearGradient;
module.exports.RadialGradient = RadialGradient;
