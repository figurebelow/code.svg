/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Particle = require ("../js/Particle.js").Particle;
var Point = require ("../js/Point.js").Point;

describe ("Particle", function () {

  it ("creates a new Particle without parameters", function () {
    var p = new Particle();
  });

  it ("moves the particle according its velocity and acceleration", function () {
    var p = new Particle (new Point(0,0), new Point (10,10));
    p.acceleration = new Point (2,2);
    p.move();
    p.move();
    assert.deepEqual (p.position, {x:26, y:26});
  });
   
  it ("moves the particle and keeps the position history", function () {
    var p = new Particle (new Point(0,0), new Point (10,10));
    p.acceleration = new Point (2,2);
    p.move();
    p.move();
    assert.equal (3, p.traceRecord.length);
    assert.deepEqual ({x:0, y:0}, p.traceRecord[0]);
    assert.deepEqual ({x:12, y:12}, p.traceRecord[1]);
    assert.deepEqual ({x:26, y:26}, p.traceRecord[2]);
  });

});
