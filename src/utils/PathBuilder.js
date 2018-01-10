/**
* @license
* Copyright 2017 Ruben Afonso, rubenaf.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict"

class PathBuilder {

  static lines (points) {
    let str = "";
    str += "M" + points[0].x + "," + points[0].y + " ";
    for (let i = 1; i < points.length; i++)
      str += "L" + " " + points[i].x + "," + points[i].y + " ";
    str += "z";
    return str;
  }

  static curveBasis (points) {
    let str = "";
    str += "M" + points[0].x + "," + points[0].y + " ";
    for (let i = 1; i <= points.length-3; i +=3) {
      str += "C" + points[i].x + "," + points[i].y + " " +
        points[i+1].x + "," + points[i+1].y + " " +
        points[i+2].x + "," + points[i+2].y + " ";
    }
    //str += "z";
    return str;
  }

  static curve (points) {
    let str = "";
    str += "M" + points[0].x + "," + points[0].y + " ";
    str += "C" + points[1].x + "," + points[1].y + " " +
    points[2].x + "," + points[2].y + " " +
    points[3].x + "," + points[3].y + " ";
    for (let i = 4; i <= points.length-2; i +=2) {
      str += "S" + points[i].x + "," + points[i].y + " " +
      points[i+1].x + "," + points[i+1].y + " ";
    }
    str += "z";
    return str;
  }

};

module.exports.PathBuilder = PathBuilder;
