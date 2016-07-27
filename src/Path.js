/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";

let SVGBase = require ("./SVGBase.js").SVGBase;
let NonIntersecPolCenter = require ("./utils/Functions.js").NonIntersecPolCenter;
let PointsParser = require ("./grammars/PathGrammar.js");

class Path extends SVGBase {

  constructor (values, style) {
    super ("path", values, style);
    if ("d" in values)
      this.parsedPoints = PointsParser.parse (values["d"]);
    else {
      this.setAttr({d:""});
      this.parsedPoints = [];
    }
  }

  clone () {
    var newElem = new Path (this.attributes, this.style);
    return newElem;
  }

  getCenter () {
    var vertices = [];
    this.parsedPoints.forEach (function (instruction) {
      if (instruction.values != undefined) {
         vertices = vertices.concat (instruction.values)
       }
     });
     return NonIntersecPolCenter (vertices);
  }

  moveTo (xyPos) {
    var currentCenter = this.getCenter();
    var distance = {x: xyPos.x - currentCenter.x, y: xyPos.y - currentCenter.y};
    this.parsedPoints.forEach (function (point) {
      if (point.values != undefined) {
        point.values[0].x += distance.x;
        point.values[0].y += distance.y;
      }
    });
    this.updateD();
    return this;
  }

  rot (deg) {
    let center = this.getCenter ();
    super.rotate(center, deg);
    return this;
  }

  updateD () {
    var newD = "";

    this.parsedPoints.forEach (function (point, i, sourceList) {
      newD += point.type;
      if (point.type != 'z') {
        newD += point.values[0].x + "," + point.values[0].y;
        if (i < sourceList.length-1)
          newD += " ";
      }
    });
    this.setAttr ({"d":newD});
  }

  subdivide (its) {
    var iterations = its || 1;
    while (iterations > 0) {
      var clonedPoints = this.parsedPoints.slice(0);
      var interpolated = 0;
      for (var i  = 1; i < clonedPoints.length; i++) {
        if (clonedPoints[i].type == "L") {
          var intermediatePoint = NonIntersecPolCenter ([clonedPoints[i].values[0], clonedPoints[i-1].values[0]]);
          this.parsedPoints.splice (i + interpolated,0,{type:'L', values:[{x:intermediatePoint.x, y:intermediatePoint.y}]});
          interpolated++;
        }
        if (clonedPoints[i].type == "z") {
          var intermediatePoint = NonIntersecPolCenter ([clonedPoints[0].values[0], clonedPoints[i-1].values[0]]);
          this.parsedPoints.splice (i + interpolated,0,{type:'L', values:[{x:intermediatePoint.x, y:intermediatePoint.y}]});
        }
      }
      iterations--;
    }
    this.updateD();
    return this;
  }

  noise (xyFun) {
    var that = this;
    for (var i = 0; i < this.parsedPoints.length; i++) {
      var values = xyFun ();
      if (!Array.isArray(values)) {
        values = [values];
      }
      var mapped = (values == this.parsedPoints.length) || false;
      var point = this.parsedPoints[i];
      if (point.type != 'z') {
        if (mapped) {
          point.values[0].x += values[i].x;
          point.values[0].y += values[i].y;
        }
        else {
          point.values[0].x += values[0].x;
          point.values[0].y += values[0].y;
        }
      }
    }
    this.updateD();
    return this;
  }
};

module.exports.Path = Path;
