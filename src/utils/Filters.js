/**
 * @license
 * Copyright 2016 Ruben Afonso, ruben@figurebelow.com
 * This source code is licensed under the Apache license (see LICENSE file)
 **/

"use strict";

let SVGBase = require("../SVGBase.js").SVGBase;

class FeComposite extends SVGBase  {

  constructor (attrs) {
    super ("feComposite", attrs);
  }
}

class FePointLight extends SVGBase {

  /** x, y, z */
  constructor (attrs) {
    super ("fePointLight", attrs);
  }
}

class FeOffset  extends SVGBase {
  constructor (attrs) {
    super ("feOffset", attrs);
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

class FeDiffuseLighting extends SVGBase {

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

class FeComponentTransfer extends SVGBase {
    constructor() {
        super("feComponentTransfer", {});
        this.append(new Filter("feFuncA", {
            type: "linear",
            slope: 0.8
        }));
    };
}

class FeGaussianBlur extends SVGBase {
    constructor(attrs) {
      let inAttr = SVGBase.resolve(attrs, "in", "SourceGraphic");
      let stdDev = SVGBase.resolve(attrs, "stdDeviation", 3);
      let ats = attrs || {in:inAttr, stdDeviation:stdDev};
      super("feGaussianBlur", ats);
    }
};

class FeMerge extends SVGBase {
  constructor (attrs) {
    super ("feMerge", attrs);
  }
};

function SimpleLight () {
  let filter = new SVGBase ("filter");
  filter.setId();
  let diffuseLight = new FeDiffuseLighting ({in:"SourceGraphic", result:"specOut", "lighting-color":"white", diffuseConstant:"1"});
  diffuseLight.append (new FePointLight ({x: 100, y:50, z:200}));
  filter.append(diffuseLight);
  filter.append (new FeComposite ({in:"SourceGraphic", in2:"light", operator:"arithmetic", k1:0, k2:1, k3:1, k4:0}));
  return filter;
}

function RoughPaper() {
    let attrs = {
        id: "roughpaper",
        x: "0%",
        y: "0%",
        width: "100%",
        height: "100%"
    };
    let filter = new SVGBase("filter", attrs);
    filter.append(new FeTurbulence());
    let diffuse = new FeDiffuseLighting();
    diffuse.append(new FeDistantLight());
    filter.append(diffuse);
    filter.append(new FeComponentTransfer());
    return filter;
}

function DropShadow (attrs) {
  let filter = new SVGBase("filter", {x:"-10%", y:"-10%", width:"140%", height:"140%"});
  let ats = attrs || {};
  ats.dx = SVGBase.resolve (attrs,"dx",10);
  ats.dy = SVGBase.resolve (attrs,"dy",10);
  ats.stdDeviation = SVGBase.resolve (attrs, "stdDeviation", 10);
  filter.setId();
  filter.append (new FeOffset({dx: ats, dy:ats, result:"offOut", in:"SourceAlpha"}));
  filter.append (new FeGaussianBlur({stdDeviation:ats, result:"blurOut"}));
  filter.append (new SVGBase("feBlend", {in:"SourceGraphic", in2:"blurOut", mode:"normal"}));
  return filter;
}

module.exports.RoughPaper = RoughPaper;
module.exports.FeDiffuseLighting = FeDiffuseLighting;
module.exports.SimpleLight = SimpleLight;
module.exports.DropShadow = DropShadow;
