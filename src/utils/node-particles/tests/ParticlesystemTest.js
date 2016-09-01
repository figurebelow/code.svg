/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
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
    ps.addEmitter (new Point(10,10), Point.fromAngle(30,30));
    ps.addField (new Point(10,10), 20);
    ps.evolve(1);
    assert.equal(ps.getParticleCount(), 1);
  });
});
