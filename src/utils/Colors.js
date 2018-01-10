/**
* @license
* Copyright 2016 Ruben Afonso, rubenaf.com
* This source code is licensed under the Apache license (see LICENSE file)
**/

"use strict";
let request = require("sync-request");

/**
 * @class
 * @classdesc This class retrieves Palette information from colourlovers.com.
 * If you ever reuse this code remember all these calls are blocking, so unsuitable for
 * a web server implementation.
 */
class Colors {

  static setColor (i) { return '#' + i };

  constructor () {
    // static class
  };

  /**
   * Returns a random palette
   * @return {Object} returns a {id,colors} object containing the Palette Id and colors
   */
  static getRndPalette () {
    let res = request ("GET", "http://www.colourlovers.com/api/palettes/random", {
      qs: {"format":"json"}
    });
    let jsonRes = JSON.parse(res.getBody('utf8'))[0];
    return {id:jsonRes.id,
            colors: jsonRes.colors.map (function(elem) {
                          return '#' + elem
                       })
             }
  };

  /**
   * Returns the n top palettes
   * @param {number} n - number of palettes to retrieve
   * @return {array} a list of {id,colors} objects containing the Palettes Id and colors
   */
  static getTopPalettes (n) {
    let res = request ("GET", "http://www.colourlovers.com/api/palettes/top", {
      qs: {"format":"json",
           "numResults": n || 1
          }
    });
    let jsonRes = JSON.parse(res.getBody('utf8'));
    return jsonRes.map(function (i) { return {id:i.id, colors:i.colors.map(Colors.setColor) }});
  };

  /**
   * Returns the n lates palettes added to colourlovers.com
   * @param{number} n - number of palettes to retrieve
   * @return {array} a list of {id,colors} objects containing the Palettes Id and colors
   */
  static getLatestPalettes (n) {
    let res = request ("GET", "http://www.colourlovers.com/api/palettes/new", {
      qs: {"format":"json",
           "numResults": n || 1
          }
    });
    let jsonRes = JSON.parse(res.getBody('utf8'));
    return jsonRes.map(function (i) { return {id:i.id, colors:i.colors.map(Colors.setColor) }});
  };

  /**
   * Returns a palette given its Id
   * @param {string} id - string Id
   * @return {array} a list of {id,colors} objects containing the Palettes Id and colors
   */
  static getPalette (id) {
    let res = request ("GET", "http://www.colourlovers.com/api/palette/" + id, {
      qs: {"format":"json"}
    });
    let jsonRes = JSON.parse(res.getBody('utf8'))[0];
    return {id: jsonRes.id, colors: jsonRes.colors.map(Colors.setColor)};
  };
};

module.exports.Colors = Colors;
