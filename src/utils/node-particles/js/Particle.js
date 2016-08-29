
"use strict";

let Point = require ("./Point.js").Point;


  class Particle {

    // Creates a new Particle given a x,y point and a velocity
    constructor (point,velocity){
      this.position     = point;
      this.velocity     = velocity;
      this.acceleration = new Point(0,0);
      this.ttl          = -1;
      this.lived        = 0;
      this.size = 2;
    }

  // Updates the acceleration of this particle taking into account the fields surrounding the particle
  submitToFields (fields) {
    var that = this;
    var totalAccelerationX = 0;
    var totalAccelerationY = 0;
    fields.forEach (function(field) {
        var vectorX = field.position.x - that.position.x;
        var vectorY = field.position.y - that.position.y;
        var force = field.mass /
            Math.pow((vectorX*vectorX+field.mass/2+vectorY*vectorY+field.mass/2),1.5);
        totalAccelerationX += vectorX * force;
        totalAccelerationY += vectorY * force;
    });
    this.acceleration = new Point(totalAccelerationX,totalAccelerationY);
  }

  // Moves this particle according to its position, its velocity and its acceleration
  move() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Returns the position of this particle
  getPos() { return this.position; }
};
module.exports.Particle = Particle;
