# grunt template: jinelei

## 使用说明
直接运行```grunt```即调用default定义的方法进行调用

直接运行```grunt budil```打包文件，输出到dev（开发环境）、prod（发布环境）

## 注册以下任务

```
// 默认被执行的任务列表。
grunt.registerTask('default', ['clean', 'copy', 'babel', 'uglify', 'jshint', 'less', 'cssmin', 'watch']);
grunt.registerTask('build', ['clean', 'copy:prod', 'babel', 'uglify', 'jshint', 'less', 'cssmin']);
```

## 添加以下插件

1. grunt-contrib-copy
1. grunt-contrib-cssmin
1. grunt-contrib-uglify
1. grunt-contrib-jshint
1. grunt-contrib-less
1. grunt-babel
1. grunt-contrib-watch
