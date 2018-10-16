module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // 元数据
    meta: {
      srcPath: "src",
      distPath: "dist"
    },

    // 拷贝html文件
    copy: {
      dist: {
        expand: true,
        cwd: "<%= meta.srcPath %>",
        src: "index.html",
        dest: "<%= meta.distPath %>"
      }
    },

    // 清理目录
    clean: {
      src: ["<%= meta.distPath %>"]
    },

    // jshint插件的配置信息(js语法规整校验插件)
    jshint: {
      build: ["Gruntfils.js", "<%= meta.srcPath %>/js/*.js"],
      options: {
        force: true,
        esversion: 6,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        devel: true,
        browser: true
      }
    },

    //less插件配置
    less: {
      dist: {
        options: {
          banner: '/*! author: jinelei <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
        },
        files: {
          "<%= meta.distPath %>/css/main.css": "<%= meta.srcPath %>/less/main.less"
        }
      }
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ["babel-preset-es2015"]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= meta.srcPath %>/js/",
            src: ["*.js"],
            dest: "<%= meta.distPath %>/js"
          }
        ]
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({
            browsers: ["iOS >= 7", "Android > 4.1", "Firefox > 20", "last 2 versions"]
          })
        ]
      },
      dist: {
        src: "<%= meta.distPath %>/css/main.css",
        dest: "<%= meta.distPath %>/css/main.css"
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          hostname: "*",
          base: ["<%= meta.distPath %>/"]
        }
      }
    },

    //watch插件的配置信息(监控js,css文件,如改变自动压缩,语法检查)
    watch: {
      gruntfile: {
        files: "Gruntfile.js",
        tasks: ["default"]
      },
      less: {
        files: ["<%= meta.srcPath %>/less/*.less"],
        tasks: ["less"],
        options: {}
      },
      prefixcss: {
        files: ["<%= meta.distPath %>/css/*.css"],
        tasks: ["postcss"],
        options: {}
      },
      css: {
        files: ["<%= meta.distPath %>/less/*.css"],
        tasks: ["cssmin"],
        options: {}
      },
      babel: {
        files: "<%= meta.srcPath %>/js/*.js",
        tasks: ["babel"]
      },
      copy: {
        files: "<%= meta.srcPath %>/*.html",
        tasks: ["copy"]
      },
      build: {
        files: ["<%= meta.srcPath %>/js/*.js", "<%= meta.distPath %>/js/*.js", "<%= meta.distPath %>/css/*.css"],
        tasks: ["default"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  //告诉grunt我们将使用插件
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-postcss");

  // 默认被执行的任务列表。
  grunt.registerTask("default", ["clean", "copy", "babel", "jshint", "less", "postcss", "watch"]);
  grunt.registerTask("serve", ["connect", "watch"]);
};
