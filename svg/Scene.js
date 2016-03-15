/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";
module.exports.Scene = class Scene {

  constructor (root, attrs) {
    this.svg = null;
    this.root = root;
    this.children = [];
    this.masks = {};
    this.attributes = {};
    var that = this;
    for (var attr in attrs) {
      this.attributes[attr] = attrs[attr];
    }
  }

  append () {
    this.svg = this.root.append("svg")
        .attr("xmlns:dc", "http://purl.org/dc/elements/1.1/")
        .attr("xmlns:cc", "http://creativecommons.org/ns#")
        .attr("xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
        .attr("xmlns:svg", "http://www.w3.org/2000/svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("version", "1.1")
        .attr("encoding", "UTF-8")
        .attr("standalone", "no")
        .attr("width", 800)
        .attr("height", 600);

    var that = this;
    var defs = this.svg.append ("defs");
    for (var maskId in this.masks) {
      var maskRoot = defs.append ("mask").attr ("id", maskId);
      var mask = this.masks[maskId];
      mask.forEach (function (maskElems) {
        maskElems.append (maskRoot);
      });
    }

    this.svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 800)
        .attr("height", 600)
        .style("fill", "#f0e9a4");

    this.children.forEach (function (child) {
        child.append (that.svg);
    });
  }

  getSvg() {
    return this.svg
  }

  exportContent () {
    this.append();
    var content = this.root.html();
    content = content.replace(/clippath/g, "clipPath");
    return content;
  };

  add (child) { this.children.push (child); }
  addMask (id, def)
  {
    if (this.masks[id] != undefined)
    {
      this.masks[id].push (def);
    }
    else {
      this.masks[id] = [def];
    }
  }
}
