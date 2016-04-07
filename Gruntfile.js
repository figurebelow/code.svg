module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        //separator: '\n',
        stripBanners: true,
	      //banner: "\"use strict\"",
        process: function(src, filepath) {
          if (!filepath.match("d3"))
          {
            src = src.replace(/module\.exports.*/gi, "");
            src = src.replace(/\"use strict\".*/gi,"");
	          src = src.replace(/.*require .*/gi,"");
            src = src.replace(/^\/\/.*/,"");
            src = src.replace(/^\r\n/g,"");
            src = src.replace(/;\n/g,";");
          }
          return src;
        },
      },
      dist: {
        src: ['d3/d3.v3.min.js', "./svg/SVGBase.js", "./svg/*", "./utils/*.js"],
        dest: 'code.svg.min.js',
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
};
