[![CircleCI](https://circleci.com/gh/rubenafo/node-particles/tree/master.svg?style=svg)](https://circleci.com/gh/rubenafo/node-particles/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/rubenafo/node-particles/badge.svg?branch=master)](https://coveralls.io/github/rubenafo/node-particles?branch=master)
[![npm version](https://badge.fury.io/js/node-particles.svg)](https://badge.fury.io/js/node-particles)   
Node-Particles
====================

This repository provides a simple, programatic way of defining a particle system in Javascript and use it in your NodeJs project (i.e. as a backend library).

The base functionality has been forked and adapted from [JavaScript-Particle-System](http://jsoverson.github.com/JavaScript-Particle-System/) so if you are looking for a particle system for the browser that's the place to go.
There is also a very nice article from the same author [here](https://software.intel.com/en-us/html5/hub/blogs/build-a-javascript-particle-system-in-200-lines#).

## Screenshots

<img src="https://raw.githubusercontent.com/rubenafo/node-particles/master/docs/scrs/part1.png" width="200">
<img src="https://raw.githubusercontent.com/rubenafo/node-particles/master/docs/scrs/part2.png" width="200">
<img src="https://raw.githubusercontent.com/rubenafo/node-particles/master/docs/scrs/part3.png" width="200">

## Usage
The easiest way to get the library is to use npm:
```bash
npm install node-particles
```
Then from your scripts you can consume it using require:
```js
var ns = require ("node-particles")
```
## Quick Example

```js
var np = require ("node-particles")

var ps = new np.ParticleSystem ();  // creates a new ParticleSystem instance

// Creates an Emitter at x:188,y:158 whose particles have a x:3,y:0 speed.
// Particles size is 15, ttl = -1, the position of the particle is jittered +/- 0.15 
// and 1 particle to be emitted on every cycle.
ps.addEmitter (new PS.Point(188,158), new PS.Point(3,0), 15, -1, 0.15, 1);

// Adds a field at x:254,y:211 with a mass of 500 (positive means attraction)
ps.addField (new PS.Point(243,211), 500);

// Adds a field at x:443,y:411 with a -5 mass (repulsion)
ps.addField (new PS.Point(443,411), -5);

// Run 10 cycles on the ParticleSystem. On each one the particles are generated
// and the previous ones position is updated.
ps.evolve(10);

ps.getParticles().forEach (function (p) {
  console.log(p.position); // displays each particle position
});
```
## License

Please check the LICENSE file located at the root of this reposity.
