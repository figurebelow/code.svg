
"use strict"

class Cfg {

  constructor (scene) {
    this.branches = []
    this.scene = scene
  }

  add (f) {
    this.branches = this.branches.concat({f:f, p:1/(this.branches.length+1)})
    return this
  }

  run () {
    let pos = Rand.int(0, this.branches.length-1)
    let ff = this.branches[pos]
    ff.f()
  }
}
module.exports.Cfg = Cfg
