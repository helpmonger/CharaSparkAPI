var gulp = require('gulp');
var args = require('yargs').argv;
// var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('default', function() {
    return gulp.src('spec/testSpec.js')
        .pipe($.jasmine());
});
