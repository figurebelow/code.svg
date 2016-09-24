
"use strict";

let Point = require ("./Point.js").Point;

  class Field {

    // Creates a new Field given a point and a mass. Use a negative mass for attractors and positive for repulsive behaviour.
    constructor (point, mass) {
      this.position   = point || new Point(0,0) ;
      this.mass       = mass || 100;
    }
}
module.exports.Field = Field;
