
"use strict"

class Cfg {

  constructor (scene) {
    this.branches = []
    this.MAX = 100
    this.scene = scene
  }

  add (p, f) {
    this.branches = this.branches.concat({f:f, p:p})
    this.branches.sort(function(a,b) {
      return a.p >= b.p
    });
    return this
  }

  run () {
    let totalDist = this.branches.forEach(function (item) {
      return item.p
    });
    let p = this.branches.map(x => x.p)
    let ptotal = p.reduce((a,b) => a+b)
    let pos = Rand.int(0, ptotal-1)
    print(pos)
    //let ff = this.branches[pos]
    //ff.f()
  }
}
module.exports.Cfg = Cfg
