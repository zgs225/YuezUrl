'use strict';

var gulp   = require('gulp'),
    coffee = require('gulp-coffee');

gulp.task('coffee', function () {
  gulp.src('./src/yuezurl.coffee')
      .pipe(coffee({bare: true}))
      .pipe(gulp.dest('./dist'));
});
