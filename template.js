/*
 * grunt-init-jquery
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Grunt jinelei template';

// Template-specific notes to be displayed before question prompts.
exports.notes = '这个项目模板仅供参考';

// Template-specific notes to be displayed after question prompts.
exports.after = '项目已经搭建好了';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({type: 'jinelei'}, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('title'),
        init.prompt('description', 'jinelei 项目骨架'),
        init.prompt('version', '1.0.0'),
        init.prompt('author_name'),
        init.prompt('author_email')
    ], function(err, props) {
        props.keywords = [];

        // 需要拷贝处理的文件，这句一般不用改它
        var files = init.filesToCopy(props);

        // 实际修改跟处理的文件，noProcess表示不进行处理
        init.copyAndProcess(files, props, {noProcess: 'libs/**'});

        // 生成package.json，供Grunt、npm使用
        init.writePackageJSON('package.json', {
            name: 'JINELEI',
            version: '1.0.0',
            npm_test: 'grunt qunit',

            node_version: '>= 0.10.0',
            devDependencies: {
                "babel": "^6.23.0",
                "babel-core": "^6.26.3",
                "babel-preset-es2015": "^6.24.1",
                "grunt": "~0.4.5",
                "grunt-babel": "^7.0.0",
                "grunt-contrib-clean": "^2.0.0",
                "grunt-contrib-copy": "^1.0.0",
                "grunt-contrib-cssmin": "^3.0.0",
                "grunt-contrib-jshint": "0.11.1",
                "grunt-contrib-less": "^2.0.0",
                "grunt-contrib-nodeunit": "~0.4.1",
                "grunt-contrib-rename": "^0.2.0",
                "grunt-contrib-uglify": "~0.5.0",
                "grunt-contrib-watch": "^1.1.0"
            }
        })
        // All done!
        done();
    });
};
