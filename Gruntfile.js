module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: '\n',
        stripBanners: true,
	banner: "\"use strict\"", 
        process: function(src, filepath) {
          src = src.replace(/module\.exports.*/gi, "");
          src = src.replace(/\"use strict\"/gi,"");
	  src = src.replace(/.*require .*/gi,"");
          return src;
        },
      },
      dist: {
        src: ['svg/SVGBase.js', 'svg/*'],
        dest: 'code.svg.min.js',
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
};
