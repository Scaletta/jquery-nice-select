const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function compress() {
  return gulp.src('js/jquery.nice-select.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('js'));
}

function compileSass() {
  return gulp.src('scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({ browsers: ['> 1%', 'last 3 versions'] }))
      .pipe(gulp.dest('css'));
}

function prefixNiceSelectSass() {
  return gulp.src('scss/nice-select.scss')
      .pipe(autoprefixer({ browsers: ['> 1%', 'last 3 versions'] }))
      .pipe(rename({suffix: '-prefixed', prefix: '_'}))
      .pipe(gulp.dest('scss'));
}

function watchFiles() {
  gulp.watch('js/*.js', compress);
  gulp.watch('scss/**/*.scss', gulp.series(compileSass, prefixNiceSelectSass));
}

exports.compress = compress;
exports.compileSass = compileSass;
exports.prefixNiceSelectSass = prefixNiceSelectSass;
exports.watch = watchFiles;
exports.default = gulp.series(gulp.parallel(compress, compileSass, prefixNiceSelectSass));
