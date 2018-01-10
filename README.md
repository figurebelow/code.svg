[![Build Status](https://travis-ci.org/rubenafo/code.svg.svg?branch=master)](https://travis-ci.org/rubenafo/code.svg)
[![Coverage Status](https://coveralls.io/repos/github/rubenafo/code.svg/badge.svg?branch=master)](https://coveralls.io/github/rubenafo/code.svg?branch=master)
[![npm version](https://badge.fury.io/js/code.svg.svg)](https://badge.fury.io/js/code.svg)

# code.svg
A JavaScript library to manipulate the SVG DOM from Nodejs in a object-oriented way

## Usage 

```javascript
node <your_script.js>
```
or
```javascript
node <your_script.js> -o file.svg
```
The second way generates a .svg taking the input filename as reference.

Although you can just run node to get the .svg generated, a good choice is to use [nodemon](https://github.com/remy/nodemon) instead so changes in the input file will run codesvg.js automatically and generate the svg file on the fly (in this case, input.svg)

```javascript
nodemon node <your_script.js>
```

## Requirements for the input script

There are basically two requirements to create a code.svg script.   
The first one is that the script must include the codesvg.js library:

```javascript
cs = require ("./codesvg.js");
```

The second one is that the script must end with a call to the library variable passing as parameter a Scene object containing all the information.
```bash
var scene = new Scene ();
...
cs.save(scene);
```

## Quick Example

Let's check a simple example of how an input file looks like.   
The following snippet creates a Scene, adds a Rectangle, defines some style options and then move the Rectangle so its center
is at the point (250,250).

```javascript
var cs = require ("./codesvg.js");
var scene = new Scene({"width":800, "height":600});
var rect = new Rect ({width:100, height:80},
                     {stroke:"#2a240f", "stroke-width":"3px", opacity:0.6})
                      .moveTo({x:250, y:250});
scene.add (rect);
cs.save(scene);
```
