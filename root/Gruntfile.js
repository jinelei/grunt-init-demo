module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 元数据
        meta: {
            srcPath: 'src',
            devEnv: 'dev',
            prodEnv: 'prod'
        },

        // 拷贝html文件
        copy: {
            prod: {
                expand: true,
                cwd: '<%= meta.srcPath %>',
                src: 'index.html',
                dest: '<%= meta.prodEnv %>'
            },
            dev: {
                expand: true,
                cwd: '<%= meta.srcPath %>',
                src: 'index.html',
                dest: '<%= meta.devEnv %>'
            }
        },

        // 清理目录
        clean: {
            src: ['<%= meta.devEnv %>', '<%= meta.prodEnv %>']
        },

        // 输出js
        uglify: {
            options: {
                banner: '/*! author: jinelei <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                options :{
                    mangle : false
                },
            },
            prod: {
                files: [{
                    expand:true,
                    cwd: '<%= meta.devEnv %>/js',
                    src:'*.js',
                    dest: '<%= meta.prodEnv %>/js',
                    ext: '.min.js'
                }]
            }
        },

        // jshint插件的配置信息(js语法规整校验插件)
        jshint: {
            build: ['Gruntfils.js', '<%= meta.srcPath %>/js/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        //less插件配置
        less: {
            dev: {
                options: {
                    banner: '/*! author: jinelei <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
                },
                files: {
                    '<%= meta.devEnv %>/css/test.css': '<%= meta.srcPath %>/less/test.less'
                }
            }
        },

        //css压缩插件
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.devEnv %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= meta.prodEnv %>/css',
                    ext: '.min.css'
                }]
            }
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            dev: {
                files: [{
                    expand:true,
                    cwd:'<%= meta.srcPath %>/js/',
                    src:['*.js'],
                    dest:'<%= meta.devEnv %>/js'
                }]
            }
        },

        //watch插件的配置信息(监控js,css文件,如改变自动压缩,语法检查)
        watch: {
            gruntfile: {
                files:'Gruntfile.js',
                tasks:['default']
            },
            client: {
                files: ['<%= meta.srcPath %>/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            clientcss: {
                files: ['<%= meta.prodEnv %>/less/*.css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            },
            babel:{
                files:'<%= meta.srcPath %>/js/*.js',
                tasks:['babel']
            },
            copy: {
                files:'<%= meta.srcPath %>/*.html',
                tasks:['copy']
            },
            build: {
                files: ['<%= meta.srcPath %>/js/*.js', '<%= meta.prodEnv %>/js/*.js', '<%= meta.prodEnv %>/css/*.css'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });

    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['clean', 'copy', 'babel', 'uglify', 'jshint', 'less', 'cssmin', 'watch']);

    grunt.registerTask('build', ['clean', 'copy:prod', 'babel', 'uglify', 'jshint', 'less', 'cssmin']);

};
