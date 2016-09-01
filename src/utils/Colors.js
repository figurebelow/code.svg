/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
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

  constructor () {
    // static class
  };

  /**
   * Returns a random palette
   * @return {Object} returns a {id,colors} object containing the Palette Id and colors
   */
  static getRndPalette () {
    var res = request ("GET", "http://www.colourlovers.com/api/palettes/random", {
      qs: {"format":"json"}
    });
    var jsonRes = JSON.parse(res.getBody('utf8'));
    return jsonRes.map(function (i) { return {id:i.id, colors:i.colors }});
  };

  /**
   * Returns the n top palettes
   * @parameter{number} n - number of palettes to retrieve
   * @return {array} a list of {id,colors} objects containing the Palettes Id and colors
   */
  static getTopPalettes (n) {
    var res = request ("GET", "http://www.colourlovers.com/api/palettes/top", {
      qs: {"format":"json",
           "numResults": n || 1
          }
    });
    var jsonRes = JSON.parse(res.getBody('utf8'));
    return jsonRes.map(function (i) { return {id:i.id, colors:i.colors }});
  };

  /**
   * Returns the n lates palettes added to colourlovers.com
   * @parameter{number} n - number of palettes to retrieve
   * @return {array} a list of {id,colors} objects containing the Palettes Id and colors
   */
  static getLatestPalettes (n) {
    var res = request ("GET", "http://www.colourlovers.com/api/palettes/new", {
      qs: {"format":"json",
           "numResults": n || 1
          }
    });
    var jsonRes = JSON.parse(res.getBody('utf8'));
    return jsonRes.map(function (i) { return {id:i.id, colors:i.colors }});
  };

  /**
   * Returns a palette given its Id
   * @parameter{string} id - string Id 
   * @return {array} a list of {id,colors} objects containing the Palettes Id and colors
   */
  static getPalette (id) {
    var res = request ("GET", "http://www.colourlovers.com/api/palette/" + id, {
      qs: {"format":"json"}
    });
    var jsonRes = JSON.parse(res.getBody('utf8'));
    return {id: jsonRes[0].id, colors: jsonRes[0].colors};
  };
};

module.exports.Colors = Colors;
