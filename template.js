'use strict';

exports.description = 'Grunt jinelei template';
exports.notes = '这个项目模板仅供参考';
exports.after = '项目已经搭建好了';
exports.warnOn = '*';


exports.template = function(grunt, init, done) {

    init.process({type: 'jinelei'}, [
        init.prompt('name'),
        init.prompt('title'),
        init.prompt('repository', 'https://github.com/jinelei/grunt-template-jinelei'),
        init.prompt('homepage', 'https://github.com/jinelei/grunt-template-jinelei'),
        init.prompt('description', '项目模板'),
        init.prompt('version', '1.0.0'),
        init.prompt('node_version', '>= 0.10.0'),
        init.prompt('npm_test', 'grunt'),
        init.prompt('author_name', 'jinelei'),
        init.prompt('author_email', 'jinelei@163.com')
    ], function(err, props) {
        props.keywords = [];

        var files = init.filesToCopy(props);

        init.copyAndProcess(files, props, {noProcess: 'libs/**'});

        init.writePackageJSON('package.json', {
            name: props.name,
            version: props.version,
            node_version: props.node_version,
            npm_test: props.npm_test,
            devDependencies: {
                "autoprefixer": "^9.2.0",
                "babel": "^6.23.0",
                "babel-core": "^6.26.3",
                "babel-preset-es2015": "^6.24.1",
                "grunt": "~0.4.5",
                "grunt-babel": "^7.0.0",
                "grunt-contrib-clean": "^2.0.0",
                "grunt-contrib-connect": "^2.0.0",
                "grunt-contrib-copy": "^1.0.0",
                "grunt-contrib-cssmin": "^3.0.0",
                "grunt-contrib-jshint": "0.11.1",
                "grunt-contrib-less": "^2.0.0",
                "grunt-contrib-rename": "^0.2.0",
                "grunt-contrib-uglify": "~0.5.0",
                "grunt-contrib-watch": "^1.1.0",
                "grunt-postcss": "^0.9.0"
            }
        })
        done();
    });
};
