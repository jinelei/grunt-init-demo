# grunt template: jinelei

## 注册以下任务

```
// 默认被执行的任务列表。
grunt.registerTask('default', ['clean', 'copy', 'babel', 'uglify', 'jshint', 'less', 'cssmin', 'watch']);
grunt.registerTask('build', ['clean', 'copy:prod', 'babel', 'uglify', 'jshint', 'less', 'cssmin']);
```

## 添加以下插件


1. grunt-contrib-copy
```
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
```
1. grunt-contrib-clean
```
clean: {
    src: ['<%= meta.devEnv %>', '<%= meta.prodEnv %>']
},
```
1. grunt-contrib-cssmin
```
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
```
1. grunt-contrib-uglify
```
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
```
1. grunt-contrib-jshint
```
jshint: {
    build: ['Gruntfils.js', '<%= meta.srcPath %>/js/*.js'],
    options: {
        jshintrc: '.jshintrc'
    }
},
```
1. grunt-contrib-less
```
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
```
1. grunt-babel
```
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
```
1. grunt-contrib-watch
```
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
```
