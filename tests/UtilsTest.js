/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

"use strict";

let assert = require ("assert");
let Rnd = require ("../src/utils/Rnd.js").Rnd;

describe ("Utils", function () {

  it ("Instantiates a random gen from a number", function () {
    let rnd = new Rnd(45);
    assert (typeof(rnd.random(1,10) == Number));
  });

  it ("Instantiates a random gen from a string seed", function () {
    let rnd = new Rnd("afpo");
    assert (typeof(rnd.random(1,10) == Number));
  });

  it ("Picks from a list of values", function () {
    let rnd = new Rnd ("bluecoat");
    for (let i = 0; i < 10; i++) {
      let elem = rnd.pick(["foo", "bar", "zen"]);
      assert (elem == "foo" || elem == "bar" || elem == "zen");
    }
  });

  it ("Generates a random id", function () {
    let id1 = Rnd.genId();
    let id2 = Rnd.genId();
    assert (id1 =~ "id-" && (id2 =~ "id-") && id1 != id2);
  });
});
