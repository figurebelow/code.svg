
"use strict";

let Point = require ("./Point.js").Point;

  class Field {

    // Creates a new Field given a point and a mass. Use a negative mass for attractors and positive for repulsive behaviour.
    constructor (point, mass) {
      this.position   = point;
      this.size       = 15;
      this.mass       = mass;
    }

    // Moves the field to a new point in space
    moveTo (point) {
      this.position = point;
    }
}
module.exports.Field = Field;
