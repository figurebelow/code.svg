/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";
let cl = require ("colourlovers");

/**
 * @class
 * @classdesc This class provides a wrapper around colorlovers package to
 * retrieve palettes and its colors
 */
class Colors {

  constructor () {
    // static class
  };


  static getRndColors () {
    cl.get ("/palettes/random", {
      // no params allowed
    }, 
    function (err, data) {
      if (err)
        throw err;
      else {
        console.log(data[0].id);
        return (data[0].colors);
      }
    });
  };

  static getTopColors (n) {
    cl.get ("/palettes/new", {
      numResults: (n || 20)
    }, 
    function (err, data) {
      if (err)
        throw err;
      else {
        console.log(data.map (function(elem) { 
                      return {id:elem.id, colors:elem.colors} }));
        return data;
      }
    });

  };
};

module.exports.Colors = Colors;
