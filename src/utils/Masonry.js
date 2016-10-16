
"use strict";

let Rnd = require ("./Rnd.js").Rnd;
let MasonryParser = require ("../grammars/MasonryGrammar.js");

class Brick {

  constructor (x0, y0, width, height) {
    this.x = x0;
    this.y = y0;
    this.width = width;
    this.height = height;
  }
}

class Masonry {

    constructor (width, height, configString) {
      this.bricks = [];   // a brick: {x0, y0, width, height}
      this.rand = new Rnd(40);
      this.init(width, height, configString);
      return this.bricks;
    }

    init (width, height, configString) {
      this.contextInfo(width, height, configString)
    }

    contextInfo (w, h, configStr) {
      var ops = MasonryParser.parse(configStr);
      var posStack = [];
      var width = w, height = h, x0 = 0, y0 = 0, headPos = 0;
      this.bricks.push(new Brick(x0, y0, width, height));
      posStack.push(headPos);

      while (ops.length > 0) {
        posStack.push(headPos);
        var currentBrick = this.bricks[headPos];
        var lookahead = ops[0];
        if (lookahead.op == '|') {
          this.bricks.splice (headPos, 1,
            new Brick (currentBrick.x, currentBrick.y,
                       currentBrick.width/lookahead.splits, currentBrick.height));
          for (var i = 1; i < lookahead.splits; i++) {
            this.bricks.splice (headPos+i, 0,
              new Brick (currentBrick.x + i * (currentBrick.width/lookahead.splits), currentBrick.y,
                         currentBrick.width/lookahead.splits, currentBrick.height));
          }
          posStack.forEach(function(elem, i) { posStack[i] += lookahead.splits-1});
        }
        if (lookahead.op == "-") {
          this.bricks.splice (headPos, 1,
            new Brick (currentBrick.x, currentBrick.y,
                       currentBrick.width, currentBrick.height/lookahead.splits));
          for (var i = 1; i < lookahead.splits; i++) {
            this.bricks.splice (headPos+i, 0,
              new Brick (currentBrick.x, currentBrick.y + i*(currentBrick.height/lookahead.splits),
                         currentBrick.width, currentBrick.height/lookahead.splits));
          }
          posStack.forEach(function(elem, i) { posStack[i] += lookahead.splits-1});
        }
        if (lookahead.op == '>') {
          headPos = posStack.shift();
        }
        ops = ops.slice(1);
      }
    }
};

module.exports.Masonry = Masonry;
