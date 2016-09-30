/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var Rnd = require ("../src/utils/Rnd.js").Rnd;

describe ("Utils", function () {

  it ("Instantiates a random gen from a number", function () {
    var rnd = new Rnd(45);
    assert (typeof(rnd.random(1,10) == Number));
  });

  it ("Instantiates a random gen from a string seed", function () {
    var rnd = new Rnd("afpo");
    assert (typeof(rnd.random(1,10) == Number));
  });

  it ("Picks from a list of values", function () {
    var rnd = new Rnd ("bluecoat");
    for (var i = 0; i < 10; i++) {
      var elem = rnd.pick(["foo", "bar", "zen"]);
      assert (elem == "foo" || elem == "bar" || elem == "zen");
    }
  });

  it ("Generates a random id", function () {
    var id1 = Rnd.genId();
    var id2 = Rnd.genId();
    assert (id1 =~ "id-" && (id2 =~ "id-") && id1 != id2);
  });
});
