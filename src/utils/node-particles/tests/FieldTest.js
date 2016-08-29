/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Field = require ("../js/Field.js").Field;
var Point = require ("../js/Point.js").Point;

describe ("Field", function () {

  it ("initializes a field", function (){
    var emitter = new Field (new Point(10,10), 20);
    assert.equal (emitter.mass, 20);
    assert.deepEqual (emitter.position, new Point(10,10));
  });

  it ("moves a field", function () {
    var field = new Field (new Point(10,10), -15);
    field.moveTo(new Point(20,20));
    assert.deepEqual (field.position, new Point(20,20));
  });

});
