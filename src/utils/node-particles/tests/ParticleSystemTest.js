/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Emitter = require ("../js/Emitter.js").Emitter;
var ParticleSystem = require ("../js/ParticleSystem.js").ParticleSystem;
var Field = require ("../js/Field.js").Field;
var Point = require ("../js/Point.js").Point;

describe ("ParticleSystem", function () {

  it ("Adds an emitter", function () {
    var ps = new ParticleSystem ();
    ps.addEmitter (new Emitter(new Point(10,10), Point.fromAngle(30,30)));
    assert.equal(ps.emitters.length, 1);
  });

  it ("Adds a field", function () {
    var ps = new ParticleSystem ();
    ps.addField (new Field(new Point(10,10), 20));
    assert.equal(ps.fields.length, 1);
  });

  it ("Evolves given one emitter returns 1 particle", function () {
    var ps = new ParticleSystem ();
    ps.addEmitter (new Point(10,10), new Point(0,0), 1, 1, 1);
    ps.addField (new Point(10,10), 20);
    ps.evolve(1);
    assert.equal(ps.getParticleCount(), 1);
  });

  it ("Emits vertically", function () {
    var ps = new ParticleSystem();
    ps.addEmitter (new Point(0,2), new Point(0,0), 0, 0, 1);
    ps.evolve(1);
    assert.deepEqual ({x:0, y:2}, ps.getParticles()[0].position);
  });

  it ("Removes not visible particles", function () {
    var ps = new ParticleSystem([new Point(1000, 30), new Point (40,2000), new Point(50,-50), new Point (9000, -4000)]);
    ps.bounded(800, 600).evolve(10);
    assert.equal(ps.getParticleCount(), 1);
  });

  it ("Keeps visible particles when bounded() is used", function () {
    var ps = new ParticleSystem([new Point(10, 30), new Point (40,2000), new Point(50,-50), new Point (500, 600)]);
    ps.bounded(800, 600).evolve(10);
    assert.equal(ps.getParticleCount(), 3);
  });
});
