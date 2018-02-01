'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const nib = require('nib');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const mainBowerFiles = require('main-bower-files');
const browserSync = require('browser-sync').create();
let paths = {
  stylus: {
    template: {
      source: ['*.styl'],
      finalDestination: './',
      watch: ['*.styl']
    }
  },
  browserSync: {
    watchPaths: [
      'InitialForCircuit.class.js', 'Perimeter.class.js', 'call.js',
      'perimeter.html',
      'styles-new.styl'
    ]
  }
};
/* --------- stylus-nib --------- */
gulp.task('stylus-template', () => {
  return gulp.src(paths.stylus.template.source)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({use: nib(), compress: true}))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(paths.stylus.template.finalDestination));
});
/* --------- watch --------- */
gulp.task('watch', () => {
  gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
  gulp.watch(paths.stylus.template.watch, ['stylus-template']);
  // gulp.watch('bower.json', ['libsCss']);
});
/* --------- default --------- */
gulp.task('default', ['browser-sync', 'watch']);
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});
