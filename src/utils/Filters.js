/**
 * @license
 * Copyright 2016 Ruben Afonso, ruben@figurebelow.com
 * This source code is licensed under the Apache license (see LICENSE file)
 **/

"use strict";

let SVGBase = require("../SVGBase.js").SVGBase;

/**
 * @class
 * @classdesc Defines a Filter object
 * @extends SVGBase
 * @abstract
 */
class Filter extends SVGBase {

}

module.exports.Filter = Filter;

function SimpleLightFilter () {
  var filter = new Filter ("filter", {id:"light"});
  var diffuseLight = new FeDiffuseLighting ({in:"SourceGraphic", result:"specOut", "lighting-color":"white", diffuseConstant:"1"});
  diffuseLight.append (new FePointLight ({x: 100, y:50, z:200}));
  filter.append(diffuseLight);
  filter.append (new FeComposite ({in:"SourceGraphic", in2:"light", operator:"arithmetic", k1:0, k2:1, k3:1, k4:0}));
  return filter;
}

    /*var filterString = "";
    filterString += "<filter id=\"id" + 33 + "\">";
    filterString += "<feDiffuseLighting in=\"SourceGraphic\" result=\"" + result + "\" lighting-color=\"" + color + "\" diffuseConstant=\"" + intensity + "\">";
    filterString += "<fePointLight y=\"" + 50 + "\" x=\"" + 100 + "\" z=\"" + z + "\"/>";
    filterString += "</feDiffuseLighting>";
    filterString += "<feComposite in=\"SourceGraphic\" in2=\"light\" operator=\"arithmetic\" k1=\"1\" k2=\"0\" k3=\"0\" k4=\"0\"/>";
    filterString += "</filter>";
    return filterString;*/

class FeComposite extends SVGBase  {

  constructor (attr) {
    super ("feComposite", attr);
  }
}

class FePointLight extends SVGBase {

  /** x, y, z */
  constructor (attrs) {
    super ("fePointLight", attrs);
  }
}

class FeTurbulence extends SVGBase {

    constructor() { // type:turbulence|fractalNoise , result:noise|turbulence
        super("feTurbulence", {
            type: "fractalNoise",
            baseFrequency: 0.04,
            numOctaves: 5,
            result: "noise"
        });
    }
}

class FeDiffuseLighting extends Filter {

    constructor() {
        super("feDiffuseLighting", { in: "noise",
            "lighting-color": "#95c1c3",
            surfaceScale: 2,
            result: "diffLight"
        });
    }
}

class FeDistantLight extends SVGBase {
    constructor() {
        super("feDistantLight", {
            azimuth: 45,
            elevation: 65
        });
    }
}

class FeComponentTransfer extends Filter {
    constructor() {
        super("feComponentTransfer", {});
        this.append(new Filter("feFuncA", {
            type: "linear",
            slope: 0.8
        }));
    };
}

class FeGaussianBlur extends SVGBase {
    constructor() {
        super("feGaussianBlur", {});
    }
};

function RoughPaper() {
    var attrs = {
        id: "roughpaper",
        x: "0%",
        y: "0%",
        width: "100%",
        height: "100%"
    };
    var filter = new Filter("filter", attrs);
    filter.append(new FeTurbulence());
    var diffuse = new FeDiffuseLighting();
    diffuse.append(new FeDistantLight());
    filter.append(diffuse);
    filter.append(new FeComponentTransfer());
    return filter;
}

module.exports.RoughPaper = RoughPaper;
module.exports.Filter = Filter;
module.exports.FeDiffuseLighting = FeDiffuseLighting;
module.exports.SimpleLightFilter = SimpleLightFilter;
