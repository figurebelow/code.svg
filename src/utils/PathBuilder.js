/**
* @license
* Copyright 2017 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict"

class PathBuilder {

  static lines (points) {
    let str = "";
    str += "M" + points[0].x + "," + points[0].y + " ";
    for (let i = 1; i < points.length; i++)
      str += "L" + " " + points[i].x + "," + points[i].y + " ";
    return str;
  }

  static curveBasis (points) {
    let str = "";
    str += "M" + points[0].x + "," + points[0].y + " ";
    for (let i = 1; i < points.length; i +=6) {
      console.log(points[i])
      str += "C" + points[i].x + points[i].y + "," +
        points[i+1].x + " " + points[i+1].y +
        points[i+2].x + " " + points[i+2].y +
        points[i+3].x + " " + points[i+3].y;
    }
    return str;
  }

};

module.exports.PathBuilder = PathBuilder;
