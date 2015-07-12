var gulp = require('gulp');
var args = require('yargs').argv;
// var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({
    lazy: true
});

var config = require('./gulp.config')();
var port = process.env.PORT || config.defaultPort;

gulp.task('default', function() {
    return gulp.src('spec/cryptoUtilSpec.js')
        .pipe($.jasmine());
});

gulp.task('serve-dev', function() {
    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
        })
        .on('start', function() {
            log('*** nodemon started');
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
});

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
