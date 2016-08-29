
"use strict";

let Point = require ("./Point.js").Point;
let Field = require ("./Field.js").Field;
let Emitter = require ("./Emitter.js").Emitter;
let Particle = require ("./Particle.js").Particle;

class ParticleSystem {

  // Creates a new ParticleSystem
  constructor() {
    this.maxParticles = 2000;
    this.particles = [];
    this.emitters = [];
    this.fields = [];
    this.elapsed = 0;
    this.gen = false;
  };

  // Adds a new Emitter, given a point in space and a velocity
  addEmitter(point, velocity, size, particleLife, spread, emissionRate) {
    this.emitters.push(new Emitter(point, velocity, size, particleLife, spread, emissionRate));
  }

  // Adds a new Field, given a point in space and its mass
  addField (point, mass) {
    this.fields.push (new Field(point, mass));
  }

  // Checks all the registered emitters, getting new particles from them.
  // This method shouldn't be called directly, use evolve instead()
  addNewParticles () {
    if (this.particles.length > this.maxParticles)
      return;
    var that = this;
    var emitParticles = function (emitter) {
      for (var i = 0; i < emitter.emissionRate; i++)
        that.particles.push(emitter.addParticle());
      }
    this.emitters.forEach(emitParticles);
  }

  // Returns the total particles count
  getParticleCount() {
    return this.particles.length;
  }

  // Returns the Emitters count
  getEmitterCount() {
    return this.emitters.length;
  }

  // Returns the Fields count
  getFieldCount() {
    return this.fields.length;
  }

  // Returns the particle's list
  getParticles () { return this.particles; }

  // This method triggers a particle generation on each registered Emitter and then updates
  // the particles position according to the registered Fields.
  evolve (steps) {
    var fields = this.fields;
    for (var step = 0; step < steps; step++) {
      this.addNewParticles();
      //this.particles.forEach (function (part, i, sourcePartList) {
        //if (part.ttl > 0 && ++part.lived >= part.ttl)
        //  sourcePartList = sourcePartList.splice(i,1);
        //var p = part.position;
        //if (p.x < 0 || p.x > boundsX || p.y < 0 || p.y > boundsY)
        //  sourcePartList = sourcePartList.splice(i,1);
      //});
      this.particles.forEach (function(part) {
        part.submitToFields(fields);
        part.move();
      });
    }
  }
};

module.exports.ParticleSystem = ParticleSystem;
module.exports.Point = Point;
module.exports.Field = Field;
module.exports.Emitter = Emitter;
module.exports.Particle = Particle;
