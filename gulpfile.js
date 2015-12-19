var gulp = require('gulp'),
  //nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  //livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  gutil = require('gulp-util'),
  gls = require('gulp-live-server');

var server;

gulp.task('sass', function() {
  gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('coffee', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest('./src/'));
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
  gulp.watch('./src/**/*.coffee', ['coffee']);
  gulp.watch('./src/**/*.js', function(file) {
    server.notify.bind(server)(file);
  });
});

gulp.task('serve', function() {
  server = gls.new('./src/main.js');
  server.start();
  gulp.watch('./src/app.js', function() {
    server.start.bind(server)();
  });
  gulp.watch(['./src/**/*.js'], function(file) {
    server.start.bind(server)();
    server.notify.bind(server)(file);
  });
  gulp.watch(['public/**/*html'], function(file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('default', [
  'coffee',
  'sass',
  'watch',
  'serve'
]);
