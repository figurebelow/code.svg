[![Build Status](https://travis-ci.org/figurebelow/code.svg.svg?branch=master)](https://travis-ci.org/figurebelow/code.svg)
[![Coverage Status](https://coveralls.io/repos/github/figurebelow/code.svg/badge.svg?branch=master)](https://coveralls.io/github/figurebelow/code.svg?branch=master)
[![npm version](https://badge.fury.io/js/code.svg.svg)](https://badge.fury.io/js/code.svg)

# code.svg
A JavaScript library to manipulate the SVG DOM from Nodejs in a object-oriented way

## Usage 

```javascript
node codesvg.js foo.js -o foo.svg
```
or
```javascript
node codesvg.js foo.js
```
The second way generates a .svg taking the input filename as reference.

Although you can just run node to get the .svg generated, a good choice is to use [nodemon](https://github.com/remy/nodemon) instead so changes in the input file will run codesvg.js automatically and generate the svg file on the fly (in this case, input.svg)

```javascript
nodemon codesvg.js input.js
```

## Quick Example

Let's check a simple example of how an input file looks like.
The following snippet creates a Scene, adds a Rectangle, defines some style options and then move the Rectangle so its center
is at the point (250,250).

```javascript
var scene = new Scene(root, {"width":800, "height":600});
var rect = new Rect ({width:100, height:80},
                     {stroke:"#2a240f", "stroke-width":"3px", opacity:0.6})
                    .moveTo({x:250, y:250});
scene.add (rect);
return scene.exportContent();
```

The input file has basically three requirements:

1. The Scene object is mandatory as it's the base generator of the SVG document and contains all the references to the SVG objects.
2. The first parameter of the Scene object must be 'root'.
3. The input file must return with a call to the exportContent() method.
