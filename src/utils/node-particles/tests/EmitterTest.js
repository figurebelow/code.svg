/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Emitter = require ("../js/Emitter.js").Emitter;
var Point = require ("../js/Point.js").Point;

describe ("Emitter", function () {

  it ("initializes an emitter", function (){
    var emitter = new Emitter (new Point(10,10), new Point(0, 0), 0,0, 1, 0, 1);
  });

  it ("adds a particle", function () {
    var emitter = new Emitter (new Point(10,10), new Point(0,0), 0, 0, 1, 0, 1);
    var newParticle = emitter.addParticle();
    assert.deepEqual (newParticle.position, emitter.position);
  });
});
