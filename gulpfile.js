var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var cleanCSS = require('gulp-clean-css')
var htmlmin = require('gulp-htmlmin')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var ghPages = require('gulp-gh-pages')

gulp.task('default', ['sass', 'html', 'js', 'img'], function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })

  gulp.watch('./src/styles/**/*.sass', ['sass'])
  gulp.watch('./src/*.html', ['html'])
  gulp.watch('./src/scripts/**/*.js', ['js'])
})

gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

gulp.task('js', function () {
  return gulp.src('./src/scripts/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream())
})

gulp.task('img', function () {
  return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('deploy', ['sass', 'html', 'js', 'img'], function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages())
})
