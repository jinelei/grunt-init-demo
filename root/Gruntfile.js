module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 元数据
        meta: {
            srcPath: 'src',
            devPath: 'dev',
            prodPath: 'prod'
        },

        // 拷贝html文件
        copy: {
            prod: {
                expand: true,
                cwd: '<%= meta.srcPath %>',
                src: 'index.html',
                dest: '<%= meta.prodPath %>'
            },
            dev: {
                expand: true,
                cwd: '<%= meta.srcPath %>',
                src: 'index.html',
                dest: '<%= meta.devPath %>'
            }
        },

        // 清理目录
        clean: {
            src: ['<%= meta.devPath %>', '<%= meta.prodPath %>']
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
                    cwd: '<%= meta.devPath %>/js',
                    src:'*.js',
                    dest: '<%= meta.prodPath %>/js',
                }]
            }
        },

        // jshint插件的配置信息(js语法规整校验插件)
        jshint: {
            build: ['Gruntfils.js', '<%= meta.srcPath %>/js/*.js'],
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
            dev: {
                options: {
                    banner: '/*! author: jinelei <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
                },
                files: {
                    '<%= meta.devPath %>/css/main.css': '<%= meta.srcPath %>/less/main.less'
                }
            }
        },

        //css压缩插件
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.devPath %>/css',
                    src: ['*.css'],
                    dest: '<%= meta.prodPath %>/css',
                    ext: '.css'
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
                    dest:'<%= meta.devPath %>/js'
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
                files: ['<%= meta.prodPath %>/less/*.css'],
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
                files: ['<%= meta.srcPath %>/js/*.js', '<%= meta.prodPath %>/js/*.js', '<%= meta.prodPath %>/css/*.css'],
                tasks: ['default'],
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
    grunt.registerTask('default', ['clean', 'copy', 'babel', 'jshint', 'uglify', 'less', 'cssmin', 'watch']);

    grunt.registerTask('build', ['clean', 'copy:prod', 'babel', 'jshint', 'uglify', 'less', 'cssmin']);

};
